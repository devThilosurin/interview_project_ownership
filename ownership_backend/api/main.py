from fastapi_pagination import add_pagination
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from fastapi import FastAPI
from api.config.database import database
from api.controller.OwnershipController import router as ownership_router
from api.config.config import config


async def startup():
    database.connect(config.DATABASE_URL)
    await database.create_all()


async def shutdown():
    await database.disconnect()


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await startup()
        yield
    finally:
        await shutdown()

app = FastAPI(
    title="Ownership App",
    description="API for Ownership App",
    version="1",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(ownership_router, prefix="/ownership")

add_pagination(app)
