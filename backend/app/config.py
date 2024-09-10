import os
from functools import lru_cache


class BaseConfig:
    DATABASE_URL: str = os.getenv('DATABASE_URL', None)
    SQLALCHEMY_LOGGING: bool = True
    SQLALCHEMY_POOL_SIZE: int = os.getenv('SQLALCHEMY_POOL_SIZE', 20)


# we use lru_cache so that the settings object is not re-instantiated
@lru_cache
def get_settings() -> BaseConfig:
    """Method that instantiates config."""
    return BaseConfig()


settings = get_settings()
