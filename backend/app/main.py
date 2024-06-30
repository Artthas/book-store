from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router as BookRouter

app = FastAPI()

# Define the allowed origins for CORS (Cross-Origin Resource Sharing)
origins = ["http://localhost:3000"]

# Add CORS middleware to the FastAPI application
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the BookRouter with a prefix and tags
app.include_router(BookRouter, prefix="/books", tags=["books"])

# Define a route handler for the root endpoint
@app.get("/")
def read_root():
    return { "message": "Welcome to the Book Store API!" }
