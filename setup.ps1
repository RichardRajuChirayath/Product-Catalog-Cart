# Product Catalog & Cart - Windows Setup Script

Write-Host "--- Starting Setup for Product Catalog & Cart App ---" -ForegroundColor Cyan

# 1. Install Dependencies
Write-Host "Step 1: Installing dependencies..." -ForegroundColor Yellow
npm install

# 2. Check for Angular CLI
if (!(Get-Command ng -ErrorAction SilentlyContinue)) {
    Write-Host "Angular CLI not found. Installing globally..." -ForegroundColor Yellow
    npm install -g @angular/cli
}

# 3. Final build check
Write-Host "Step 2: verifying build..." -ForegroundColor Yellow
npm run build

Write-Host "`n--- Setup Complete! ---" -ForegroundColor Green
Write-Host "To run the app, use: npm start" -ForegroundColor Cyan
Write-Host "Admin Password: adminsystem@123" -ForegroundColor Magenta
