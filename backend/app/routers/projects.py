from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..schemas.project import ProjectCreate, ProjectOut
from ..schemas.task import TaskOut
from ..database import get_db
from ..services import project as crud_project

router = APIRouter(
    prefix="/projects",
    tags=["projects"]
)


@router.get("/", response_model=List[ProjectOut])
def get_projects(db: Session = Depends(get_db)):
    """
    Retrieve a list of all projects.

    Args:
    db (Session): The database session dependency.

    Returns:
    List[schemas.ProjectOut]: A list of all projects in the database.
    """
    return crud_project.get_projects(db)


@router.post("/", response_model=ProjectOut)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    """
    Create a new project.

    Args:
    project (schemas.ProjectCreate): The new project data.
    db (Session): The database session dependency.

    Returns:
    schemas.ProjectOut: The newly created project.
    """
    return crud_project.create_project(db, project)


@router.get("/{project_id}", response_model=ProjectOut)
def get_project(project_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a project by its ID.

    Args:
    project_id (int): The ID of the project to be retrieved.
    db (Session): The database session dependency.

    Raises:
    HTTPException: If the project does not exist.

    Returns:
    schemas.ProjectOut: The project with the given ID.
    """
    project = crud_project.get_project(db, project_id)
    if not project:
        raise HTTPException(404, "Project not found")
    return project


@router.put("/{project_id}", response_model=ProjectOut)
def update_project(project_id: int, project: ProjectCreate, db: Session = Depends(get_db)):
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
    updated_project = crud_project.update_project(db, project_id, project)
    if not updated_project:
        raise HTTPException(404, "Project not found")
    return updated_project


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
    result = crud_project.delete_project(db, project_id)
    if not result:
        raise HTTPException(404, "Project not found")
    return result


@router.get("/{project_id}/tasks", response_model=List[TaskOut])
def list_project_tasks(project_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a list of all tasks for a given project.

    Args:
    project_id (int): The ID of the project for which to retrieve tasks.
    db (Session): The database session dependency.
    
    Raises:
    HTTPException: If the project does not exist or doesn't have tasks.

    Returns:
    List[schemas.TaskOut]: A list of tasks for the given project.
    """
    project = crud_project.get_project(db, project_id)
    if not project:
        raise HTTPException(404, "Project not found")
    tasks = crud_project.list_project_tasks(db, project_id)
    if tasks is None:
        raise HTTPException(404, "Tasks not found")
    return tasks
