from collections import UserDict
from typing import Annotated
from uuid import UUID, uuid4

from fastapi import Depends, Request, Response, APIRouter
from redis.asyncio import Redis
from redis.asyncio.client import Pipeline

from app.deps.redis import RedisDep, RedisPipelineDep


router = APIRouter()


SESSION_COOKIE_NAME = 'session'


class RedisSessionManager:
    def __init__(
        self,
        redis: Redis,
        pipeline: Pipeline,
    ):
        self.redis = redis
        self.pipeline = pipeline
        self.prefix = 'session'

    def _get_key(self, session_id: UUID):
        return f'{self.prefix}:{session_id.hex}'

    async def get_session(self, session_id: UUID):
        return await self.redis.hgetall(self._get_key(session_id))

    def set_session(self, session_id: UUID, data: dict):
        self.pipeline.hmset(self._get_key(session_id), data)

    def expire_session(self, session_id: UUID, expiration: int):
        self.pipeline.expire(self._get_key(session_id), expiration)

    def delete_session(self, session_id: UUID):
        self.pipeline.expire(self._get_key(session_id), -1)


class RedisSessionInterface(UserDict):
    def __init__(
        self,
        session_manager: RedisSessionManager,
        session_id: UUID,
    ):
        self.session_manager = session_manager
        self.session_id = session_id
        self.expiration = 60*60*24

    async def load(self):
        self.data = await self.session_manager.get_session(self.session_id)

    def save(self):
        if self:
            self.session_manager.set_session(self.session_id, self)
            self.session_manager.expire_session(
                self.session_id,
                self.expiration,
            )
        else:
            self.session_manager.delete_session(self.session_id)


class ServerSessionWrapper(RedisSessionInterface):
    def __init__(
        self,
        request: Request,
        response: Response,
        redis: Redis,
        pipeline: Pipeline,
        cookie_name: str,
    ):
        self.request = request
        self.response = response
        self.cookie_name = cookie_name

        try:
            # parse session id from session cookie
            self.session_id = UUID(self.request.cookies.get(self.cookie_name))
        except (TypeError, ValueError):
            # create session id and set cookie
            self.session_id = uuid4()
            self.response.set_cookie(
                key=self.cookie_name,
                value=self.session_id.hex,
                secure=True,
                httponly=True,
            )

        super().__init__(
            session_manager=RedisSessionManager(redis, pipeline),
            session_id=self.session_id
        )

    def __delitem__(self, key):
        super().__delitem__(key)
        if not self:
            # remove session cookie if deleted all data
            self.response.delete_cookie(
                self.cookie_name,
            )


async def get_server_session_2(
        request: Request,
        response: Response,
        redis: RedisDep,
        pipeline: RedisPipelineDep,
):
    session_object = ServerSessionWrapper(
        request,
        response,
        redis,
        pipeline,
        SESSION_COOKIE_NAME,
    )

    await session_object.load()
    yield session_object
    session_object.save()


ServerSession = Annotated[RedisSessionInterface, Depends(get_server_session_2)]


class RedisUserIndexInterface:
    def __init__(
        self,
        redis: Redis,
        idx_key: str = 'idx:session'
    ):
        self.redis = redis
        self.idx_key = idx_key

    async def get_all_session_keys(self, user_id: UUID) -> list[UUID]:
        return [UUID(session.id.split(':')[1]) for session in (await self.redis.ft(self.idx_key).search(user_id.hex)).docs]
