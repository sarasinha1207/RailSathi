import time
import requests

session = requests.Session()
session.post("http://127.0.0.1:5000/api/v1/auth/login", json={"username": "admin", "password": "admin123"})

t0 = time.time()
res = session.get("http://127.0.0.1:5000/api/v1/officer/complaints").json()
t1 = time.time()

print(f"Complaints API Response Time: {((t1 - t0)*1000):.2f} ms")
print("Table Records Returned:", len(res.get("data", [])))
print("Summary Metrics across ALL database records:", res.get("metrics"))
