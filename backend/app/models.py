from sqlalchemy import Column, Integer, String, Date, Time, DateTime, Text, ForeignKey, Boolean, Numeric, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

# ---------------------------------------------------------------------------
# MASTER / LOOKUP TABLES  (PK = meaningful string code, no surrogate id)
# ---------------------------------------------------------------------------

class Zone(Base):
    __tablename__ = "zones"
    zone_code    = Column(String(10),  primary_key=True)
    zone_name    = Column(String(100), nullable=False)
    headquarters = Column(String(100), nullable=True)

    divisions = relationship("Division", back_populates="zone", cascade="all, delete-orphan")


class Division(Base):
    __tablename__ = "divisions"
    division_code = Column(String(20),  primary_key=True)
    division_name = Column(String(100), nullable=False)
    zone_code     = Column(String(10),  ForeignKey("zones.zone_code", ondelete="CASCADE"), nullable=False)

    zone       = relationship("Zone",      back_populates="divisions")
    stations   = relationship("Station",   back_populates="division", cascade="all, delete-orphan")
    staff      = relationship("Staff",     back_populates="division")
    complaints = relationship("Complaint", back_populates="assigned_division")


class Station(Base):
    __tablename__ = "stations"
    station_code    = Column(String(10),  primary_key=True)
    station_name    = Column(String(150), nullable=False)
    division_code   = Column(String(20),  ForeignKey("divisions.division_code", ondelete="CASCADE"), nullable=False)
    latitude        = Column(Numeric(9, 6), nullable=False)
    longitude       = Column(Numeric(9, 6), nullable=False)
    platforms_count = Column(Integer, nullable=False, default=2)

    division                 = relationship("Division",        back_populates="stations")
    route_mappings           = relationship("TrainRoute",      back_populates="station", cascade="all, delete-orphan")
    complaints               = relationship("Complaint",        back_populates="station")
    cached_gps_locations     = relationship("StaffGpsLocation", back_populates="current_station")
    pnr_boarding_bookings    = relationship("PnrBooking", foreign_keys="PnrBooking.boarding_station_code",    overlaps="boarding_station")
    pnr_destination_bookings = relationship("PnrBooking", foreign_keys="PnrBooking.destination_station_code", overlaps="destination_station")


class Train(Base):
    __tablename__ = "trains"
    train_number             = Column(String(10),  primary_key=True)
    train_name               = Column(String(200), nullable=False)
    source_station_code      = Column(String(10),  ForeignKey("stations.station_code"), nullable=False)
    destination_station_code = Column(String(10),  ForeignKey("stations.station_code"), nullable=False)

    source_station      = relationship("Station",    foreign_keys=[source_station_code])
    destination_station = relationship("Station",    foreign_keys=[destination_station_code])
    route_stations      = relationship("TrainRoute", back_populates="train", cascade="all, delete-orphan")
    pnr_bookings        = relationship("PnrBooking", back_populates="train", cascade="all, delete-orphan")
    complaints          = relationship("Complaint",  back_populates="train")
    staff_assignments   = relationship("Staff",      back_populates="active_train")


class Department(Base):
    __tablename__ = "departments"
    department_code = Column(String(20),  primary_key=True)
    department_name = Column(String(100), unique=True, nullable=False)
    description     = Column(String(255), nullable=True)

    staff      = relationship("Staff",             back_populates="department")
    categories = relationship("ComplaintCategory", back_populates="department", cascade="all, delete-orphan")
    complaints = relationship("Complaint",          back_populates="assigned_department")


class ComplaintCategory(Base):
    __tablename__ = "complaint_categories"
    category_code    = Column(String(100), primary_key=True)
    category_name    = Column(String(150), nullable=False)
    subcategory_name = Column(String(150), nullable=False)
    department_code  = Column(String(20),  ForeignKey("departments.department_code", ondelete="CASCADE"), nullable=False)
    default_priority = Column(Enum("Low", "Medium", "High", name="category_priorities"), nullable=False, default="Medium")

    department = relationship("Department", back_populates="categories")
    complaints = relationship("Complaint",  foreign_keys="[Complaint.category_code]", back_populates="category", cascade="all, delete-orphan")


# ---------------------------------------------------------------------------
# TRANSACTIONAL / JUNCTION TABLES
# ---------------------------------------------------------------------------

class TrainRoute(Base):
    __tablename__ = "train_routes"
    train_route_id        = Column(Integer, primary_key=True, autoincrement=True)
    train_number          = Column(String(10), ForeignKey("trains.train_number",   ondelete="CASCADE"), nullable=False)
    station_code          = Column(String(10), ForeignKey("stations.station_code", ondelete="CASCADE"), nullable=False)
    stop_sequence         = Column(Integer, nullable=False)
    arrival_time          = Column(Time, nullable=True)
    departure_time        = Column(Time, nullable=True)
    distance_km           = Column(Numeric(6, 1), default=0.0)
    halt_duration_minutes = Column(Integer, nullable=True)

    train   = relationship("Train",   back_populates="route_stations")
    station = relationship("Station", back_populates="route_mappings")


class User(Base):
    __tablename__ = "users"
    user_id       = Column(String(50), primary_key=True)
    username      = Column(String(50),  unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role          = Column(Enum("Admin", "ComplaintOfficer", "Staff", "Passenger", "Inspector", "StationMaster", name="user_roles"), nullable=False)
    email         = Column(String(100), unique=True, nullable=True)
    phone_number  = Column(String(15),  nullable=True)
    is_active     = Column(Boolean, default=True)
    created_at    = Column(DateTime, default=datetime.utcnow)
    updated_at    = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    staff                 = relationship("Staff",                      uselist=False, back_populates="user", cascade="all, delete-orphan")
    notifications         = relationship("Notification",               back_populates="user", cascade="all, delete-orphan")
    status_updates        = relationship("ComplaintStatusHistory",     back_populates="updated_by_user")
    verified_complaints   = relationship("Complaint",                  foreign_keys="Complaint.verified_by_user_id", back_populates="verified_by_user")
    resolved_complaints   = relationship("Complaint",                  foreign_keys="Complaint.resolved_by_user_id", back_populates="resolved_by_user")
    assigned_histories    = relationship("ComplaintAssignmentHistory", foreign_keys="ComplaintAssignmentHistory.assigned_by_user_id", back_populates="assigned_by_user")
    escalated_histories   = relationship("ComplaintEscalationHistory", foreign_keys="ComplaintEscalationHistory.escalated_by_user_id", back_populates="escalated_by_user")
    received_escalations  = relationship("ComplaintEscalationHistory", foreign_keys="ComplaintEscalationHistory.escalated_to_user_id", back_populates="escalated_to_user")


class Staff(Base):
    __tablename__ = "staff"
    staff_id            = Column(String(50), primary_key=True)
    user_id             = Column(String(50), ForeignKey("users.user_id", ondelete="CASCADE"), unique=True, nullable=False)
    name                = Column(String(100), nullable=False)
    department_code     = Column(String(20),  ForeignKey("departments.department_code"), nullable=True)
    division_code       = Column(String(20),  ForeignKey("divisions.division_code"),     nullable=True)
    is_on_duty          = Column(Boolean, default=False)
    active_train_number = Column(String(10),  ForeignKey("trains.train_number"),         nullable=True)

    user                = relationship("User",                       back_populates="staff")
    department          = relationship("Department",                 back_populates="staff")
    division            = relationship("Division",                   back_populates="staff")
    active_train        = relationship("Train",                      back_populates="staff_assignments")
    gps_location        = relationship("StaffGpsLocation",           uselist=False, back_populates="staff", cascade="all, delete-orphan")
    assigned_complaints = relationship("Complaint",                  back_populates="assigned_staff")
    assignment_history  = relationship("ComplaintAssignmentHistory", back_populates="staff")


class StaffGpsLocation(Base):
    __tablename__ = "staff_gps_locations"
    gps_location_id      = Column(Integer, primary_key=True, autoincrement=True)
    staff_id             = Column(String(50), ForeignKey("staff.staff_id", ondelete="CASCADE"), unique=True, nullable=False)
    latitude             = Column(Numeric(9, 6), nullable=False)
    longitude            = Column(Numeric(9, 6), nullable=False)
    current_station_code = Column(String(10), ForeignKey("stations.station_code"), nullable=True)
    updated_at           = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    staff           = relationship("Staff",   back_populates="gps_location")
    current_station = relationship("Station", back_populates="cached_gps_locations")


class PnrBooking(Base):
    __tablename__ = "pnr_bookings"
    pnr_number               = Column(String(10), primary_key=True)
    train_number             = Column(String(10), ForeignKey("trains.train_number",    ondelete="CASCADE"), nullable=False)
    passenger_name           = Column(String(100), nullable=False)
    phone_number             = Column(String(15),  nullable=False)
    coach_number             = Column(String(100), nullable=False)
    seat_number              = Column(String(10),  nullable=False)
    gender                   = Column(String(10),  nullable=True)
    age                      = Column(Integer,     nullable=True)
    journey_date             = Column(Date,        nullable=False)
    boarding_station_code    = Column(String(10),  ForeignKey("stations.station_code"), nullable=False)
    destination_station_code = Column(String(10),  ForeignKey("stations.station_code"), nullable=False)
    journey_class            = Column(String(10),  nullable=False)

    train               = relationship("Train",   back_populates="pnr_bookings")
    boarding_station    = relationship("Station", foreign_keys=[boarding_station_code],    overlaps="pnr_boarding_bookings")
    destination_station = relationship("Station", foreign_keys=[destination_station_code], overlaps="pnr_destination_bookings")


class Complaint(Base):
    __tablename__ = "complaints"
    complaint_id             = Column(String(20), primary_key=True)
    complaint_type           = Column(Enum("Train", "Station", name="complaint_types"), nullable=False)
    phone_number             = Column(String(15),  nullable=False)
    pnr_number               = Column(String(10),  index=True, nullable=True)
    train_number             = Column(String(10),  ForeignKey("trains.train_number"),                nullable=True)
    coach_number             = Column(String(100), nullable=True)
    station_code             = Column(String(10),  ForeignKey("stations.station_code"),              nullable=True)
    platform_number          = Column(String(10),  nullable=True)
    
    # Passenger-submitted category selection
    category_code            = Column(String(100), ForeignKey("complaint_categories.category_code"), nullable=False)
    
    # Complaint Management Officer verified fields
    verified_category_code   = Column(String(100), ForeignKey("complaint_categories.category_code"), nullable=True)
    verified_by_user_id      = Column(String(50),  ForeignKey("users.user_id"),                        nullable=True)
    verified_at              = Column(DateTime,                                                       nullable=True)
    verification_remarks     = Column(Text,                                                           nullable=True)

    incident_date            = Column(Date,  nullable=False)
    incident_time            = Column(Time,  nullable=True)
    complaint_description    = Column(Text,  nullable=False)
    
    # Single source of truth: internal lifecycle status
    internal_status          = Column(Enum(
        "Pending Review", "Under Review", "Assigned", "Accepted",
        "In Progress", "Unable to Resolve", "Reassignment Requested",
        "Reassigned", "Escalated", "Resolved", "Closed",
        name="internal_complaint_statuses"
    ), nullable=False, default="Pending Review")

    is_critical              = Column(Boolean, default=False, nullable=False)

    # Current assignment pointers
    assigned_department_code = Column(String(20), ForeignKey("departments.department_code"), nullable=True)
    assigned_division_code   = Column(String(20), ForeignKey("divisions.division_code"),    nullable=True)
    assigned_staff_id        = Column(String(50), ForeignKey("staff.staff_id"),          nullable=True)

    priority                 = Column(Enum("Low", "Medium", "High", name="complaint_priorities"), nullable=False, default="Medium")
    complaint_source         = Column(Enum("Passenger Portal", "Staff Portal", "Admin Portal", "Mobile App", "API", name="complaint_sources"), nullable=False, default="Passenger Portal")
    created_at               = Column(DateTime, default=datetime.utcnow)
    updated_at               = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    assigned_at              = Column(DateTime, nullable=True)
    
    # Resolution fields
    resolution_remarks       = Column(Text, nullable=True)
    resolved_by_user_id      = Column(String(50), ForeignKey("users.user_id"), nullable=True)
    resolved_at              = Column(DateTime, nullable=True)

    # Relationships
    train               = relationship("Train",                      back_populates="complaints")
    station             = relationship("Station",                    back_populates="complaints")
    category            = relationship("ComplaintCategory",          foreign_keys=[category_code], back_populates="complaints")
    verified_category   = relationship("ComplaintCategory",          foreign_keys=[verified_category_code])
    verified_by_user    = relationship("User",                       foreign_keys=[verified_by_user_id], back_populates="verified_complaints")
    assigned_department = relationship("Department",                 back_populates="complaints")
    assigned_division   = relationship("Division",                   back_populates="complaints")
    assigned_staff      = relationship("Staff",                      back_populates="assigned_complaints")
    resolved_by_user    = relationship("User",                       foreign_keys=[resolved_by_user_id], back_populates="resolved_complaints")
    feedback            = relationship("Feedback",                   uselist=False, back_populates="complaint", cascade="all, delete-orphan")
    status_history      = relationship("ComplaintStatusHistory",     back_populates="complaint", cascade="all, delete-orphan")
    assignment_history  = relationship("ComplaintAssignmentHistory", back_populates="complaint", cascade="all, delete-orphan")
    escalation_history  = relationship("ComplaintEscalationHistory", back_populates="complaint", cascade="all, delete-orphan")

    @property
    def status(self) -> str:
        """Alias for internal_status to preserve backward compatibility."""
        return self.internal_status

    @status.setter
    def status(self, value: str):
        self.internal_status = value

    @property
    def passenger_status(self) -> str:
        """Dynamically maps internal_status to the 3 passenger-facing statuses: OPEN, IN-PROGRESS, RESOLVED."""
        if self.internal_status in ("Pending Review", "Under Review"):
            return "OPEN"
        elif self.internal_status in ("Resolved", "Closed"):
            return "RESOLVED"
        else:
            return "IN-PROGRESS"


class Feedback(Base):
    __tablename__ = "feedbacks"
    feedback_id   = Column(Integer, primary_key=True, autoincrement=True)
    complaint_id  = Column(String(20), ForeignKey("complaints.complaint_id", ondelete="CASCADE"), unique=True, nullable=False)
    rating        = Column(String(50), nullable=False)
    feedback_text = Column(Text,  nullable=True)
    created_at    = Column(DateTime, default=datetime.utcnow)

    complaint = relationship("Complaint", back_populates="feedback")


class ComplaintStatusHistory(Base):
    __tablename__ = "complaint_status_history"
    history_id         = Column(Integer, primary_key=True, autoincrement=True)
    complaint_id       = Column(String(20), ForeignKey("complaints.complaint_id", ondelete="CASCADE"), nullable=False)
    from_status        = Column(String(50), nullable=True) # Nullable for initial creation
    to_status          = Column(String(50), nullable=False)
    updated_by_user_id = Column(String(50), ForeignKey("users.user_id"), nullable=True) # Nullable for passenger registration
    remarks            = Column(Text, nullable=True)
    updated_at         = Column(DateTime, default=datetime.utcnow)

    complaint       = relationship("Complaint", back_populates="status_history")
    updated_by_user = relationship("User",      back_populates="status_updates")

    @property
    def previous_status(self):
        return self.from_status

    @property
    def new_status(self):
        return self.to_status


class ComplaintAssignmentHistory(Base):
    __tablename__ = "complaint_assignment_history"
    assignment_id       = Column(Integer, primary_key=True, autoincrement=True)
    complaint_id        = Column(String(20), ForeignKey("complaints.complaint_id", ondelete="CASCADE"), nullable=False)
    staff_id            = Column(String(50), ForeignKey("staff.staff_id", ondelete="CASCADE"), nullable=False)
    department_code     = Column(String(20), ForeignKey("departments.department_code"), nullable=False)
    assigned_by_user_id = Column(String(50), ForeignKey("users.user_id"), nullable=False)
    status              = Column(Enum(
        "ASSIGNED", "ACCEPTED", "IN_PROGRESS", "COMPLETED",
        "REASSIGNMENT_REQUESTED", "REASSIGNED", "CANCELLED",
        name="assignment_statuses"
    ), nullable=False, default="ASSIGNED")
    assigned_at         = Column(DateTime, default=datetime.utcnow, nullable=False)
    reassignment_reason = Column(Text, nullable=True)
    completed_at        = Column(DateTime, nullable=True)

    complaint        = relationship("Complaint",  back_populates="assignment_history")
    staff            = relationship("Staff",      back_populates="assignment_history")
    department       = relationship("Department")
    assigned_by_user = relationship("User",       back_populates="assigned_histories")


class ComplaintEscalationHistory(Base):
    __tablename__ = "complaint_escalation_history"
    escalation_id        = Column(Integer, primary_key=True, autoincrement=True)
    complaint_id         = Column(String(20), ForeignKey("complaints.complaint_id", ondelete="CASCADE"), nullable=False)
    escalated_by_user_id = Column(String(50), ForeignKey("users.user_id"), nullable=False)
    escalated_to_user_id = Column(String(50), ForeignKey("users.user_id"), nullable=True)
    escalated_to_role    = Column(String(50), default="Admin", nullable=False)
    reason               = Column(Text, nullable=False)
    status               = Column(Enum("OPEN", "UNDER_REVIEW", "RESOLVED", name="escalation_statuses"), nullable=False, default="OPEN")
    created_at           = Column(DateTime, default=datetime.utcnow, nullable=False)
    resolved_at          = Column(DateTime, nullable=True)

    complaint         = relationship("Complaint", back_populates="escalation_history")
    escalated_by_user = relationship("User",      foreign_keys=[escalated_by_user_id], back_populates="escalated_histories")
    escalated_to_user = relationship("User",      foreign_keys=[escalated_to_user_id], back_populates="received_escalations")


class OtpVerification(Base):
    __tablename__ = "otp_verifications"
    otp_id       = Column(Integer, primary_key=True, autoincrement=True)
    phone_number = Column(String(15), nullable=False)
    otp_code     = Column(String(6),  nullable=False)
    purpose      = Column(String(50), nullable=False)
    expires_at   = Column(DateTime,   nullable=False)
    is_verified  = Column(Boolean, default=False)
    created_at   = Column(DateTime, default=datetime.utcnow)


class Notification(Base):
    __tablename__ = "notifications"
    notification_id   = Column(Integer, primary_key=True, autoincrement=True)
    user_id           = Column(String(50), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    notification_type = Column(String(50),  nullable=False)
    title             = Column(String(150), nullable=False)
    message           = Column(Text,  nullable=False)
    is_read           = Column(Boolean, default=False)
    created_at        = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="notifications")
