from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers import projects, tasks

# Create database if it doesn't exist
Base.metadata.create_all(bind=engine)

# Create FastApi app
app = FastAPI()

# Add middleware to allow connections only from localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(projects.router)
app.include_router(tasks.router)
