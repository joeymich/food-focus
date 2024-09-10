from contextlib import asynccontextmanager
from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import sessionmaker


async def get_db_session():
    """Async generator that auto commits and rolls back session."""
    # context manager from sqlalchemy docs
    # https://docs.sqlalchemy.org/en/14/orm/session_basics.html#querying-2-0-style
    async with sessionmaker() as db_session, db_session.begin():
        yield db_session
    # inner context calls session.commit(), if there were no exceptions
    # outer context calls session.close()

# db session dependency to use in routes
DbSession = Annotated[AsyncSession, Depends(get_db_session)]

# async context manager for db session (so that we can use db outside of api request)
db_session_context = asynccontextmanager(get_db_session)
