import subprocess
import sys
import os
import time

def run_all_project_tests():
    print("=" * 70)
    print("       MASTER SYSTEM VERIFICATION & TEST SUITE RUNNER         ")
    print("=" * 70)
    
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

if __name__ == "__main__":
    run_all_project_tests()
