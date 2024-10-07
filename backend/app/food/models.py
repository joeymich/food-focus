from app.db import Base
from app.db.mixins import IdMixin

from sqlalchemy import Column, String, Integer


class Food(IdMixin, Base):
    brand = Column(String)
    name = Column(String)
    calories = Column(Integer)
    total_fat = Column(Integer)
    saturated_fat = Column(Integer)
    polyunsaturated_fat = Column(Integer)
    monounsaturated_fat = Column(Integer)
    trans_fat = Column(Integer)
    sodium = Column(Integer)
    potassium = Column(Integer)
    total_carbs = Column(Integer)
    dietary_fiber = Column(Integer)
    sugars = Column(Integer)
    protein = Column(Integer)
    vitamin_a = Column(Integer)
    vitamin_c = Column(Integer)
    calcium = Column(Integer)
    iron = Column(Integer)
