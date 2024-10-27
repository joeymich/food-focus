from typing import Annotated
from uuid import UUID

from app.db.service import BaseService
from app.deps import DbSession

from fastapi import Depends
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from .models import Food


class FoodService(BaseService[Food]):
    def __init__(
        self,
        db_session: AsyncSession,
    ):
        super().__init__(db_session, Food)

    async def delete_all(self) -> None:
        query = delete(self.model)
        await self.db_session.execute(query)

    async def get(self, *, food_id: UUID) -> Food | None:
        query = select(self.model)
        query = query.filter(self.model.id == food_id)
        return await self.db_session.scalar(query)


async def get_food_service_dep(
    db_session: DbSession,
) -> FoodService:
    return FoodService(db_session)

FoodServiceDep = Annotated[FoodService, Depends(get_food_service_dep)]
