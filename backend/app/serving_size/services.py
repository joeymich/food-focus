from typing import Annotated, Sequence
from uuid import UUID

from app.db.service import BaseService
from app.deps import DbSession

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .models import ServingSize


class ServingSizeService(BaseService[ServingSize]):
    def __init__(
        self,
        db_session: AsyncSession,
    ):
        super().__init__(db_session, ServingSize)

    async def get_by_food_id(self, *, food_id: UUID) -> Sequence[ServingSize]:
        query = select(self.model)
        query = query.filter(self.model.food_id == food_id)
        return (await self.db_session.scalars(query)).all()


def get_serving_size_service(
    db_session: DbSession,
) -> ServingSizeService:
    return ServingSizeService(db_session)


ServingSizeServiceDep = Annotated[
    ServingSizeService,
    Depends(get_serving_size_service),
]
