from typing import Annotated, Sequence

from datetime import date
from uuid import UUID
from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.deps import CurrentUserId
from app.db.service import BaseService
from app.deps import DbSession

from .models import Goal
from .schemas import GoalCreate, GoalUpdate


class GoalService(BaseService[Goal]):
    def __init__(self, db_session: AsyncSession, user_id: UUID) -> None:
        super().__init__(db_session, Goal)
        self.user_id: UUID = user_id

    async def get(
        self,
        *,
        goal_id: UUID,
    ):
        return await self.db_session.get(self.model, goal_id)

    async def get_all(
        self,
        *,
        date: date | None = None
    ) -> Sequence[Goal]:
        query = select(self.model)
        query = query.filter(self.model.user_id == self.user_id)
        if date:
            query = query.filter(self.model.goal_start <= date)
            query = query.filter(self.model.goal_end > date)
        return (await self.db_session.scalars(query)).all()

    def create(
        self,
        *,
        goal_in: GoalCreate
    ) -> Goal:
        goal = Goal(
            **goal_in.model_dump(),
            user_id=self.user_id,
        )
        self.db_session.add(goal)
        return goal

    def update(
        self,
        *,
        goal: Goal,
        goal_in: GoalUpdate,
    ):
        for key, val in goal_in.model_dump(exclude_unset=True).items():
            if getattr(goal, key) != val:
                setattr(goal, key, val)
        return goal


def get_goal_service(db_session: DbSession, user_id: CurrentUserId) -> GoalService:
    return GoalService(db_session, user_id)


GoalServiceDep = Annotated[GoalService, Depends(get_goal_service)]
