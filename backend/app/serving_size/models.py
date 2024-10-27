
from sqlalchemy import Column, Float, UUID, ForeignKey, String
from sqlalchemy.orm import relationship

from app.db import Base
from app.db.mixins import IdMixin
from app.food.models import Food


class ServingSize(IdMixin, Base):
    food_id = Column(
        UUID,
        ForeignKey('food.id', ondelete='CASCADE'),
        index=True,
        nullable=False
    )
    food = relationship(Food, uselist=False, viewonly=True)
    name = Column(String, nullable=False)
    ratio = Column(Float, nullable=False)
