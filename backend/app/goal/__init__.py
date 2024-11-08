from fastapi import APIRouter

router = APIRouter()

from .models import *  # noqa
from .routes import *  # noqa
