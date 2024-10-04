from pydantic import BaseModel, UUID4


class FoodRead(BaseModel):
    id: UUID4
    brand: str | None = None
    name: str | None = None
    calories: int | None = None
    total_fat: int | None = None
    saturated_fat: int | None = None
    polyunsaturated_fat: int | None = None
    monounsaturated_fat: int | None = None
    trans_fat: int | None = None
    sodium: int | None = None
    potassium: int | None = None
    total_carbs: int | None = None
    dietary_fiber: int | None = None
    sugars: int | None = None
    protein: int | None = None
    vitamin_a: int | None = None
    vitamin_c: int | None = None
    calcium: int | None = None
    iron: int | None = None
