from typing import Type, Sequence, TypeVar
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from . import CustomBase


TBase = TypeVar('Model', bound=CustomBase)


class BaseService[Model: TBase]:
    def __init__(
        self,
        db_session: AsyncSession,
        model: Type[Model]
    ):
        self.db_session = db_session
        self.model = model

    async def get_all(self) -> Sequence[Model]:
        return (await self.db_session.scalars(select(self.model))).all()

    async def get(self, id: UUID) -> Model | None:
        return await self.db_session.get(self.model, id)
