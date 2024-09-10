from uuid import uuid4

from sqlalchemy import Column, UUID, text


class IdMixin:
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid4,
        server_default=text('gen_random_uuid()'),
    )
