from pydantic import BaseModel, Field
from datetime import date, time, datetime
from typing import Optional, List

# User Schemas
class UserResponse(BaseModel):
    id: int
    username: str
    role: str
    email: Optional[str] = None
    phone_number: Optional[str] = None
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Railway Structure Schemas
class ZoneResponse(BaseModel):
    id: int
    zone_code: str
    zone_name: str
    headquarters: Optional[str] = None

    class Config:
        from_attributes = True

class DivisionResponse(BaseModel):
    id: int
    division_name: str
    division_code: str
    zone_id: int

    class Config:
        from_attributes = True

class StationResponse(BaseModel):
    id: int
    station_code: str
    station_name: str
    division_id: int
    latitude: float
    longitude: float
    platforms_count: int

    class Config:
        from_attributes = True

class TrainResponse(BaseModel):
    id: int
    train_number: str
    train_name: str
    source_station_id: int
    destination_station_id: int

    class Config:
        from_attributes = True

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

# Complaint Category Schemas
class CategoryResponse(BaseModel):
    id: int
    category_name: str
    subcategory_name: str
    department_id: int
    default_priority: str

    class Config:
        from_attributes = True

# Status History Schemas
class StatusHistoryResponse(BaseModel):
    id: int
    complaint_id: str
    from_status: str
    to_status: str
    updated_by_user_id: int
    remarks: Optional[str] = None
    updated_at: datetime

    class Config:
        from_attributes = True

# Complaint Response
class ComplaintResponse(BaseModel):
    complaint_id: str
    complaint_type: str
    phone_number: str
    pnr_number: Optional[str] = None
    train_number: Optional[str] = None
    coach_number: Optional[str] = None
    station_name: Optional[str] = None
    platform_number: Optional[str] = None
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
    
    # Enriched fields
    department: Optional[str] = None
    priority: Optional[str] = None
    display_status: Optional[str] = None
    
    # Feedback fields
    feedback: Optional[str] = None
    rating: Optional[str] = None
    
    class Config:
        from_attributes = True

# Login Request & Response
class LoginRequest(BaseModel):
    username: str
    password: str

# Status Update Request
class UpdateStatusRequest(BaseModel):
    complaint_id: str
    status: str
    remarks: Optional[str] = ""

# GPS & Location Requests
class GpsLocationRequest(BaseModel):
    latitude: float
    longitude: float

# OTP Verification Schemas
class OtpRequest(BaseModel):
    phone_number: str
    purpose: str

class OtpVerifyRequest(BaseModel):
    phone_number: str
    otp_code: str
    purpose: str
