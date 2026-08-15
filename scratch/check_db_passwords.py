import sys
import os

backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend"))
sys.path.insert(0, backend_path)

from app.database import SessionLocal
from app.models import User
from sqlalchemy import func

db = SessionLocal()
roles = db.query(User.role, func.count(User.user_id)).group_by(User.role).all()
print("Roles in DB:", roles)
sample_users = db.query(User).limit(10).all()
for u in sample_users:
    print(f"User: {u.username} | Role: {u.role} | Password: {u.password_hash}")
db.close()
