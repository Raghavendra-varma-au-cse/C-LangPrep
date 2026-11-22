@echo off
setlocal
cd /d "%~dp0"
title The Complete C Engineering Academy

echo ===================================================================
echo   Starting The Complete C Engineering Academy...
echo   Port: 3000
echo ===================================================================

if not exist "out" (
  echo Building application package for first run...
  set "EXPORT=true"
  call npm run build
)

node scripts\serve-local.js
pause
