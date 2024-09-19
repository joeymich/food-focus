from sqlalchemy import Column, String, Integer, UUID
from .. import Base
from ..mixins import IdMixin

#Stores information about what the user eats
class meals(IdMixin, Base):
    __tablename__ = "meals"
    
    userID = Column(UUID, nullable = False)
    food = Column(String, nullable = False)
    amount_eaten = Column(Integer, nullable = False)
    calories = Column(String, nullable = False) 