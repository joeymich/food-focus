from sqlalchemy import Column, String
from .. import Base
from ..mixins import IdMixin

#Stores information about the user
class users(IdMixin, Base):
    __tablename__ = "users"
    
    email = Column(String, unique = True, nullable = False)
    password = Column(String, nullable = False)
    username = Column(String, nullable = False)   