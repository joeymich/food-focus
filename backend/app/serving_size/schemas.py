from pydantic import BaseModel, UUID4


class ServingSizeRead(BaseModel):
    id: UUID4
    food_id: UUID4
    name: str
    ratio: float
