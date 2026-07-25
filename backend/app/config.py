import os

class Settings:
    SECRET_KEY: str = os.environ.get("SECRET_KEY", "railsathi-secret-key-456")
    DATABASE_URL: str = os.environ.get("DATABASE_URL", "mysql+pymysql://root@localhost/railsathi")
    ADMIN_USERNAME: str = os.environ.get("ADMIN_USERNAME", "admin")
    ADMIN_PASSWORD: str = os.environ.get("ADMIN_PASSWORD", "admin123")

settings = Settings()
