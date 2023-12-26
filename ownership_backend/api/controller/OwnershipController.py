from fastapi import APIRouter, Depends, status
# from fastapi_pagination import Page
from api.config.database import database
from api.schema.OwnershipSchema import OwnershipSchema, OwnershipSerializer
from api.service.OwnershipService import OwnershipService

router = APIRouter()


@router.get("/all")
async def get_ownerships(
    ownership_service=Depends(OwnershipService),
    db_session=Depends(database.get_db)
) -> list[OwnershipSerializer]:
    return await ownership_service.get_all(db_session)


@router.post("/add", status_code=status.HTTP_201_CREATED)
async def add_ownership(
    province: OwnershipSchema,
    ownership_service=Depends(OwnershipService),
    db_session=Depends(database.get_db)
) -> OwnershipSerializer:
    return await ownership_service.create(db_session, **province.model_dump())


@router.patch("/update/{hn}", status_code=status.HTTP_202_ACCEPTED)
async def update_ownership(
    hn: str,
    province: OwnershipSchema,
    ownership_service=Depends(OwnershipService),
    db_session=Depends(database.get_db)
) -> OwnershipSerializer:
    return await ownership_service.update(db_session, hn, **province.model_dump())


@router.delete("/delete/{hn}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_ownership(
    hn: str,
    ownership_service=Depends(OwnershipService),
    db_session=Depends(database.get_db)
) -> None:
    return await ownership_service.delete(db_session, hn)
