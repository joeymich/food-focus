from pydantic import UUID4

from . import router
from .schemas import ServingSizeRead
from .services import ServingSizeServiceDep


# @router.get(
#     '',
#     response_model=list[ServingSizeRead]
# )
# async def get_all(
#     serving_size_service: ServingSizeServiceDep,
# ):
#     return await serving_size_service.get_all()


@router.get(
    '/{serving_size_id}',
)
async def get_by_id(
    serving_size_service: ServingSizeServiceDep,
    serving_size_id: UUID4
):
    return await serving_size_service.get(serving_size_id)
