from pydantic import BaseModel, UUID4


class FoodRead(BaseModel):
    id: UUID4
    brand: str
    name: str
    calories: int
    total_fat: int
    saturated_fat: int
    polyunsaturated_fat: int
    monounsaturated_fat: int
    trans_fat: int
    sodium: int
    potassium: int
    total_carbs: int
    dietary_fiber: int
    sugars: int
    protein: int
    vitamin_a: int
    vitamin_c: int
    calcium: int
    iron: int
