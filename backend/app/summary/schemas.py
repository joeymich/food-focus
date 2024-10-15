import datetime
from pydantic import BaseModel
from sqlalchemy import Row


class NutritionSummary(BaseModel):
    date: datetime.date
    calories: float | None = None
    total_fat: float | None = None
    saturated_fat: float | None = None
    polyunsaturated_fat: float | None = None
    monounsaturated_fat: float | None = None
    trans_fat: float | None = None
    sodium: float | None = None
    potassium: float | None = None
    total_carbs: float | None = None
    dietary_fiber: float | None = None
    sugars: float | None = None
    protein: float | None = None
    vitamin_a: float | None = None
    vitamin_c: float | None = None
    calcium: float | None = None
    iron: float | None = None


def row_to_nutrition_summary(date: datetime.date, row: Row) -> NutritionSummary:
    return NutritionSummary(
        date=date,
        calories=row[0],
        total_fat=row[1],
        saturated_fat=row[2],
        polyunsaturated_fat=row[3],
        monounsaturated_fat=row[4],
        trans_fat=row[5],
        sodium=row[6],
        potassium=row[7],
        total_carbs=row[8],
        dietary_fiber=row[9],
        sugars=row[10],
        protein=row[11],
        vitamin_a=row[12],
        vitamin_c=row[13],
        calcium=row[14],
        iron=row[15]
    )
