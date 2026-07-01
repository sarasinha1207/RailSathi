import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "railway-secret-key-123")
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    CSV_FILE_PATH = os.path.join(BASE_DIR, "data", "complaints.csv")
