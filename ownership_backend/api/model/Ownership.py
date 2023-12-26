from api.config.database import Base
from sqlalchemy.sql import expression as sql
from sqlalchemy import Column, String, DateTime
from datetime import datetime
from uuid import uuid4
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlalchemy_future import paginate


class Ownership(Base):
    __tablename__ = "ownership_user"
    hn = Column(String, index=True, primary_key=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return (
            f"<{self.__class__.__name__}("
            f"hn={self.hn!r}, "
            f"first_name={self.first_name!r}, "
            f"last_name={self.last_name!r}, "
            f"phone={self.phone!r}, "
            f"email={self.email!r}, "
        )

    @classmethod
    async def get_all(cls, db) -> list['Ownership']:
        query = sql.select(cls).order_by(cls.created_at.desc())
        ownership = await db.execute(query)
        return ownership.scalars().all()
        # return await paginate(db, query)

    @classmethod
    async def create(cls, db, **kwargs):
        query = (
            sql.insert(cls)
            .values(hn=str(uuid4()), **kwargs)
            .returning(
                cls.hn,
                cls.first_name,
                cls.last_name,
                cls.phone,
                cls.email,
            )
        )
        ownership = await db.execute(query)
        await db.commit()
        return ownership.first()

    @classmethod
    async def update(cls, db, hn, **kwargs):
        query = (
            sql.update(cls)
            .where(cls.hn == hn)
            .values(**kwargs)
            .execution_options(synchronize_session="fetch")
            .returning(
                cls.hn,
                cls.first_name,
                cls.last_name,
                cls.phone,
                cls.email,
            )
        )
        ownership = await db.execute(query)
        await db.commit()
        return ownership.first()

    @classmethod
    async def delete(cls, db, hn) -> bool:
        query = (
            sql.delete(cls)
            .where(cls.hn == hn)
            .returning(
                cls.hn,
                cls.first_name,
                cls.last_name
            )
        )
        await db.execute(query)
        await db.commit()
        return True
