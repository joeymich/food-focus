from typing import Annotated
from uuid import UUID

from fastapi import Depends, HTTPException, status, Request, Response
from fastapi.openapi.models import APIKey, APIKeyIn
from fastapi.security.base import SecurityBase

from app.session import ServerSession, RedisSessionInterface

from .services import UserServiceDep
from .models import User


async def get_current_user_no_raise(
    server_session: ServerSession,
    user_service: UserServiceDep,
):
    if 'user_id' in server_session.keys():
        return await user_service.get(user_id=server_session['user_id'])
    return None


class GetCurrentUserNoRaise:
    def __init__(
        self,
    ):
        pass

    async def __call__(
        self,
        server_session: ServerSession,
        user_service: UserServiceDep,
    ):
        if user_id := server_session.get('user_id'):
            return await user_service.get(
                user_id=user_id,
            )
        return None


CurrentUserNoRaise = Annotated[User | None, Depends(GetCurrentUserNoRaise())]


class SessionCookieSecurity(SecurityBase):
    def __init__(
        self,
        cookie_name: str = 'session',
    ):
        self.cookie_name = cookie_name
        self.model = APIKey(**{'in': APIKeyIn.cookie}, name=self.cookie_name)
        self.scheme_name: str = self.__class__.__name__


class GetCurrentUser(SessionCookieSecurity):
    def __init__(
        self,
    ):
        super().__init__()

    async def __call__(
        self,
        user_service: UserServiceDep,
        server_session: ServerSession,
    ):
        current_user = await GetCurrentUserNoRaise()(server_session=server_session, user_service=user_service)
        if current_user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='User not logged in'
            )
        return current_user


CurrentUser = Annotated[User, Depends(GetCurrentUser())]


def get_current_user_id(current_user: CurrentUser) -> UUID:
    return current_user.id


CurrentUserId = Annotated[UUID, Depends(get_current_user_id)]


class AuthManager:
    def __init__(
        self,
        session_interface: RedisSessionInterface,
        request: Request,
        response: Response,
    ):
        self.session_interface = session_interface
        self.request = request
        self.response = response

    def login(self, user_id: UUID):
        self.session_interface.update({
            'user_id': user_id.hex,
            'ip_address': self.request.client.host,
            'user_agent': self.request.headers.get('user-agent') or 'NA',
        })

    def logout(self):
        self.session_interface.clear()


def get_auth_manager(
    server_session: ServerSession,
    request: Request,
    response: Response,
):
    return AuthManager(server_session, request, response)


AuthManagerDep = Annotated[AuthManager, Depends(get_auth_manager)]
