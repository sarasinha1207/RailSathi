import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from starlette.middleware.sessions import SessionMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException

from .config import settings
from .routes import router
from .seeding import seed_database

app = FastAPI(
    title="RailSathi",
    description="Railway Grievance Redressal and Monitoring Portal",
    version="1.0.0"
)

# Enable encrypted cookie-based session support (matches Flask session)
app.add_middleware(SessionMiddleware, secret_key=settings.SECRET_KEY)

# Run seeding and schema migrations on application startup
@app.on_event("startup")
def startup_db():
    seed_database()

# Include API routes first so they take precedence
app.include_router(router)

# Locate frontend static build directory
base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
dist_dir = os.path.join(base_dir, "frontend", "dist")

if os.path.exists(dist_dir):
    # Mount the compiled static files at root
    # This automatically serves files like /railway_logo.jpg, /assets/index.js, etc.
    app.mount("/", StaticFiles(directory=dist_dir, html=True), name="frontend")
    
    # Custom 404 handler to support React SPA client-side routing (BrowserRouter / HashRouter) on reload
    @app.exception_handler(StarletteHTTPException)
    async def spa_fallback_404(request, exc):
        if exc.status_code == 404:
            path = request.url.path
            # Do not intercept API requests
            if path.startswith("/api/") or path.startswith("/track-api/") or path.startswith("/submit-"):
                return JSONResponse(status_code=404, content={"detail": "API Route Not Found"})
                
            # Serve the SPA index.html for all other routes
            index_path = os.path.join(dist_dir, "index.html")
            if os.path.exists(index_path):
                return FileResponse(index_path)
        return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})
else:
    @app.get("/")
    async def root_fallback():
        return {
            "message": "FastAPI backend is running! React frontend build is not generated yet.",
            "instructions": "Run 'npm run build' inside the frontend directory to compile and serve the React UI."
        }
