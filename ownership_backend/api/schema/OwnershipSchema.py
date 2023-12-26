from pydantic import BaseModel
from pydantic_settings import SettingsConfigDict


class OwnershipSchema(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: str


class OwnershipSerializer(BaseModel):
    hn: str
    first_name: str
    last_name: str
    phone: str
    email: str

    model_config = SettingsConfigDict(from_attributes=True)
