from fastapi import HTTPException, status
from api.model.Ownership import Ownership


class OwnershipService:

    async def get_all(self, db):
        try:
            return await Ownership.get_all(db)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=str(e)
            )

    async def create(self, db, **kwargs):
        try:
            # NOTE: if want to add validation **kwargs
            return await Ownership.create(db, **kwargs)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=str(e)
            )

    async def update(self, db, hn, **kwargs):
        try:
            # NOTE: if want to add validation **kwargs
            return await Ownership.update(db, hn, **kwargs)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=str(e)
            )

    async def delete(self, db, hn):
        try:
            return await Ownership.delete(db, hn)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=str(e)
            )
