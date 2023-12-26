from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.orm import declarative_base
# from sqlalchemy.sql.ddl import DropTable

from api.config.config import config

Base = declarative_base()


class Database:
    def __init__(self):
        self.__session = None
        self.__engine = None

    def connect(self, db_config):
        self.__engine = create_async_engine(config.DATABASE_URL)

        self.__session = async_sessionmaker(
            bind=self.__engine, autocommit=False)

    async def disconnect(self): await self.__engine.dispose()

    async def create_all(self):
        async with self.__engine.begin() as conn:
            # await conn.execute(DropTable(Base.metadata.tables['ownership'], if_exists=True))
            await conn.run_sync(Base.metadata.create_all)

    async def get_db(self):
        async with self.__session() as session:
            yield session


database = Database()
