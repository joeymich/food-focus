from pydantic import UUID4

from app.auth.deps import GetCurrentUser, CurrentUser

from fastapi import Depends, HTTPException, status

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
):
    return await food_service.get_all()


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
