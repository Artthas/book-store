from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

# Create a MongoDB client instance with specified server API version
client = MongoClient(MONGO_URI, server_api=ServerApi('1'))

# Access the MongoDB database using the specified name from environment variables
database = client[os.getenv("MONGO_DB")]

# Access the collection named "books" within the database
book_collection = database.get_collection("books")

try:
    client.admin.command('ping')
    print("You successfully connected to MongoDB!")
except Exception as e:
    print(e)
