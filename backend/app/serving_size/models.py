from app.db import Base
from app.db.mixins import IdMixin

from sqlalchemy import Column, Float, UUID, ForeignKey, String


class ServingSize(IdMixin, Base):
    food_id = Column(
        UUID,
        ForeignKey('food.id', ondelete='CASCADE'),
        index=True,
        nullable=False
    )
    name = Column(String, nullable=False)
    ratio = Column(Float, nullable=False)
