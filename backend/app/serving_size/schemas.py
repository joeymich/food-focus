from pydantic import BaseModel, UUID4
from app.food.schemas import FoodRead


class ServingSizeRead(BaseModel):
    id: UUID4
    food_id: UUID4
    name: str
    ratio: float


class ServingSizeNestedRead(BaseModel):
    name: str
    ratio: float
    food: FoodRead
