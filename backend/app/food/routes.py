from typing import Annotated

from fastapi import Depends, HTTPException, status, Query
from pydantic import UUID4

from app.auth.deps import GetCurrentUser, CurrentUser
from app.serving_size import ServingSizeServiceDep
from app.serving_size.schemas import ServingSizeRead

from . import router
from .services import FoodServiceDep
from .schemas import FoodRead


@router.get(
    '',
    response_model=list[FoodRead],
    response_model_exclude_none=True,
)
async def get_all(
    food_service: FoodServiceDep,
    limit: int | None = Query(10),
    page: int | None = Query(1),
    q: str | None = Query(None)
):
    return await food_service.get_all(limit=limit, page=page, q=q)


@router.get(
    '/{food_id}',
    response_model=FoodRead,
    response_model_exclude_none=True,
)
async def get_by_id(
    food_service: FoodServiceDep,
    food_id: UUID4,
):
    food = await food_service.get(food_id=food_id)
    if not food:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Food does not exist',
        )
    return food


@router.get(
    '/serving-sizes/{food_id}',
    response_model=list[ServingSizeRead],

)
async def get_serving_sizes_by_food_id(
    food_service: FoodServiceDep,
    serving_size_service: ServingSizeServiceDep,
    food_id: UUID4,
):
    food = await food_service.get(food_id=food_id)
    if not food:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Food does not exist',
        )
    serving_sizes = await serving_size_service.get_by_food_id(food_id=food_id)
    return serving_sizes
