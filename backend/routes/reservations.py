from fastapi import APIRouter, HTTPException
from models import Reservation, ReservationCreate
from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime

router = APIRouter()

def get_reservations_router(db: AsyncIOMotorDatabase):
    @router.post("/reservations", response_model=Reservation)
    async def create_reservation(reservation_data: ReservationCreate):
        try:
            reservation_dict = reservation_data.dict()
            reservation = Reservation(**reservation_dict)
            
            result = await db.reservations.insert_one(reservation.dict())
            
            if not result.inserted_id:
                raise HTTPException(status_code=500, detail="Erreur lors de la création de la réservation")
            
            return reservation
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    @router.get("/reservations", response_model=List[Reservation])
    async def get_all_reservations():
        try:
            reservations = await db.reservations.find().sort("createdAt", -1).to_list(1000)
            return [Reservation(**reservation) for reservation in reservations]
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    @router.get("/reservations/{reservation_id}", response_model=Reservation)
    async def get_reservation(reservation_id: str):
        try:
            reservation = await db.reservations.find_one({"id": reservation_id})
            if not reservation:
                raise HTTPException(status_code=404, detail="Réservation non trouvée")
            return Reservation(**reservation)
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    @router.patch("/reservations/{reservation_id}/status")
    async def update_reservation_status(reservation_id: str, status: str):
        try:
            result = await db.reservations.update_one(
                {"id": reservation_id},
                {"$set": {"status": status}}
            )
            
            if result.matched_count == 0:
                raise HTTPException(status_code=404, detail="Réservation non trouvée")
            
            return {"message": "Statut mis à jour avec succès", "status": status}
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    @router.delete("/reservations/{reservation_id}")
    async def delete_reservation(reservation_id: str):
        try:
            result = await db.reservations.delete_one({"id": reservation_id})
            
            if result.deleted_count == 0:
                raise HTTPException(status_code=404, detail="Réservation non trouvée")
            
            return {"message": "Réservation supprimée avec succès"}
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    
    return router