from datetime import datetime, timedelta
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database import Base, get_db
from app.main import app

# Use an in-memory SQLite DB
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

# Create engine & a single connection
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
connection = engine.connect()

# Bind the connection to a sessionmaker
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=connection)

# Create tables in the same connection
Base.metadata.create_all(bind=connection)


# override get_db to always use the same connection
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture
def client():
    yield TestClient(app)


@pytest.fixture(scope="session", autouse=True)
def teardown():
    yield
    Base.metadata.drop_all(bind=connection)
    connection.close()
