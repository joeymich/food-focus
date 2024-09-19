from sqlalchemy import Column, String
from app import Base

class users(Base):
    __tablename__ = "users"
    
    email = Column(String, unique = True, nullable = False, primary_key=True)
    password = Column(String, nullable = False)
    username = Column(String, nullable = False)    