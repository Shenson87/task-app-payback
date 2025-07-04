from pydantic import BaseModel, ConfigDict
from datetime import datetime

class ProjectBase(BaseModel):
    title: str
    deadline: datetime

class ProjectCreate(ProjectBase):
    pass

class ProjectOut(ProjectBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
