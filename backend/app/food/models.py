from app.db import Base
from app.db.mixins import IdMixin

from sqlalchemy import Column, String, Float
from sqlalchemy.orm import relationship


class Food(IdMixin, Base):
    brand = Column(String, index=True)
    name = Column(String, nullable=False, index=True)
    calories = Column(Float)
    total_fat = Column(Float)
    saturated_fat = Column(Float)
    polyunsaturated_fat = Column(Float)
    monounsaturated_fat = Column(Float)
    trans_fat = Column(Float)
    sodium = Column(Float)
    potassium = Column(Float)
    total_carbs = Column(Float)
    dietary_fiber = Column(Float)
    sugars = Column(Float)
    added_sugars = Column(Float)
    added_sugars = Column(Float)
    protein = Column(Float)
    vitamin_a = Column(Float)
    vitamin_c = Column(Float)
    calcium = Column(Float)
    iron = Column(Float)

    serving_sizes = relationship('ServingSize')
