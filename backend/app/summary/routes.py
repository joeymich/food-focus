import datetime
from typing import Annotated

from fastapi import Query

from . import router
from .services import SummaryServiceDep


@router.get('/total')
async def total_summary(
    summary_service: SummaryServiceDep,
    date: Annotated[datetime.date, Query()],
):
    return await summary_service.get_total_by_date(date=date)
