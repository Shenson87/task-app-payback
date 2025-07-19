from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..schemas.task import TaskCreate, TaskOut
from ..database import get_db
from .utils import validate_task_deadline
from ..services import task as crud_task

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"]
)


@router.get("/", response_model=List[TaskOut])
def get_tasks(db: Session = Depends(get_db)):
    """
    Get all tasks.

    Returns:
    List[TaskOut]: A list of all tasks.
    """
    return crud_task.get_tasks(db)


@router.post("/", response_model=TaskOut)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    """
    Create a new task.

    Args:
    task (TaskCreate): The new task data.

    Raises:
    HTTPException: If the project of the task does not exist or the deadline of the task
                   is later than the deadline of the project.

    Returns:
    TaskOut: The newly created task.
    """
    # Check if task deadline is earlier than project deadline
    if task.deadline:
        validate_task_deadline(db, task)

    return crud_task.create_task(db, task)


@router.get('/deadlines', response_model=List[TaskOut])
def get_tasks_with_deadlines(db: Session = Depends(get_db)):
    """
    Get tasks with deadlines.

    Returns:
    List[TaskOut]: A list of tasks with deadlines.
    """
    return crud_task.get_tasks_with_deadlines(db)


@router.get('/{task_id}', response_model=TaskOut)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = crud_task.get_task(db, task_id)
    if not task:
        raise HTTPException(404, "Task not found")
    return task


@router.put("/{task_id}", response_model=TaskOut)
def update_task(task_id: int, task: TaskCreate, db: Session = Depends(get_db)):
    """
    Update a task.

    Args:
    task_id (int): The ID of the task to update.
    task (TaskCreate): The updated task data.

    Raises:
    HTTPException: If the task does not exist.
    HTTPException: If the project of the task does not exist or the deadline of the task
                   is later than the deadline of the project.

    Returns:
    TaskOut: The updated task.
    """
    # Check if task deadline is earlier than project deadline
    if task.deadline:
        validate_task_deadline(db, task)

    updated_task = crud_task.update_task(db, task_id, task)
    if not updated_task:
        raise HTTPException(404, "Task not found")
    return updated_task


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
    result = crud_task.delete_task(db, task_id)
    if not result:
        raise HTTPException(404, "Task not found")
    return result
