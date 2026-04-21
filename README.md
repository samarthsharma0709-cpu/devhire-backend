# DevHire Backend

A scalable backend system for a hiring platform built using Node.js, Express, and MongoDB.

## Features
- JWT Authentication (Login/Register)
- Protected API routes
- Job creation and listing
- Job application system
- Prevent duplicate applications

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT
- Mongoose

## API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/jobs
- POST /api/jobs (Protected)
- POST /api/applications (Protected)
- GET /api/applications/me (Protected)

## Setup

git clone <repo>
cd backend
npm install

Create .env:
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret

Run:
node server.js
