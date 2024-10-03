import redis.asyncio.client
import redis.utils
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import Response

from app.config import settings


class LoggingConnection(redis.asyncio.client.Connection):
    def pack_command(self, *args, **kwargs):
        print(f'REDIS: {' '.join(str(arg) for arg in args)}')
        return super().pack_command(*args, **kwargs)


redis_pool = redis.asyncio.ConnectionPool(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    db=settings.REDIS_DB,
    password=settings.REDIS_PASSWORD,
    decode_responses=True,
    connection_class=LoggingConnection if settings.REDIS_LOGGING else redis.asyncio.client.Connection,
)

raw_redis_pool = redis.asyncio.ConnectionPool(
    host=settings.REDIS_HOST,
    port=settings.REDIS_PORT,
    db=settings.REDIS_DB,
    password=settings.REDIS_PASSWORD,
    decode_responses=False,
    connection_class=LoggingConnection if settings.REDIS_LOGGING else redis.asyncio.client.Connection,
)


class RedisContext:
    def __init__(self):
        self.redis: redis.asyncio.Redis
        self.raw_redis: redis.asyncio.Redis
        self.pipeline: redis.asyncio.client.Pipeline

    async def __aenter__(self):
        self.redis = None
        self.raw_redis = None
        self.pipeline = None

    async def __aexit__(self, type, value, traceback):
        if self.redis:
            await self.redis.close()
        if self.raw_redis:
            await self.raw_redis.close()
        if self.pipeline and len(self.pipeline):
            await self.pipeline.execute()


class RedisMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint):
        redis_context = RedisContext()
        setattr(request.state, 'redis_context', redis_context)
        async with redis_context:
            return await call_next(request)


def get_redis(request: Request):
    redis_context: RedisContext = getattr(request.state, 'redis_context')
    if r := redis_context.redis:
        return r
    r = redis.asyncio.Redis(connection_pool=redis_pool)
    redis_context.redis = r
    return r


def get_raw_redis(request: Request):
    redis_context: RedisContext = getattr(request.state, 'redis_context')
    if r := redis_context.raw_redis:
        return r
    r = redis.asyncio.Redis(connection_pool=raw_redis_pool)
    redis_context.redis = r
    return r


def get_pipeline(request: Request):
    redis_context: RedisContext = getattr(request.state, 'redis_context')
    if pipeline := redis_context.pipeline:
        return pipeline
    pipeline = get_redis(request).pipeline()
    redis_context.pipeline = pipeline
    return pipeline
