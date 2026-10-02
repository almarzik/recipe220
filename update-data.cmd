@echo off
cd /d "%~dp0"
if not exist node_modules\yaml call npm.cmd ci --no-audit --no-fund
if errorlevel 1 goto failed
node scripts/build/build-data.cjs
if errorlevel 1 goto failed
echo Data updated. Reload index.html in your browser.
pause
exit /b 0
:failed
echo Update failed. See the error above.
pause
exit /b 1
