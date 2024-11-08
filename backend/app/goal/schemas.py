import datetime
from pydantic import UUID4, BaseModel


class GoalRead(BaseModel):
    id: UUID4
    cal_goal: int | None = None
    protein_goal: int | None = None
    fat_goal: int | None = None
    carb_goal: int | None = None
    goal_start: datetime.date
    goal_end: datetime.date


class GoalCreate(BaseModel):
    cal_goal: int | None = None
    protein_goal: int | None = None
    fat_goal: int | None = None
    carb_goal: int | None = None
    goal_start: datetime.date
    goal_end: datetime.date


class GoalUpdate(BaseModel):
    cal_goal: int | None = None
    protein_goal: int | None = None
    fat_goal: int | None = None
    carb_goal: int | None = None
    goal_start: datetime.date | None = None
    goal_end: datetime.date | None = None
