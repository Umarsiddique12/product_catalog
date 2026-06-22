# Production Deployment Guide - Render

## ⚠️ IMPORTANT: .env Security

The `.env` file contains sensitive credentials and **MUST NOT** be committed to GitHub. 

✓ **Already set up:** `.gitignore` now prevents `.env` from being tracked
✓ **Reference file:** Use `.env.example` to know which variables you need

## Prerequisites

1. **MongoDB Atlas Account**
   - Create a cluster at https://www.mongodb.com/cloud/atlas
   - Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority`

2. **Render Account**
   - Sign up at https://render.com
   - Connect your GitHub repository

## Step 1: Update Environment Variables

### Backend (.env)
Create or update `backend/.env`:
```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/product-catalog?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
Create `frontend/.env`:
```env
VITE_API_BASE_URL=https://your-backend-name.onrender.com/api
```

Replace `your-backend-name` with the actual Render service name.

## Step 2: Push to GitHub

**BEFORE PUSHING:** Verify `.env` is in `.gitignore`

```bash
git add .
git commit -m "Production ready: add render.yaml and env configuration"
git push origin main
```

## Step 3: Deploy on Render

### Option A: Deploy Both Services (Recommended)

1. **Go to Render Dashboard**
   - Click "New +" → "Blueprint"
   - Select "Public Git repository"
   - Enter your GitHub repo URL
   - Authorize Render to access your repo

2. **Configure Environment Variables**
   - Backend service:
     - `MONGODB_URI`: Your MongoDB connection string
     - `NODE_ENV`: `production`
   - Frontend service:
     - `VITE_API_BASE_URL`: Will be set automatically based on backend URL

3. **Deploy**
   - Render will automatically read `render.yaml`
   - Both services will deploy together

### Option B: Deploy Services Individually

#### Deploy Backend
1. New Web Service → GitHub repository
2. Name: `product-catalog-backend`
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Environment Variables:
   - `MONGODB_URI`: [Your connection string]
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
6. Deploy

#### Deploy Frontend
1. New Static Site → GitHub repository
2. Name: `product-catalog-frontend`
3. Build Command: `cd frontend && npm install && npm run build`
4. Publish Directory: `frontend/dist`
5. Environment Variables:
   - `VITE_API_BASE_URL`: `https://product-catalog-backend.onrender.com/api`
6. Deploy

## Step 4: Verify Deployment

After deployment completes:

1. **Test Backend**
   ```
   https://product-catalog-backend.onrender.com/api/health
   ```
   Should return: `{"message":"Product Catalog API is running","timestamp":"..."}`

2. **Test Frontend**
   ```
   https://product-catalog-frontend.onrender.com
   ```
   Should load the React app

3. **Test API Connection**
   - Open frontend
   - Try creating or viewing products
   - Should connect to backend without errors

## Step 5: Update Frontend API URL

If your backend URL is different, update in `frontend/.env`:
```env
VITE_API_BASE_URL=https://your-actual-backend-url.onrender.com/api
```

Then rebuild frontend in Render dashboard.

## Troubleshooting

### Backend Connection Fails
- Check `MONGODB_URI` is correct and properly URL-encoded
- Ensure MongoDB Atlas allows your Render IP
- Check Render logs: Dashboard → Service → Logs

### Frontend Can't Connect to Backend
- Verify `VITE_API_BASE_URL` in frontend `.env`
- Check CORS is enabled (it is in `app.js`)
- Check network tab in browser DevTools

### Port Issues
- Render automatically assigns ports
- Backend uses `process.env.PORT`
- Don't hardcode ports

### Build Failures
- Check `backend/package.json` has all dependencies
- Check `frontend/package.json` has all dependencies
- View Render build logs for specific errors

## Production Checklist

- ✓ `.gitignore` includes `.env`
- ✓ `.env.example` has template variables
- ✓ `render.yaml` configured
- ✓ MongoDB Atlas cluster created
- ✓ Environment variables set in Render
- ✓ Backend serves frontend in production
- ✓ CORS configured
- ✓ Error handling in place
- ✓ Database connection error handling

## Local Testing Before Deployment

```bash
# Terminal 1: Backend
cd backend
npm install
NODE_ENV=production node server.js

# Terminal 2: Frontend
cd frontend
npm install
npm run build
npm run preview
```

## Need Help?

- **Render Docs:** https://render.com/docs
- **MongoDB Atlas Docs:** https://docs.mongodb.com/atlas/
- **Express Docs:** https://expressjs.com/
- **Vite Docs:** https://vitejs.dev/

---

**Deployed! 🎉**
