import datetime

from pydantic import BaseModel, UUID4

from app.serving_size.schemas import ServingSizeNestedRead


from .enums import MealEnum


class FoodLogRead(BaseModel):
    id: UUID4
    user_id: UUID4
    serving_size_id: UUID4
    serving_count: float
    date: datetime.date
    meal: MealEnum


class FoodLogUpdate(BaseModel):
    serving_count: float | None = None
    date: datetime.date | None = None
    meal: MealEnum | None = None


class FoodLogCreate(BaseModel):
    serving_size_id: UUID4
    serving_count: float
    date: datetime.date
    meal: MealEnum


class FoodLogNestedRead(BaseModel):

    id: UUID4
    serving_count: float
    date: datetime.date
    meal: MealEnum

    serving_size: ServingSizeNestedRead
