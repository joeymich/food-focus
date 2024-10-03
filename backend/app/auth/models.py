from app.db import Base
from app.db.mixins import IdMixin

from sqlalchemy import Column, String, LargeBinary, Boolean


class User(IdMixin, Base):
    email = Column(String, unique=True)
    email_verified = Column(Boolean, default=False)
    password = Column(LargeBinary)
