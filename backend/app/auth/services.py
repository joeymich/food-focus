from typing import Annotated
from uuid import UUID

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.service import BaseService
from app.deps import DbSession

from .models import User
from .schemas import Register
from .utils import hash_password


class UserService(BaseService[User]):
    def __init__(
        self,
        db_session: AsyncSession,
    ):
        super().__init__(db_session, User)

    async def get(self, *, user_id: UUID) -> User | None:
        return await super().get(user_id)

    async def get_by_email(self, *, email: str):
        query = select(self.model)
        query = query.filter(self.model.email == email)
        return await self.db_session.scalar(query)

    def create(self, *, user_in: Register):
        password = hash_password(user_in.password)
        user = self.model(
            **user_in.model_dump(exclude={'password'}),
            password=password,
        )

        self.db_session.add(user)
        return user


async def get_user_service(db_session: DbSession):
    return UserService(db_session)


UserServiceDep = Annotated[UserService, Depends(get_user_service)]
