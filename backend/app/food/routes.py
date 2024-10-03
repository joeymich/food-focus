from app.auth.deps import CurrentUser

from fastapi import Depends

from . import router
from .services import FoodServiceDep
from .schemas import FoodRead


@router.get(
    '',
    dependencies=[Depends(CurrentUser)]
)
async def get_all(
    food_service: FoodServiceDep,
) -> list[FoodRead]:
    return await food_service.get_all()
