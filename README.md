# Product Catalog System

## Overview

This project implements a scalable Product Catalog System with:

- Node.js + Express backend
- MongoDB Atlas database
- Mongoose ODM
- Cursor-based pagination
- React + Vite frontend for browsing products

## Architecture

- `backend/` contains API server code, service layer, models, and seeding.
- `frontend/` contains a small React app with category filter and next-page pagination.

## Why MongoDB Atlas

MongoDB Atlas provides a managed, scalable hosted database. It simplifies cluster provisioning, security, backups, and lets the backend focus on query correctness rather than database operations.

## Why cursor pagination

Cursor pagination is used to avoid duplicate or missing products when new items are inserted or existing items are updated while users browse. This approach relies on a stable sort order and a cursor containing `updatedAt` and `_id`.

## Why avoid offset pagination

Offset pagination using `skip()` or `offset()` can produce duplicates or gaps when the dataset changes during browsing. It also becomes slower on large collections because MongoDB must skip over records.

## Why compound indexing was added

A compound index on `{ updatedAt: -1, _id: -1 }` supports sorting and cursor comparisons efficiently. It makes queries with sorting by updatedAt then _id fast, especially over large datasets.

## How 200,000 products were generated

The `backend/seed/seedProducts.js` script generates 200,000 realistic product documents in batches. It sets random categories, prices, and timestamps, then inserts data with `insertMany()` to avoid one-document inserts.

## Improvements with more time

- Add backend tests for pagination and API input validation
- Implement product detail pages and server-side filtering by price range
- Add frontend loading state, error handling, and search
- Add Docker support for local full-stack development

## Backend Setup

1. Create `backend/.env` with:

```env
MONGODB_URI=your-mongodb-atlas-connection-string
```

2. Install dependencies:

```bash
cd backend
npm install
```

3. Seed products:

```bash
npm run seed
```

4. Start the backend:

```bash
npm run dev
```

## Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Optionally configure API base URL in `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

3. Start the frontend:

```bash
npm run dev
```

## API Endpoints

- `GET /api/products` - fetch latest products
- `GET /api/products?category=Electronics` - filter by category
- `GET /api/products?cursor=...` - cursor pagination

Response format:

```json
{
  "products": [ ... ],
  "nextCursor": "..."
}
```
