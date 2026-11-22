@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"
title The Complete C Engineering Academy - Installer

echo =======================================================================
echo   The Complete C Engineering Academy & Interactive Silicon Playground
echo   Single-Click Desktop Installer
echo   Architected with lots of coffee by Raghavendra Varma
echo =======================================================================
echo.

:: Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
  echo [ERROR] Node.js is required to run the local server.
  echo Please download and install Node.js from https://nodejs.org/
  pause
  exit /b 1
)

echo [1/3] Verifying package dependencies...
if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
)

echo [2/3] Building production package...
set "EXPORT=true"
call npm run build

echo [3/3] Creating Desktop Shortcut on your Home screen...
powershell -NoProfile -ExecutionPolicy Bypass -File "scripts\create-desktop-shortcut.ps1"

echo.
echo =======================================================================
echo   Installation Complete!
echo   Launching The Complete C Engineering Academy...
echo =======================================================================
echo.

start "" "run-desktop-app.bat"
exit /b 0
