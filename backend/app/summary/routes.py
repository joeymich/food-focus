import datetime
from typing import Annotated

from fastapi import Query

from . import router
from .schemas import row_to_nutrition_summary, NutritionSummary
from .services import SummaryServiceDep


@router.get(
    '/total',
    response_model=NutritionSummary,
)
async def total_summary(
    summary_service: SummaryServiceDep,
    date: Annotated[datetime.date | None, Query()] = datetime.date.today(),
):
    if row := await summary_service.get_total_by_date(date=date):
        return row_to_nutrition_summary(date=date, row=row)
    return None
