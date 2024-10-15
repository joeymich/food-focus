from app.db import Base
from app.db.mixins import IdMixin

from sqlalchemy import Column, ForeignKey, UUID, Float, Date, Enum
from sqlalchemy.orm import relationship

from app.serving_size.models import ServingSize

from .enums import MealEnum


class FoodLog(IdMixin, Base):
    user_id = Column(
        UUID,
        ForeignKey('user.id', ondelete='CASCADE'),
        index=True,
        nullable=False
    )
    serving_size_id = Column(
        UUID,
        ForeignKey('serving_size.id', ondelete='CASCADE'),
        index=True,
        nullable=False,
    )
    serving_count = Column(Float, nullable=False)
    date = Column(Date, nullable=False)
    meal = Column(
        Enum(MealEnum),
        default=MealEnum.BREAKFAST,
    )
    serving_size = relationship(ServingSize, uselist=False)
