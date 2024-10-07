import datetime
from typing import Annotated, Sequence
from uuid import UUID

from fastapi import Depends
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.deps import CurrentUserId
from app.db.service import BaseService
from app.deps import DbSession

from .models import FoodLog
from .schemas import FoodLogUpdate, FoodLogCreate


class FoodLogService(BaseService[FoodLog]):
    def __init__(
        self,
        db_session: AsyncSession,
        user_id: UUID,
    ):
        super().__init__(db_session, FoodLog)
        self.user_id = user_id

    async def get_all_by_user_id(
        self,
    ) -> Sequence[FoodLog]:
        query = select(self.model)
        query = query.filter(self.model.user_id == self.user_id)
        return (await self.db_session.scalars(query)).all()

    async def get(
        self,
        *,
        food_log_id: UUID,
    ) -> FoodLog | None:
        query = select(self.model)
        query = query.filter(self.model.id == food_log_id)
        query = query.filter(self.model.user_id == self.user_id)
        return await self.db_session.scalar(query)

    async def get_by_date(
        self,
        *,
        date: datetime.date,
    ) -> Sequence[FoodLog]:
        query = select(self.model)
        query = query.filter(self.model.user_id == self.user_id)
        query = query.filter(self.model.date == date)
        return (await self.db_session.scalars(query)).all()

    async def delete(
        self,
        *,
        food_log_id: UUID,
    ):
        query = delete(self.model)
        query = query.filter(self.model.user_id == self.user_id)
        query = query.filter(self.model.id == food_log_id)
        return (await self.db_session.execute(query)).rowcount

    def update(
        self,
        *,
        food_log: FoodLog,
        food_log_in: FoodLogUpdate,
    ):
        for key, val in food_log_in.model_dump(exclude_defaults=True).items():
            if getattr(food_log, key) != val:
                setattr(food_log, key, val)
        return food_log

    def create(
        self,
        *,
        food_log_in: FoodLogCreate,
    ):
        food_log = FoodLog(
            **food_log_in.model_dump(),
            user_id=self.user_id,
        )
        self.db_session.add(food_log)
        return food_log


def get_food_log_service(
    db_session: DbSession,
    user_id: CurrentUserId,
):
    return FoodLogService(db_session, user_id)


FoodLogServiceDep = Annotated[FoodLogService, Depends(get_food_log_service)]
