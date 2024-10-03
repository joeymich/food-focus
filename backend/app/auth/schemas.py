from typing import Annotated

from pydantic import BaseModel, UUID4, EmailStr, field_validator
from fastapi import Query


PasswordStr = Annotated[str, Query(min_length=8)]


class Register(BaseModel):
    email: EmailStr

    @field_validator('email')
    @classmethod
    def _(cls, v: EmailStr):
        return v.lower()

    password: PasswordStr


class Login(BaseModel):
    email: EmailStr

    @field_validator('email')
    @classmethod
    def _(cls, v: EmailStr):
        return v.lower()

    password: PasswordStr


class UserRead(BaseModel):
    id: UUID4
    email: EmailStr
    email_verified: bool
