# PowerShell script to create Desktop Shortcut for The Complete C Academy
$WshShell = New-Object -ComObject WScript.Shell
$DesktopPath = [System.Environment]::GetFolderPath('Desktop')
$ProjectDir = (Resolve-Path "$PSScriptRoot\..").Path
$ShortcutPath = Join-Path $DesktopPath "The Complete C Academy.lnk"

$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = (Join-Path $ProjectDir "run-desktop-app.bat")
$Shortcut.WorkingDirectory = $ProjectDir
$Shortcut.IconLocation = "$ProjectDir\build\icon.ico, 0"
$Shortcut.Description = "The Complete C Engineering Academy & Interactive Silicon Playground"
$Shortcut.Save()

Write-Host "========================================================" -ForegroundColor Green
Write-Host " Successfully created desktop shortcut icon on your Home screen:" -ForegroundColor Green
Write-Host " $ShortcutPath" -ForegroundColor Yellow
Write-Host " Double-click the shortcut anytime to launch the Academy!" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Green
