from sqlalchemy import Column, DateTime, Integer, UUID, ForeignKey, Date

from app.db import Base
from app.db.mixins import IdMixin


class Goal(IdMixin, Base):
    user_id = Column(
        UUID,
        ForeignKey('user.id', ondelete='CASCADE'),
        index=True,
        nullable=False
    )
    cal_goal = Column(Integer, nullable=True)
    protein_goal = Column(Integer, nullable=True)
    fat_goal = Column(Integer, nullable=True)
    carb_goal = Column(Integer, nullable=True)
    goal_start = Column(Date, nullable=False)
    goal_end = Column(Date, nullable=False)
