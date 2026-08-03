from pydantic import BaseModel, Field
from datetime import date, time, datetime
from typing import Optional, List

# PNR Schemas
class PnrResponse(BaseModel):
    pnr_number: str
    train_number: str
    train_name: str
    coach_number: Optional[str] = None
    berth_number: Optional[str] = None
    boarding_station: Optional[str] = None
    destination_station: Optional[str] = None
    journey_date: Optional[date] = None
    journey_class: Optional[str] = None
    
    class Config:
        from_attributes = True

# Feedback Schemas
class FeedbackCreate(BaseModel):
    complaint_id: str
    rating: Optional[str] = None
    feedback: Optional[str] = None

class FeedbackResponse(BaseModel):
    rating: Optional[str] = None
    feedback_text: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

# Complaint Schemas
class ComplaintResponse(BaseModel):
    complaint_id: str
    complaint_type: str
    phone_number: str
    pnr_number: Optional[str] = None
    train_number: Optional[str] = None
    coach_number: Optional[str] = None
    station_name: Optional[str] = None
    platform_number: Optional[str] = None
    station_area: Optional[str] = None
    main_class: str
    sub_class: str
    incident_date: date
    incident_time: Optional[time] = None
    complaint_description: str
    complaint_status: str
    created_at: datetime
    zone_code: Optional[str] = None
    zone_name: Optional[str] = None
    division_name: Optional[str] = None
    remarks: Optional[str] = None
    
    # Enriched dynamic fields
    department: Optional[str] = None
    priority: Optional[str] = None
    display_status: Optional[str] = None
    
    # Embedded feedback fields
    feedback: Optional[str] = None
    rating: Optional[str] = None
    
    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    username: str
    password: str

class UpdateStatusRequest(BaseModel):
    complaint_id: str
    status: str
    remarks: Optional[str] = ""
