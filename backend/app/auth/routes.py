from fastapi import HTTPException, status

from app.deps import DbSession

from . import auth_router
from .deps import AuthManagerDep, CurrentUser
from .models import User
from .schemas import UserRead, Register, Login
from .services import UserServiceDep
from .utils import check_password


@auth_router.post(
    '/register',
    response_model=UserRead,
)
async def register(
    db_session: DbSession,
    user_service: UserServiceDep,
    auth_manager: AuthManagerDep,
    user_in: Register,
) -> User:
    if await user_service.get_by_email(email=user_in.email):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail='User already exists',
        )

    user = user_service.create(user_in=user_in)

    await db_session.begin_nested()

    # login user
    auth_manager.login(user.id)

    return user


@auth_router.post(
    '/login',
    response_model=UserRead,
)
async def login(
    user_service: UserServiceDep,
    auth_manager: AuthManagerDep,
    user_in: Login,
) -> User:
    # get user by email
    user = await user_service.get_by_email(email=user_in.email)

    # if user DNE or password wrong, raise error
    if not user or not check_password(user_in.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect email or password'
        )

    # login user
    auth_manager.login(user.id)

    return user


@auth_router.delete(
    '/logout'
)
async def logout(
    auth_manager: AuthManagerDep,
) -> None:
    auth_manager.logout()


@auth_router.get(
    '/whoami',
    response_model=UserRead,
)
async def whoami(
    current_user: CurrentUser,
) -> User:
    return current_user
