import os
from functools import lru_cache


class BaseConfig:
    DATABASE_URL: str = os.getenv(
        'DATABASE_URL',
        'postgresql+asyncpg://postgres:password@db/postgres',
    )
    SQLALCHEMY_LOGGING: bool = True
    SQLALCHEMY_POOL_SIZE: int = os.getenv('SQLALCHEMY_POOL_SIZE', 20)

    REDIS_HOST: str = os.getenv('REDIS_HOST', 'redis')
    REDIS_PORT: int = os.getenv('REDIS_PORT', 6379)
    REDIS_DB: int = os.getenv('REDIS_DATABASE', 0)
    REDIS_PASSWORD: str = os.getenv('REDIS_PASSWORD', None)
    REDIS_LOGGING: bool = True


# we use lru_cache so that the settings object is not re-instantiated
@lru_cache
def get_settings() -> BaseConfig:
    """Method that instantiates config."""
    return BaseConfig()


settings = get_settings()
