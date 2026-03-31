from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class ReservationCreate(BaseModel):
    nom: str
    email: EmailStr
    telephone: str
    massage: str
    date: str
    timeSlot: str
    message: Optional[str] = ""
    status: str = "pending"

class Reservation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nom: str
    email: EmailStr
    telephone: str
    massage: str
    date: str
    timeSlot: str
    message: Optional[str] = ""
    status: str = "pending"
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nom: str
    email: EmailStr
    message: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)