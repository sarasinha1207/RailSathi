from sqlalchemy import Column, Integer, String, Date, Time, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Train(Base):
    __tablename__ = "trains"
    train_number = Column(String(100), primary_key=True)
    train_name = Column(String(200), nullable=False)
    
    tickets = relationship("PnrTicket", back_populates="train")
    complaints = relationship("Complaint", back_populates="train")

class Passenger(Base):
    __tablename__ = "passengers"
    phone_number = Column(String(15), primary_key=True)
    
    complaints = relationship("Complaint", back_populates="passenger")

class PnrTicket(Base):
    __tablename__ = "pnr_tickets"
    pnr_number = Column(String(10), primary_key=True)
    train_number = Column(String(100), ForeignKey("trains.train_number"), nullable=False)
    coach_number = Column(String(100), nullable=True)
    berth_number = Column(String(100), nullable=True)
    boarding_station = Column(String(100), nullable=True)
    destination_station = Column(String(100), nullable=True)
    journey_date = Column(Date, nullable=True)
    journey_class = Column(String(10), nullable=True)
    
    train = relationship("Train", back_populates="tickets")
    complaints = relationship("Complaint", back_populates="pnr_ticket")

class Department(Base):
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), unique=True, nullable=False)
    
    complaints = relationship("Complaint", back_populates="department")
    staff = relationship("Staff", back_populates="department")

class ComplaintStatus(Base):
    __tablename__ = "complaint_statuses"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), unique=True, nullable=False)
    
    complaints = relationship("Complaint", back_populates="status")

class Complaint(Base):
    __tablename__ = "complaints"
    complaint_id = Column(String(20), primary_key=True)
    complaint_type = Column(String(10), nullable=False) # 'Train' or 'Station'
    phone_number = Column(String(15), ForeignKey("passengers.phone_number"), nullable=False)
    pnr_number = Column(String(10), ForeignKey("pnr_tickets.pnr_number"), nullable=True)
    train_number = Column(String(100), ForeignKey("trains.train_number"), nullable=True)
    coach_number = Column(String(100), nullable=True)
    current_station = Column(String(100), nullable=True)
    next_station = Column(String(100), nullable=True)
    station_name = Column(String(100), nullable=True)
    platform_number = Column(String(100), nullable=True)
    station_area = Column(String(100), nullable=True)
    main_class = Column(String(100), nullable=False)
    sub_class = Column(String(100), nullable=False)
    incident_date = Column(Date, nullable=False)
    incident_time = Column(Time, nullable=True)
    complaint_description = Column(Text, nullable=False)
    status_id = Column(Integer, ForeignKey("complaint_statuses.id"), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=True)
    priority = Column(String(20), nullable=False) # 'High', 'Medium', 'Low'
    created_at = Column(DateTime, nullable=False)
    zone_code = Column(String(10), nullable=True)
    zone_name = Column(String(100), nullable=True)
    division_name = Column(String(100), nullable=True)
    remarks = Column(Text, nullable=True)
    
    passenger = relationship("Passenger", back_populates="complaints")
    pnr_ticket = relationship("PnrTicket", back_populates="complaints")
    train = relationship("Train", back_populates="complaints")
    status = relationship("ComplaintStatus", back_populates="complaints")
    department = relationship("Department", back_populates="complaints")
    feedback = relationship("Feedback", uselist=False, back_populates="complaint")

class Feedback(Base):
    __tablename__ = "feedbacks"
    id = Column(Integer, primary_key=True, autoincrement=True)
    complaint_id = Column(String(20), ForeignKey("complaints.complaint_id"), unique=True, nullable=False)
    rating = Column(String(50), nullable=True) # 'Excellent', 'Satisfactory', 'Unsatisfactory'
    feedback_text = Column(Text, nullable=True)
    created_at = Column(DateTime, nullable=False)
    
    complaint = relationship("Complaint", back_populates="feedback")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False) # 'Admin', 'Inspector', 'StationMaster'
    division = Column(String(100), nullable=True)
    
    staff = relationship("Staff", uselist=False, back_populates="user")

class Staff(Base):
    __tablename__ = "staff"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    name = Column(String(100), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=True)
    
    user = relationship("User", back_populates="staff")
    department = relationship("Department", back_populates="staff")
