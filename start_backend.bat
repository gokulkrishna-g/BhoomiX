@echo off
title BhoomiX Backend API (FastAPI)
cd /d "%~dp0backend"
echo ========================================================
echo   Starting BhoomiX Backend API on http://localhost:8000
echo ========================================================
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
pause
