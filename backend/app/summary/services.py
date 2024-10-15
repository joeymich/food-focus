import datetime
from typing import Annotated
from uuid import UUID

from fastapi import Depends
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.deps import CurrentUserId
from app.deps import DbSession
from app.food import Food
from app.food_log import FoodLog
from app.serving_size import ServingSize

from .schemas import NutritionSummary


class SummaryService:
    def __init__(self, db_session: AsyncSession, user_id: UUID):
        self.db_session = db_session
        self.user_id = user_id

    async def get_total_by_date(self, *, date: datetime.date) -> NutritionSummary:

        query = select(
            func.sum(
                FoodLog.serving_count * ServingSize.ratio * Food.calories
            ),
            func.sum(
                FoodLog.serving_count * ServingSize.ratio * Food.total_fat
            ),
            func.sum(
                FoodLog.serving_count * ServingSize.ratio * Food.saturated_fat
            ),
            func.sum(
                FoodLog.serving_count * ServingSize.ratio * Food.polyunsaturated_fat
            ),
            func.sum(
                FoodLog.serving_count * ServingSize.ratio * Food.monounsaturated_fat
            ),
            func.sum(
                FoodLog.serving_count * ServingSize.ratio * Food.trans_fat
            ),
            func.sum(
                FoodLog.serving_count * ServingSize.ratio * Food.sodium
            ),
            func.sum(
                FoodLog.serving_count * ServingSize.ratio * Food.potassium
            ),
            func.sum(
                FoodLog.serving_count * ServingSize.ratio * Food.total_carbs
            ),
            func.sum(
                FoodLog.serving_count * ServingSize.ratio * Food.dietary_fiber
            ),
            func.sum(
                FoodLog.serving_count * ServingSize.ratio * Food.sugars
            ),
            func.sum(
                FoodLog.serving_count * ServingSize.ratio * Food.protein
            ),
            func.sum(
                FoodLog.serving_count * ServingSize.ratio * Food.vitamin_a
            ),
            func.sum(
                FoodLog.serving_count * ServingSize.ratio * Food.vitamin_c
            ),
            func.sum(
                FoodLog.serving_count * ServingSize.ratio * Food.calcium
            ),
            func.sum(
                FoodLog.serving_count * ServingSize.ratio * Food.iron
            ),
        ).join(
            ServingSize, ServingSize.id == FoodLog.serving_size_id
        ).join(
            Food, Food.id == ServingSize.food_id
        ).where(
            FoodLog.date == date,
            FoodLog.user_id == self.user_id,
        )

        result = (await self.db_session.execute(query)).one_or_none()

        daily_summary = NutritionSummary(
            date=date,
            calories=result[0],
            total_fat=result[1],
            saturated_fat=result[2],
            polyunsaturated_fat=result[3],
            monounsaturated_fat=result[4],
            trans_fat=result[5],
            sodium=result[6],
            potassium=result[7],
            total_carbs=result[8],
            dietary_fiber=result[9],
            sugars=result[10],
            protein=result[11],
            vitamin_a=result[12],
            vitamin_c=result[13],
            calcium=result[14],
            iron=result[15]
        )

        return daily_summary

    async def get_food_by_date(self, *, date: datetime.date):
        pass


def get_summary_service(db_session: DbSession, current_user_id: CurrentUserId):
    return SummaryService(db_session=db_session, user_id=current_user_id)


SummaryServiceDep = Annotated[SummaryService, Depends(get_summary_service)]
