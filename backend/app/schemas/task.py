from typing import Optional
from pydantic import BaseModel, ConfigDict
from datetime import datetime

class TaskBase(BaseModel):
    title: str
    description: str
    deadline: Optional[datetime] = None
    completed: bool = False

class TaskCreate(TaskBase):
    project_id: int

class TaskOut(TaskBase):
    id: int
    project_id: int

    model_config = ConfigDict(from_attributes=True)
