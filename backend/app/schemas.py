from pydantic import BaseModel
from datetime import date, time, datetime
from typing import Optional

# ---------------------------------------------------------------------------
# User / Auth Schemas
# ---------------------------------------------------------------------------
class UserResponse(BaseModel):
    user_id:      str
    username:     str
    role:         str
    email:        Optional[str] = None
    phone_number: Optional[str] = None
    is_active:    bool
    created_at:   datetime

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    username: str
    password: str

class ChangePasswordRequest(BaseModel):
    new_password: str


class UpdateProfileRequest(BaseModel):
    email: Optional[str] = None
    phone_number: Optional[str] = None
    full_name: Optional[str] = None


# ---------------------------------------------------------------------------
# Railway Structure Schemas
# ---------------------------------------------------------------------------
class ZoneResponse(BaseModel):
    zone_code:    str
    zone_name:    str
    headquarters: Optional[str] = None

    class Config:
        from_attributes = True

class DivisionResponse(BaseModel):
    division_code: str
    division_name: str
    zone_code:     str

    class Config:
        from_attributes = True

class StationResponse(BaseModel):
    station_code:    str
    station_name:    str
    division_code:   str
    latitude:        float
    longitude:       float
    platforms_count: int

    class Config:
        from_attributes = True

class TrainResponse(BaseModel):
    train_number:             str
    train_name:               str
    source_station_code:      str
    destination_station_code: str

    class Config:
        from_attributes = True

# ---------------------------------------------------------------------------
# PNR Schemas
# ---------------------------------------------------------------------------
class PnrResponse(BaseModel):
    pnr_number:          str
    train_number:        str
    train_name:          str
    coach_number:        Optional[str] = None
    berth_number:        Optional[str] = None
    boarding_station:    Optional[str] = None
    destination_station: Optional[str] = None
    journey_date:        Optional[date] = None
    journey_class:       Optional[str] = None
    phone_number:        Optional[str] = None

    class Config:
        from_attributes = True

# ---------------------------------------------------------------------------
# Complaint Category Schemas
# ---------------------------------------------------------------------------
class CategoryResponse(BaseModel):
    category_code:    str
    category_name:    str
    subcategory_name: str
    department_code:  str
    default_priority: str

    class Config:
        from_attributes = True

# ---------------------------------------------------------------------------
# Feedback Schemas
# ---------------------------------------------------------------------------
class FeedbackCreate(BaseModel):
    complaint_id: str
    rating:       Optional[str] = None
    feedback:     Optional[str] = None

class FeedbackResponse(BaseModel):
    feedback_id:   int
    complaint_id:  str
    rating:        Optional[str] = None
    feedback_text: Optional[str] = None
    created_at:    datetime

    class Config:
        from_attributes = True

# ---------------------------------------------------------------------------
# Status History Schemas
# ---------------------------------------------------------------------------
class StatusHistoryResponse(BaseModel):
    history_id:         int
    complaint_id:       str
    from_status:        str
    to_status:          str
    updated_by_user_id: str
    remarks:            Optional[str] = None
    updated_at:         datetime

    class Config:
        from_attributes = True

# ---------------------------------------------------------------------------
# Complaint Response
# ---------------------------------------------------------------------------
class ComplaintResponse(BaseModel):
    complaint_id:          str
    complaint_type:        str
    phone_number:          str
    pnr_number:            Optional[str] = None
    train_number:          Optional[str] = None
    coach_number:          Optional[str] = None
    station_name:          Optional[str] = None
    platform_number:       Optional[str] = None
    main_class:            str
    sub_class:             str
    incident_date:         date
    incident_time:         Optional[time] = None
    complaint_description: str
    complaint_status:      str
    created_at:            datetime
    zone_code:             Optional[str] = None
    zone_name:             Optional[str] = None
    division_name:         Optional[str] = None
    remarks:               Optional[str] = None
    department:            Optional[str] = None
    priority:              Optional[str] = None
    display_status:        Optional[str] = None
    feedback:              Optional[str] = None
    rating:                Optional[str] = None
    sla_target_minutes:    Optional[int] = None
    sla_target_formatted:  Optional[str] = None
    sla1_target_formatted: Optional[str] = None
    sla2_target_formatted: Optional[str] = None
    sla3_target_formatted: Optional[str] = None
    sla_tier:              Optional[str] = None
    sla_due_at:            Optional[str] = None
    sla3_due_at:           Optional[str] = None
    sla_status:            Optional[str] = None
    sla_breached:          Optional[bool] = None
    sla_warning:           Optional[bool] = None
    sla_time_details:      Optional[str] = None
    sla_remaining_minutes: Optional[int] = None

    class Config:
        from_attributes = True

# ---------------------------------------------------------------------------
# Status Update Request
# ---------------------------------------------------------------------------
class UpdateStatusRequest(BaseModel):
    complaint_id: str
    status:       str
    remarks:      Optional[str] = ""

# ---------------------------------------------------------------------------
# GPS & Location Requests
# ---------------------------------------------------------------------------
class GpsLocationRequest(BaseModel):
    latitude:  float
    longitude: float

# ---------------------------------------------------------------------------
# OTP Verification Schemas
# ---------------------------------------------------------------------------
class OtpRequest(BaseModel):
    phone_number: str
    purpose:      str

class OtpVerifyRequest(BaseModel):
    phone_number: str
    otp_code:     str
    purpose:      str

# ---------------------------------------------------------------------------
# Phase 2 Complaint Lifecycle Schemas
# ---------------------------------------------------------------------------
class VerifyComplaintRequest(BaseModel):
    verified_category_code: Optional[str] = None
    priority:               Optional[str] = None
    is_critical:            Optional[bool] = None
    verification_remarks:   Optional[str] = None

class AssignComplaintRequest(BaseModel):
    staff_id:               str
    verified_category_code: Optional[str] = None
    priority:               Optional[str] = None
    is_critical:            Optional[bool] = None

class RequestReassignmentRequest(BaseModel):
    reason:  str
    remarks: Optional[str] = None

class ReassignComplaintRequest(BaseModel):
    new_staff_id: str
    reason:       Optional[str] = None

class EscalateComplaintRequest(BaseModel):
    reason:            str
    escalated_to_role: Optional[str] = "Admin"

class ResolveComplaintRequest(BaseModel):
    resolution_remarks: str

class UpdateInventoryRequest(BaseModel):
    quantity: int
    status:   Optional[str] = None

