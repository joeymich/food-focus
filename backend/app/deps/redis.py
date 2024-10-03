from contextlib import asynccontextmanager
from typing import Annotated

from fastapi import Depends
import redis
import redis.asyncio.client

from app.middleware.redis import get_redis, get_pipeline, get_raw_redis, redis_pool, raw_redis_pool


RedisDep = Annotated[
    redis.asyncio.Redis,
    Depends(get_redis),
]
RedisPipelineDep = Annotated[
    redis.asyncio.client.Pipeline,
    Depends(get_pipeline),
]


@asynccontextmanager
async def redis_context():
    r = redis.asyncio.Redis(connection_pool=redis_pool)
    try:
        yield r
    finally:
        await r.close()


@asynccontextmanager
async def pipeline_context(r: redis.asyncio.Redis):
    pipeline = r.pipeline()
    try:
        yield pipeline
    finally:
        if len(pipeline):
            await pipeline.execute()
