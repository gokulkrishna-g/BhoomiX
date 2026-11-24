@echo off
title BhoomiX Ecosystem Launcher
cd /d "%~dp0"
echo ========================================================
echo   Launching BhoomiX AI Smart Agriculture Ecosystem
echo ========================================================
echo Starting Backend in separate window...
start "BhoomiX Backend API" cmd /k "start_backend.bat"

echo Starting Frontend in separate window...
start "BhoomiX Frontend Web App" cmd /k "start_frontend.bat"

echo ========================================================
echo   Both services initiated!
echo   Backend:  http://localhost:8000
echo   Frontend: http://localhost:5173
echo ========================================================
 