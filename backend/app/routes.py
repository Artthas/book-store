from fastapi import APIRouter, HTTPException, UploadFile, File, Query, Form
from typing import Optional, List
from app.models import BookModel
from app.database import book_collection
from bson import ObjectId
from fastapi.responses import Response
from pydantic import ValidationError
import gridfs

router = APIRouter()

# Assign the database and GridFS instances
db = book_collection.database
fs = gridfs.GridFS(db)

# Endpoint to create a new book
@router.post("/", response_description="Add new book", response_model=BookModel)
async def create_book(
    title: str = Form(...),
    description: Optional[str] = Form(""),
    cover_image: Optional[UploadFile] = File(None),
):
    existing_book = book_collection.find_one({"title": title})  # Check if a book with the same title exists
    if existing_book:
        raise HTTPException(status_code=400, detail="Book with this title already exists")

    try:
        book = BookModel(  # Create a new instance of BookModel
            title=title,
            description=description,
            cover_image=None
        )
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())
    
    if cover_image:
        try:
            image_bytes = await cover_image.read()
            image_id = fs.put(image_bytes, filename=cover_image.filename)  # Store the image in GridFS and get its ID
            book.cover_image = str(image_id)  # Set the cover_image field to the stored image ID
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to process cover image: {str(e)}")
    
    new_book = book.dict(by_alias=True)
    result = book_collection.insert_one(new_book)  # Insert the new book into the database
    new_book['_id'] = str(result.inserted_id)  # Assign the inserted ID to the _id field
    return new_book

# Endpoint to list all books with pagination
@router.get("/", response_description="List all books with pagination", response_model=List[BookModel])
async def list_books(skip: int = Query(0, ge=0), limit: int = Query(10, gt=0)):
    books = book_collection.find().skip(skip).limit(limit)  # Retrieve paginated list of books from database
    book_list = []
    for book in books:
        if book.get("cover_image"):
            book["cover_image"] = str(book["cover_image"])  # Convert ObjectId to string for cover_image field if present
        book_list.append(book)
    return book_list

# Endpoint to get the total number of books
@router.get("/total", response_description="Get total number of books")
async def get_total_books():
    total_books = book_collection.count_documents({})
    return { "total": total_books }

# Endpoint to retrieve a book's cover image by its ID
@router.get("/{book_id}/cover_image", response_description="Get book cover image")
async def get_book_cover_image(book_id: str):
    book = book_collection.find_one({"_id": ObjectId(book_id)})
    if not book or not book.get("cover_image"):
        raise HTTPException(status_code=404, detail="Book or cover image not found")

    cover_image_id = book["cover_image"]  # Get the cover image ObjectId from the book document
    grid_out = fs.get(ObjectId(cover_image_id))  # Retrieve the image data from GridFS
    return Response(grid_out.read(), media_type="image/jpeg")
