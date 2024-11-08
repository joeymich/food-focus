from typing import Annotated

import datetime
from fastapi import HTTPException, Query, status
from pydantic import UUID4

from app.deps import DbSession

from . import router
from .schemas import GoalCreate, GoalRead, GoalUpdate
from .services import GoalServiceDep


@router.get(
    '',
    response_model=list[GoalRead],
)
async def get_goals(
    goal_service: GoalServiceDep,
    date: Annotated[datetime.date | None, Query()] = datetime.date.today()
):
    return await goal_service.get_all(date=date)


@router.post(
    '',
    response_model=GoalRead,
)
async def post_goal(
    db_session: DbSession,
    goal_service: GoalServiceDep,
    goal_in: GoalCreate
):
    goal = goal_service.create(goal_in=goal_in)
    await db_session.begin_nested()
    return goal


@router.patch(
    '/{goal_id}'
)
async def patch_goal(
    goal_service: GoalServiceDep,
    goal_in: GoalUpdate,
    goal_id: UUID4,
):
    goal = await goal_service.get(goal_id=goal_id)
    if goal is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Goal of id {goal_id} does not exist for user.',
        )

    return goal_service.update(goal=goal, goal_in=goal_in)
