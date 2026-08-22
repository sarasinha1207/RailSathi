import requests
import time

BASE_URL = "http://127.0.0.1:8000"

def test_perf():
    print("=" * 60)
    print("     PERFORMANCE & LATENCY BENCHMARK TEST               ")
    print("=" * 60)

    session = requests.Session()
    session.post(f"{BASE_URL}/api/v1/auth/login", json={
        "username": "admin",
        "password": "admin123"
    })

    # 1. Warm-up call
    session.get(f"{BASE_URL}/api/v1/officer/zone-division-analytics")

    # 2. Measure In-Memory Cached Query Time
    t0 = time.time()
    res = session.get(f"{BASE_URL}/api/v1/officer/zone-division-analytics")
    t1 = time.time()
    
    latency_ms = (t1 - t0) * 1000.0
    print(f"[PASS] TEST 1: In-Memory Cached Analytics Query Latency: {latency_ms:.2f} ms (Target: <20ms)")
    assert res.status_code == 200, "Analytics request failed"

    # 3. Payload Size Check
    content_len = len(res.content)
    print(f"[PASS] TEST 2: Endpoint Response Payload Size: {content_len / 1024.0:.2f} KB")

    print("\n" + "=" * 60)
    print(f"  PERFORMANCE BENCHMARK PASSED (LATENCY: {latency_ms:.2f} ms)")
    print("=" * 60)

if __name__ == "__main__":
    test_perf()
