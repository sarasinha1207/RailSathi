import uvicorn

if __name__ == "__main__":
    # Start the FastAPI application via Uvicorn on port 5000
    uvicorn.run("backend.app:app", host="127.0.0.1", port=5000, reload=True)
