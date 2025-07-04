from fastapi import HTTPException
from sqlalchemy.orm import Session
from datetime import timezone
from app import models
from app.schemas import TaskCreate

def validate_task_deadline(db: Session, task: TaskCreate) -> None:
    project = db.query(models.Project).filter(models.Project.id == task.project_id).first()
    if not project:
        raise HTTPException(404, "Project not found")

    if task.deadline > project.deadline: # type: ignore
        raise HTTPException(400, "Task deadline cannot be later than project deadline")
