import re

from sqlalchemy import MetaData
from sqlalchemy.ext.declarative import declarative_base, declared_attr
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine, AsyncAttrs
from app.config import settings


engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.SQLALCHEMY_LOGGING,
    pool_size=settings.SQLALCHEMY_POOL_SIZE,
)
sessionmaker = async_sessionmaker(
    engine,
)

# naming convention from alembic docs so that autogenerate migrations recognize indexes and keys
# https://alembic.sqlalchemy.org/en/latest/naming.html
NAMING_CONVENTION = {
    'ix': 'ix_%(column_0_label)s',
    'uq': 'uq_%(table_name)s_%(column_0_name)s',
    'ck': 'ck_%(table_name)s_%(constraint_name)s',
    'fk': 'fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s',
    'pk': 'pk_%(table_name)s',
}


# function from Netflix's dispatch codebase to auto generate sqlalchemy table names
# https://github.com/Netflix/dispatch/blob/master/src/dispatch/database/core.py
def resolve_table_name(name: str) -> str:
    """Method to generate table name from class name."""
    names = re.split('(?=[A-Z])', name)
    return '_'.join([x.lower() for x in names if x])


class CustomBase(AsyncAttrs):
    @declared_attr
    def __tablename__(self):
        return resolve_table_name(self.__name__)


Base = declarative_base(
    cls=CustomBase, metadata=MetaData(naming_convention=NAMING_CONVENTION)
)
