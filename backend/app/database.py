from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite file-based database
SQLALCHEMY_DATABASE_URL = "sqlite:///./tasks.db"

# Create engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Create session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Database session generator
def get_db(): # pragma: no cover
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()