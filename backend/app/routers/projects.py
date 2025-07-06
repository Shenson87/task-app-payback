from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/projects",
    tags=["projects"]
)


@router.get("/", response_model=List[schemas.ProjectOut])
def get_projects(db: Session = Depends(get_db)):
    """
    Retrieve a list of all projects.

    Args:
    db (Session): The database session dependency.

    Returns:
    List[schemas.ProjectOut]: A list of all projects in the database.
    """
    return db.query(models.Project).all()


@router.post("/", response_model=schemas.ProjectOut)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    """
    Create a new project.

    Args:
    project (schemas.ProjectCreate): The new project data.
    db (Session): The database session dependency.

    Returns:
    schemas.ProjectOut: The newly created project.
    """
    db_project = models.Project(**project.model_dump())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


@router.put("/{project_id}", response_model=schemas.ProjectOut)
def update_project(project_id: int, project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    """
    Update a project.

    Args:
    project_id (int): The ID of the project to be updated.
    project (schemas.ProjectCreate): The updated project data.
    db (Session): The database session dependency.

    Raises:
    HTTPException: If the project does not exist.

    Returns:
    schemas.ProjectOut: The updated project.
    """
    db_project = db.query(models.Project).filter(
        models.Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")

    for key, value in project.model_dump().items():
        setattr(db_project, key, value)

    db.commit()
    db.refresh(db_project)
    return db_project


@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    """
    Delete a project by its ID.

    Args:
    project_id (int): The ID of the project to be deleted.
    db (Session, optional): The database session dependency.

    Raises:
    HTTPException: If the project does not exist.

    Returns:
    dict: A message confirming the deletion of the project.
    """
    db_project = db.query(models.Project).filter(
        models.Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")

    db.delete(db_project)
    db.commit()
    return {"message": f"Project {project_id} deleted"}


@router.get("/{project_id}/tasks", response_model=List[schemas.TaskOut])
def list_project_tasks(project_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a list of all tasks for a given project.

    Args:
    project_id (int): The ID of the project for which to retrieve tasks.
    db (Session): The database session dependency.

    Returns:
    List[schemas.TaskOut]: A list of tasks for the given project.
    """
    return db.query(models.Task).filter(models.Task.project_id == project_id).all()
