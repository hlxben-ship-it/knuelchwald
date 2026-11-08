# Serves Knülchwald on http://localhost:5197 (garden.json needs http, not file://)
Set-Location $PSScriptRoot
Start-Process "http://localhost:5197"
python -m http.server 5197 --bind 127.0.0.1
