from sqlalchemy import Column, Integer, String, Date, Time, DateTime, Text, ForeignKey, Boolean, Numeric, Table, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class Zone(Base):
    __tablename__ = "zones"
    id = Column(Integer, primary_key=True, autoincrement=True)
    zone_code = Column(String(10), unique=True, nullable=False)
    zone_name = Column(String(100), nullable=False)
    headquarters = Column(String(100), nullable=True)

    divisions = relationship("Division", back_populates="zone", cascade="all, delete-orphan")

class Division(Base):
    __tablename__ = "divisions"
    id = Column(Integer, primary_key=True, autoincrement=True)
    division_name = Column(String(100), nullable=False)
    division_code = Column(String(20), unique=True, nullable=False)
    zone_id = Column(Integer, ForeignKey("zones.id", ondelete="CASCADE"), nullable=False)

    zone = relationship("Zone", back_populates="divisions")
    stations = relationship("Station", back_populates="division", cascade="all, delete-orphan")
    staff = relationship("Staff", back_populates="division")
    complaints = relationship("Complaint", back_populates="assigned_division")

class Station(Base):
    __tablename__ = "stations"
    id = Column(Integer, primary_key=True, autoincrement=True)
    station_code = Column(String(10), unique=True, nullable=False)
    station_name = Column(String(150), nullable=False)
    division_id = Column(Integer, ForeignKey("divisions.id", ondelete="CASCADE"), nullable=False)
    latitude = Column(Numeric(9, 6), nullable=False)
    longitude = Column(Numeric(9, 6), nullable=False)
    platforms_count = Column(Integer, nullable=False, default=2)

    division = relationship("Division", back_populates="stations")
    route_mappings = relationship("TrainRoute", back_populates="station", cascade="all, delete-orphan")
    complaints = relationship("Complaint", back_populates="station")
    cached_gps_locations = relationship("StaffGpsLocation", back_populates="current_station")
    pnr_boarding_bookings = relationship("PnrBooking", foreign_keys="PnrBooking.boarding_station_id")
    pnr_destination_bookings = relationship("PnrBooking", foreign_keys="PnrBooking.destination_station_id")

class Train(Base):
    __tablename__ = "trains"
    id = Column(Integer, primary_key=True, autoincrement=True)
    train_number = Column(String(10), unique=True, nullable=False)
    train_name = Column(String(200), nullable=False)
    source_station_id = Column(Integer, ForeignKey("stations.id"), nullable=False)
    destination_station_id = Column(Integer, ForeignKey("stations.id"), nullable=False)

    source_station = relationship("Station", foreign_keys=[source_station_id])
    destination_station = relationship("Station", foreign_keys=[destination_station_id])
    route_stations = relationship("TrainRoute", back_populates="train", cascade="all, delete-orphan")
    pnr_bookings = relationship("PnrBooking", back_populates="train", cascade="all, delete-orphan")
    complaints = relationship("Complaint", back_populates="train")
    staff_assignments = relationship("Staff", back_populates="active_train")

class TrainRoute(Base):
    __tablename__ = "train_routes"
    id = Column(Integer, primary_key=True, autoincrement=True)
    train_id = Column(Integer, ForeignKey("trains.id", ondelete="CASCADE"), nullable=False)
    station_id = Column(Integer, ForeignKey("stations.id", ondelete="CASCADE"), nullable=False)
    stop_sequence = Column(Integer, nullable=False)
    arrival_time = Column(Time, nullable=True)
    departure_time = Column(Time, nullable=True)
    distance_km = Column(Numeric(6, 1), default=0.0)

    train = relationship("Train", back_populates="route_stations")
    station = relationship("Station", back_populates="route_mappings")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(Enum('Admin', 'Inspector', 'StationMaster', name='user_roles'), nullable=False)
    email = Column(String(100), unique=True, nullable=True)
    phone_number = Column(String(15), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    staff = relationship("Staff", uselist=False, back_populates="user", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")
    status_updates = relationship("ComplaintStatusHistory", back_populates="updated_by_user")

class Department(Base):
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), unique=True, nullable=False)
    department_code = Column(String(20), unique=True, nullable=False)
    description = Column(String(255), nullable=True)

    staff = relationship("Staff", back_populates="department")
    categories = relationship("ComplaintCategory", back_populates="department", cascade="all, delete-orphan")
    complaints = relationship("Complaint", back_populates="assigned_department")

class Staff(Base):
    __tablename__ = "staff"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    name = Column(String(100), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=True)
    division_id = Column(Integer, ForeignKey("divisions.id"), nullable=True)
    is_on_duty = Column(Boolean, default=False)
    active_train_id = Column(Integer, ForeignKey("trains.id"), nullable=True)

    user = relationship("User", back_populates="staff")
    department = relationship("Department", back_populates="staff")
    division = relationship("Division", back_populates="staff")
    active_train = relationship("Train", back_populates="staff_assignments")
    gps_location = relationship("StaffGpsLocation", uselist=False, back_populates="staff", cascade="all, delete-orphan")
    assigned_complaints = relationship("Complaint", back_populates="assigned_staff")

class StaffGpsLocation(Base):
    __tablename__ = "staff_gps_locations"
    id = Column(Integer, primary_key=True, autoincrement=True)
    staff_id = Column(Integer, ForeignKey("staff.id", ondelete="CASCADE"), unique=True, nullable=False)
    latitude = Column(Numeric(9, 6), nullable=False)
    longitude = Column(Numeric(9, 6), nullable=False)
    current_station_id = Column(Integer, ForeignKey("stations.id"), nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    staff = relationship("Staff", back_populates="gps_location")
    current_station = relationship("Station", back_populates="cached_gps_locations")

class PnrBooking(Base):
    __tablename__ = "pnr_bookings"
    id = Column(Integer, primary_key=True, autoincrement=True)
    pnr_number = Column(String(10), index=True, nullable=False)
    train_id = Column(Integer, ForeignKey("trains.id", ondelete="CASCADE"), nullable=False)
    passenger_name = Column(String(100), nullable=False)
    phone_number = Column(String(15), nullable=False)
    coach_number = Column(String(100), nullable=False)
    seat_number = Column(String(10), nullable=False)
    gender = Column(String(10), nullable=True)
    age = Column(Integer, nullable=True)
    journey_date = Column(Date, nullable=False)
    boarding_station_id = Column(Integer, ForeignKey("stations.id"), nullable=False)
    destination_station_id = Column(Integer, ForeignKey("stations.id"), nullable=False)
    journey_class = Column(String(10), nullable=False)

    train = relationship("Train", back_populates="pnr_bookings")
    boarding_station = relationship("Station", foreign_keys=[boarding_station_id])
    destination_station = relationship("Station", foreign_keys=[destination_station_id])

class ComplaintCategory(Base):
    __tablename__ = "complaint_categories"
    id = Column(Integer, primary_key=True, autoincrement=True)
    category_name = Column(String(150), nullable=False)
    subcategory_name = Column(String(150), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id", ondelete="CASCADE"), nullable=False)
    default_priority = Column(Enum('Low', 'Medium', 'High', name='category_priorities'), nullable=False, default='Medium')

    department = relationship("Department", back_populates="categories")
    complaints = relationship("Complaint", back_populates="category", cascade="all, delete-orphan")

class Complaint(Base):
    __tablename__ = "complaints"
    complaint_id = Column(String(20), primary_key=True)
    complaint_type = Column(Enum('Train', 'Station', name='complaint_types'), nullable=False)
    phone_number = Column(String(15), nullable=False)
    pnr_number = Column(String(10), index=True, nullable=True)
    train_id = Column(Integer, ForeignKey("trains.id"), nullable=True)
    train_number = Column(String(10), nullable=True)
    coach_number = Column(String(100), nullable=True)
    station_id = Column(Integer, ForeignKey("stations.id"), nullable=True)
    platform_number = Column(String(10), nullable=True)
    category_id = Column(Integer, ForeignKey("complaint_categories.id"), nullable=False)
    incident_date = Column(Date, nullable=False)
    incident_time = Column(Time, nullable=True)
    complaint_description = Column(Text, nullable=False)
    status = Column(Enum('Open', 'In Progress', 'Resolved', 'Closed', name='complaint_statuses'), nullable=False, default='Open')
    assigned_department_id = Column(Integer, ForeignKey("departments.id"), nullable=True)
    assigned_division_id = Column(Integer, ForeignKey("divisions.id"), nullable=True)
    priority = Column(Enum('Low', 'Medium', 'High', name='complaint_priorities'), nullable=False, default='Medium')
    assigned_staff_id = Column(Integer, ForeignKey("staff.id"), nullable=True)
    complaint_source = Column(Enum('Passenger Portal', 'Staff Portal', 'Admin Portal', 'Mobile App', 'API', name='complaint_sources'), nullable=False, default='Passenger Portal')
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    assigned_at = Column(DateTime, nullable=True)
    resolved_at = Column(DateTime, nullable=True)

    train = relationship("Train", back_populates="complaints")
    station = relationship("Station", back_populates="complaints")
    category = relationship("ComplaintCategory", back_populates="complaints")
    assigned_department = relationship("Department", back_populates="complaints")
    assigned_division = relationship("Division", back_populates="complaints")
    assigned_staff = relationship("Staff", back_populates="assigned_complaints")
    feedback = relationship("Feedback", uselist=False, back_populates="complaint", cascade="all, delete-orphan")
    status_history = relationship("ComplaintStatusHistory", back_populates="complaint", cascade="all, delete-orphan")

class Feedback(Base):
    __tablename__ = "feedbacks"
    id = Column(Integer, primary_key=True, autoincrement=True)
    complaint_id = Column(String(20), ForeignKey("complaints.complaint_id", ondelete="CASCADE"), unique=True, nullable=False)
    rating = Column(String(50), nullable=False)
    feedback_text = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    complaint = relationship("Complaint", back_populates="feedback")

class ComplaintStatusHistory(Base):
    __tablename__ = "complaint_status_history"
    id = Column(Integer, primary_key=True, autoincrement=True)
    complaint_id = Column(String(20), ForeignKey("complaints.complaint_id", ondelete="CASCADE"), nullable=False)
    from_status = Column(String(50), nullable=False)
    to_status = Column(String(50), nullable=False)
    updated_by_user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    remarks = Column(Text, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow)

    complaint = relationship("Complaint", back_populates="status_history")
    updated_by_user = relationship("User", back_populates="status_updates")

class OtpVerification(Base):
    __tablename__ = "otp_verifications"
    id = Column(Integer, primary_key=True, autoincrement=True)
    phone_number = Column(String(15), nullable=False)
    otp_code = Column(String(6), nullable=False)
    purpose = Column(String(50), nullable=False)
    expires_at = Column(DateTime, nullable=False)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    notification_type = Column(String(50), nullable=False)
    title = Column(String(150), nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="notifications")
