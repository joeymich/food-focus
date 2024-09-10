from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import Base  # noqa


def create_app() -> FastAPI:
    """Method that instantiates the FastAPI object with all configuration."""

    app = FastAPI()

    include_routers(app)
    attach_middleware(app)

    return app


def include_routers(app: FastAPI) -> None:
    """Method to include all routers to FastAPI application."""
    pass


def attach_middleware(app: FastAPI) -> None:
    """Method to attach all middleware to FastAPI application."""
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            'localhost:80',
        ],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],
    )


app = create_app()
