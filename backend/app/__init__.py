from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from app.auth import auth_router
from app.food import router as food_router
from app.food_log import router as food_log_router
from app.middleware import RedisMiddleware
from app.serving_size import router as serving_size_router
from app.summary import router as summary_router
from app.db import Base  # noqa


def create_app() -> FastAPI:
    """Method that instantiates the FastAPI object with all configuration."""

    app = FastAPI()

    include_routers(app)
    attach_middleware(app)

    return app


def include_routers(app: FastAPI) -> None:
    """Method to include all routers to FastAPI application."""
    app.include_router(auth_router, prefix='/auth', tags=['auth'])
    app.include_router(food_router, prefix='/foods', tags=['foods'])
    app.include_router(
        food_log_router,
        prefix='/food-logs',
        tags=['food-logs'],
    )
    app.include_router(
        serving_size_router,
        prefix='/serving-sizes',
        tags=['serving-sizes'],
    )
    app.include_router(
        summary_router,
        prefix='/summaries',
        tags=['summaries']
    )


def attach_middleware(app: FastAPI) -> None:
    """Method to attach all middleware to FastAPI application."""
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            'http://127.0.0.1:80',
            'http://localhost:80',
            'http://localhost',
            'http://127.0.0.1',
        ],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],
    )
    app.add_middleware(RedisMiddleware)


app = create_app()
