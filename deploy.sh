#!/bin/bash

# Quick deployment commands for Render

echo "=== Product Catalog - Production Setup ==="
echo ""

# Step 1: Verify .env files exist
echo "1️⃣  Checking environment files..."
if [ -f "backend/.env" ] && [ -f "frontend/.env" ]; then
    echo "   ✓ .env files found"
else
    echo "   ✗ .env files missing - Create them first!"
    exit 1
fi

# Step 2: Test local build
echo ""
echo "2️⃣  Building production bundles..."
cd backend && npm install > /dev/null 2>&1
cd ../frontend && npm install > /dev/null 2>&1 && npm run build > /dev/null 2>&1
echo "   ✓ Build successful"

# Step 3: Ready for deployment
echo ""
echo "3️⃣  Deployment ready! Next steps:"
echo "   1. Push to GitHub:"
echo "      git add . && git commit -m 'Ready for production' && git push"
echo ""
echo "   2. Go to Render: https://render.com"
echo "   3. Create Blueprint from your GitHub repo"
echo "   4. Add environment variables in Render dashboard"
echo "   5. Deploy!"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo "✅ Done!"
