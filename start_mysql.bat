@echo off
title RailSathi - Local MySQL Database
echo ===================================================
echo Starting Local MySQL Database Server...
echo ===================================================
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe" --datadir="E:\PROJECTS\Passenger Complaint form\data\mysql" --port=3306 --console
pause
