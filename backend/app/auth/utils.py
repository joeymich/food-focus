import bcrypt


def hash_password(password: str) -> bytes:
    pw = bytes(password, 'utf-8')
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pw, salt)


def check_password(password: str, hashed_password: bytes) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password)
