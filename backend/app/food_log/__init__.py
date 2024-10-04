from fastapi import APIRouter, Depends

from app.auth.deps import GetCurrentUser


router = APIRouter(dependencies=[Depends(GetCurrentUser())])

from .models import *  # noqa
from .routes import *  # noqa
