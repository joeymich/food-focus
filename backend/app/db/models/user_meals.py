from sqlalchemy import Column, String, Integer, UUID
from .. import Base
from ..mixins import IdMixin

#Stores information about what the user eats
class user_meals(IdMixin, Base):
    __tablename__ = "user_meals"
    
    userID = Column(UUID, nullable = False)
    food = Column(String, nullable = False)
    amount_eaten = Column(Integer, nullable = False)
    calories = Column(String, nullable = False) 