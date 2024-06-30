# Makefile for Book Store Project

.PHONY: install-front install-back start-back start-front install-all start-all help

# Frontend commands

install-front: install-front
	@echo "Installing frontend dependencies..."
	@cd frontend && npm install

start-front: start-front
	@echo "Starting frontend development server..."
	@cd frontend && npm run dev

# Backend commands

install-back: install-back
	@echo "Creating and activating virtual environment for backend, then installing backend dependencies..."
	@cd backend && \
		python3 -m venv .venv ; \
		. .venv/bin/activate ; \
		pip3 install -r requirements.txt

start-back: start-back
	@echo "Starting backend development server..."
	@cd backend && \
		source .venv/bin/activate && \
		uvicorn app.main:app --reload

# General commands

install-all: install-front install-back

start-all:
	@echo "Starting both frontend and backend servers in development mode..."
	@make start-back & make start-front

# Usage instructions
help:
	@echo "Book Store Project Makefile"
	@echo ""
	@echo "Available commands:"
	@echo "  install-front	- Install frontend dependencies"
	@echo "  start-front  	- Start frontend development server"
	@echo "  install-back 	- Create and activate virtual environment, then install backend dependencies"
	@echo "  start-back   	- Start backend development server"
	@echo "  install-all    - Install all dependencies (frontend and backend)"
	@echo "  start-all      - Start both frontend and backend servers in development mode"
	@echo "  help           - Display this help message"
