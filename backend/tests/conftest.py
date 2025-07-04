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


@pytest.fixture
def create_project(client):
    def _create_project(title="Test Project", deadline=None):
        if deadline is None:
            deadline = (datetime.now() + timedelta(days=30)).isoformat()
        response = client.post("/projects/", json={
            "title": title,
            "deadline": deadline
        })
        assert response.status_code == 200
        return response.json()
    return _create_project


@pytest.fixture
def create_task(client, create_project):
    def _create_task(
        title="Test Task",
        description="Some description",
        deadline=None,
        completed=False,
        project_id=None
    ):
        if project_id is None:
            project = create_project()
            project_id = project["id"]
        if deadline is None:
            deadline = (datetime.now() + timedelta(days=10)).isoformat()

        response = client.post("/tasks/", json={
            "title": title,
            "description": description,
            "deadline": deadline,
            "completed": completed,
            "project_id": project_id
        })
        assert response.status_code == 200
        return response.json()
    return _create_task


@pytest.fixture(autouse=True)
def clean_db():
    """Clean all tables before each test"""
    with engine.begin() as conn:
        for table in reversed(Base.metadata.sorted_tables):
            conn.execute(table.delete())
