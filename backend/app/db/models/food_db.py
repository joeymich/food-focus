from sqlalchemy import Column, String, DECIMAL, UUID
from .. import Base
from ..mixins import IdMixin

#Stores nutritional information about different foods (apples, steak, ect..)
class food_db(IdMixin, Base):
    __tablename__ = "food_db"
    
    food_name = Column(String, nullable = False)
    food_group = Column(String, nullable = False)
    avg_serving_size = Column(String, nullable = True)