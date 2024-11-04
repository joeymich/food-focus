import asyncio
import os
import sys
import time

import ijson
from pydantic import BaseModel

# add python modules from app to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))  # noqa
from app.food.services import FoodService
from app.food import Food
from app.serving_size import ServingSize
from app.deps.db import db_session_context


NUTRIENT_MAP = {
    'Energy': 'calories',
    'Total lipid (fat)': 'total_fat',
    'Fatty acids, total saturated': 'saturated_fat',
    'Fatty acids, total polyunsaturated': 'polyunsaturated_fat',
    'Fatty acids, total monounsaturated': 'monounsaturated_fat',
    'Fatty acids, total trans': 'trans_fat',
    'Sodium, Na': 'sodium',
    'Potassium, K': 'potassium',
    'Carbohydrate, by difference': 'total_carbs',
    'Fiber, total dietary': 'dietary_fiber',
    'Total Sugars': 'sugars',
    'Sugars, added': 'added_sugars',
    'Protein': 'protein',
    'Vitamin A, IU': 'vitamin_a',
    'Vitamin C, total ascorbic acid': 'vitamin_c',
    'Calcium, Ca': 'calcium',
    'Iron, Fe': 'iron'
}

NOT_A_BRANDED_ITEM = 'NOT_A_BRANDED_ITEM'

TOTAL_COUNT = 453838


class FoodSchema(BaseModel):

    description: str

    class FoodNutritent(BaseModel):
        id: int

        class NutrientSchema(BaseModel):
            name: str
            unitName: str

        nutrient: NutrientSchema
        amount: float

    # per 100 servingSizeUnit
    foodNutrients: list[FoodNutritent]
    brandOwner: str
    gtinUpc: str
    ingredients: str
    servingSize: float
    servingSizeUnit: str
    householdServingFullText: str
    brandedFoodCategory: str
    publicationDate: str


filepath = os.path.join(
    os.path.dirname(__file__),
    '..',
    'data',
    'brandedDownload.json',
)


def create_food(food_schema: FoodSchema) -> Food:
    nutrient_data = {}
    for food_nutrient in food_schema.foodNutrients:
        if food_nutrient.nutrient.name in NUTRIENT_MAP:
            nutrient_data[NUTRIENT_MAP[food_nutrient.nutrient.name]
                          ] = food_nutrient.amount

    return Food(
        brand=food_schema.brandOwner if food_schema.brandOwner != NOT_A_BRANDED_ITEM else None,
        name=food_schema.description,
        **nutrient_data
    )


def create_serving_sizes(food_schema: FoodSchema) -> list[ServingSize]:
    return [
        ServingSize(
            name=f'{food_schema.householdServingFullText} ({food_schema.servingSize} {
                food_schema.servingSizeUnit})',
            ratio=food_schema.servingSize / 100,
        ),
        ServingSize(
            name=f'100 {food_schema.servingSizeUnit}',
            ratio=1.0,
        )
    ]


def print_progress_bar(iteration, total, average_time, length=80,):
    percent = (iteration / total) * 100
    filled_length = int(length * iteration // total)
    bar = '█' * filled_length + '-' * (length - filled_length)
    time_left = average_time * (total - iteration)
    if iteration == total:
        time_left = 0
    output_str = f'\r{time_left:.2f}s Remaining |{bar}| {percent:.2f}% {
        iteration}/{total} Foods Added'
    sys.stdout.write(output_str)
    sys.stdout.flush()


async def test_db():
    async with db_session_context() as db_session:
        await FoodService(db_session).delete_all()

    times = []
    foods = []
    COMMIT_EVERY = 10000
    ROLLING_COUNT = 20000
    with open(filepath, 'r', encoding='utf-8') as f:
        for i, food_data in enumerate(ijson.items(f, 'BrandedFoods.item')):
            start_time = time.perf_counter()

            model = FoodSchema.model_validate(food_data)
            db_model = create_food(model)
            db_model.serving_sizes = create_serving_sizes(model)

            foods.append(db_model)

            if i % COMMIT_EVERY == 0:
                async with db_session_context() as db_session:
                    db_session.add_all(foods)
                foods.clear()

            elapsed_time = time.perf_counter() - start_time
            times.append(elapsed_time)

            if len(times) > ROLLING_COUNT:
                oldest = times.pop(0)
                rolling_average = (rolling_average *
                                   ROLLING_COUNT - oldest + times[-1]) / ROLLING_COUNT
            else:
                rolling_average = sum(times) / len(times)

            print_progress_bar(i+1, TOTAL_COUNT, rolling_average)

        if len(foods):
            async with db_session_context() as db_session:
                db_session.add_all(foods)


if __name__ == '__main__':
    asyncio.run(test_db())
