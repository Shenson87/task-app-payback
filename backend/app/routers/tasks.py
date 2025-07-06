from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas
from ..database import get_db
from .utils import validate_task_deadline

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"]
)


@router.get("/", response_model=List[schemas.TaskOut])
def get_tasks(db: Session = Depends(get_db)):
    """
    Get all tasks.

    Returns:
    List[schemas.TaskOut]: A list of all tasks.
    """
    return db.query(models.Task).all()


@router.post("/", response_model=schemas.TaskOut)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    """
    Create a new task.

    Args:
    task (schemas.TaskCreate): The new task data.

    Raises:
    HTTPException: If the project of the task does not exist or the deadline of the task
                   is later than the deadline of the project.

    Returns:
    schemas.TaskOut: The newly created task.
    """
    if not task.project_id:
        raise HTTPException(400, "Project ID is required")

    # Check if task deadline is earlier than project deadline
    if task.deadline:
        validate_task_deadline(db, task)

    db_task = models.Task(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


@router.get('/deadlines', response_model=List[schemas.TaskOut])
def get_tasks_with_deadlines(db: Session = Depends(get_db)):
    """
    Get tasks with deadlines.

    Returns:
    List[schemas.TaskOut]: A list of tasks with deadlines.
    """
    return db.query(models.Task).filter(models.Task.deadline != None).all()


@router.get('/{task_id}', response_model=schemas.TaskOut)
def get_task(task_id: int, db: Session = Depends(get_db)):
    """
    Get a specific task by its ID.

    Args:
    task_id (int): The ID of the task to be retrieved.

    Raises:
    HTTPException: If the task does not exist.

    Returns:
    schemas.TaskOut: The retrieved task.
    """
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(404, "Task not found")
    return db_task


@router.put("/{task_id}", response_model=schemas.TaskOut)
def update_task(task_id: int, task: schemas.TaskCreate, db: Session = Depends(get_db)):
    """
    Update a task.

    Args:
    task_id (int): The ID of the task to update.
    task (schemas.TaskCreate): The updated task data.

    Raises:
    HTTPException: If the task does not exist.
    HTTPException: If the project of the task does not exist or the deadline of the task
                   is later than the deadline of the project.

    Returns:
    schemas.TaskOut: The updated task.
    """
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(404, "Task not found")

    # Check if project exists and task deadline is earlier than project deadline
    if task.deadline:
        validate_task_deadline(db, task)

    for key, value in task.model_dump().items():
        setattr(db_task, key, value)

    db.commit()
    db.refresh(db_task)
    return db_task


@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    """
    Delete a task by its ID.

    Args:
    task_id (int): The ID of the task to be deleted.
    db (Session, optional): The database session dependency.

    Raises:
    HTTPException: If the task does not exist.

    Returns:
    dict: A message confirming the deletion of the task.
    """
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(404, "Task not found")

    db.delete(db_task)
    db.commit()
    return {"message": f"Task {task_id} deleted"}
