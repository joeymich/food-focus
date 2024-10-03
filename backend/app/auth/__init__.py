from fastapi import APIRouter


auth_router = APIRouter()

from .models import *  # noqa
from .routes import *  # noqa
