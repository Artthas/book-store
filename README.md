# Book Store Project

This is a full-stack project consisting of a frontend built with Next.js, TypeScript, and Tailwind CSS, and a backend built with FastAPI and MongoDB.

## Table of Contents

- [Book Store Project](#book-store-project)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Frontend](#frontend)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Development](#development)
  - [Backend](#backend)
    - [Installation](#installation-1)
    - [Environment Variables](#environment-variables-1)
    - [Development](#development-1)
  - [Using Makefile](#using-makefile)

## Requirements

Python version 3.12.2
Node.js version 18.17.1

## Frontend

The frontend is built with Next.js, TypeScript, and Tailwind CSS.

### Installation

To get started with the frontend, navigate to the `frontend` directory and install the dependencies:

```bash
cd frontend
npm install
```

### Environment Variables

Create a .env.local file in the frontend directory with the following content:

NEXT_PUBLIC_API_URL=http://localhost:8000

### Development

To start the development server, run:

```bash
npm run dev
```

The application will be available at http://localhost:3000.

## Backend

The backend is built with FastAPI and MongoDB.

### Installation

To get started with the backend, navigate to the backend directory and create a virtual environment:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
```

Then, install the dependencies:

```bash
pip install -r requirements.txt
```

### Environment Variables

Create a .env file in the backend directory with the following content:

MONGO_URI=mongodb+srv://Cluster78411:bFV9ZEVjRlB0@cluster78411.xn0hp9l.mongodb.net/?retryWrites=true&w=majority
MONGO_DB=book_store

### Development

To start the development server, run:

```bash
uvicorn app.main:app --reload
```

The API will be available at http://127.0.0.1:8000.

## Using Makefile

The project uses `Makefile` to simplify everyday tasks. To use `Makefile` you must have `make` installed (usually it is already installed on Unix-like systems, for Windows it can be installed using MinGW or WSL).