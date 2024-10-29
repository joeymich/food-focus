import datetime
from typing import Annotated

from fastapi import HTTPException, status, Query
from pydantic import UUID4

from app.deps import DbSession

from . import router
from .schemas import FoodLogUpdate, FoodLogRead, FoodLogCreate, FoodLogNestedRead
from .services import FoodLogServiceDep


@router.get(
    '',
    response_model=list[FoodLogNestedRead],
)
async def get_all_by_user_id(
    food_log_service: FoodLogServiceDep,
    date: Annotated[datetime.date | None, Query()] = datetime.date.today()
):
    return await food_log_service.get_nested_by_date(date=date)


@router.post(
    '',
    response_model=FoodLogRead,
)
async def create(
    db_session: DbSession,
    food_log_service: FoodLogServiceDep,
    food_log_in: FoodLogCreate,
):
    food = food_log_service.create(food_log_in=food_log_in)
    await db_session.begin_nested()
    return food


@router.get(
    '/{food_log_id}',
    response_model=FoodLogRead,
)
async def get_by_id(
    food_log_service: FoodLogServiceDep,
    food_log_id: UUID4,
):
    food_log = await food_log_service.get(food_log_id=food_log_id)
    if food_log is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Food log not found.',
        )
    return food_log


@router.patch(
    '/{food_log_id}',
    response_model=FoodLogRead,
)
async def update_by_id(
    food_log_service: FoodLogServiceDep,
    food_log_in: FoodLogUpdate,
    food_log_id: UUID4,
):
    food_log = await food_log_service.get(food_log_id=food_log_id)
    if food_log is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Food log not found.'
        )
    food_log = food_log_service.update(
        food_log=food_log,
        food_log_in=food_log_in,
    )
    return food_log


@router.delete(
    '/{food_log_id}',
    response_model=None,
)
async def delete_by_id(
    db_session: DbSession,
    food_log_service: FoodLogServiceDep,
    food_log_id: UUID4,
):
    food_log = await food_log_service.get(food_log_id=food_log_id)
    if food_log is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Food log not found.'
        )
    await db_session.delete(food_log)
