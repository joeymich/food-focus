from sqlalchemy import Column, String, DECIMAL, UUID
from .. import Base
from ..mixins import IdMixin

#Stores information about what the user eats
class nutrition(IdMixin, Base):
    __tablename__ = "nutrition"
    
    #Per_amount means the nutrition informaion per grams, liters, individual amount (such as per macaron), ect...
    per_amount = Column(String, nullable = False)
    #Name of the micronutrient (calcium, potassium, ect...)
    micronutrient = Column(String, nullable = False)
    #Amount of the micronutrient in the food, per mg
    mn_amount = Column(DECIMAL, nullable = False)
    daily_value_percent = Column(String, nullable = False)
    
    