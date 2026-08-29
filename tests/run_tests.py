import subprocess
import sys
import os
import time
import requests

def is_server_running(url="http://127.0.0.1:8000"):
    try:
        r = requests.get(f"{url}/api/v1/meta/zones", timeout=1.0)
        return r.status_code in (200, 401, 404)
    except Exception:
        return False

def run_all_project_tests():
    print("=" * 70)
    print("       MASTER SYSTEM VERIFICATION & TEST SUITE RUNNER         ")
    print("=" * 70)
    
    server_process = None
    if not is_server_running():
        print("[INFO] FastAPI server not running on port 8000. Launching test server...")
        backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend'))
        server_process = subprocess.Popen(
            [sys.executable, "-m", "uvicorn", "app:app", "--port", "8000", "--host", "127.0.0.1", "--log-level", "warning"],
            cwd=backend_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        # Wait up to 10 seconds for server to start
        for _ in range(20):
            time.sleep(0.5)
            if is_server_running():
                print("[INFO] Test server started successfully!\n")
                break
        else:
            print("[WARN] Server start timed out. Proceeding with tests...\n")
    
    test_files = [
        "tests/test_db.py",
        "tests/test_auth.py",
        "tests/test_api.py",
        "tests/test_flow.py",
        "tests/test_transfer.py",
        "tests/test_perf.py"
    ]

    total_suites = len(test_files)
    passed_suites = 0
    start_time = time.time()

    try:
        for idx, test_file in enumerate(test_files, 1):
            print(f"\n[{idx}/{total_suites}] Executing Test Suite: {test_file} ...")
            res = subprocess.run([sys.executable, test_file], capture_output=True, text=True)
            
            if res.returncode == 0:
                passed_suites += 1
                print(res.stdout.strip())
                print(f"--> Result: [PASSED]")
            else:
                print(res.stdout.strip())
                print(res.stderr.strip())
                print(f"--> Result: [FAILED]")

        elapsed = time.time() - start_time
        print("                     MASTER TEST RUNNER SUMMARY                       ")
        print("=" * 70)
        print(f" Total Test Suites Executed : {total_suites}")
        print(f" Test Suites Passed         : {passed_suites}")
        print(f" Test Suites Failed         : {total_suites - passed_suites}")
        print(f" Overall Pass Rate          : {(passed_suites / total_suites) * 100:.1f}%")
        print(f" Total Test Execution Time  : {elapsed:.2f} seconds")
        print("=" * 70)
        if passed_suites == total_suites:
            print(" [PASS] ALL SYSTEM SUITES COMPLETED AND VERIFIED 100% OPERATIONAL")
        print("=" * 70)
    finally:
        if server_process:
            server_process.terminate()
            server_process.wait()

if __name__ == "__main__":
    run_all_project_tests()
