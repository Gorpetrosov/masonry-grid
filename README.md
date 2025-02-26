# Vite React TypeScript App

This is a simple React app built with Vite and TypeScript. The application is configured to run in both development and production environments using Docker.

## Development Setup

### Requirements
- Docker
- Node.js (optional for local development)

### Run in Development Mode
In development mode, the app will run with hot-reloading for easy development and testing.

To build and run the app in development mode:

```bash
docker build --target development -t masonry:dev .
docker run -p 3000:3000 masonry:dev
```

### Run in Production Mode
To build and run the app in development mode:

```bash
docker build --target production -t masonry:dev .
docker run -p 3000:3000 masonry:dev
```

## Running the project manually
To set up the environment configuration for this project, you need to create a `.env` file based on the provided `.env.example` template. The following shell script automates this process:

```bash
# Create .env from .env.example
if [ -f .env.example ]; then
    cp .env.example .env
    echo ".env file created from .env.example."
else
    echo "Error: .env.example file not found."
    exit 1
fi

npm run dev