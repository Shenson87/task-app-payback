Task Manager App

This is a Task Manager application with:
- Backend: FastAPI, SQLAlchemy, SQLite
- Frontend: Next.js, Tailwind, Radix UI
- Runs in Docker Compose

Project Structure:
- backend/   → FastAPI app
- frontend/  → Next.js app
- docker-compose.yml → defines both services

How to run:
1. Make sure you have Docker and Docker Compose installed.
2. Run: 
   docker compose up -d --build
3. Backend will be available at: http://localhost:8000
   API docs at: http://localhost:8000/docs
4. Frontend will be available at: http://localhost:3000

Stopping the app:
Run:
   docker compose down

Notes:
- The SQLite database is created inside the backend container.
- Every time you rebuild the backend container from scratch, the database will be empty.
- If you want to persist data between container rebuilds, you can configure a volume in `docker-compose.yml`.

Development without Docker:
Backend:
  cd backend
  python3 -m venv venv
  source venv/bin/activate
  pip3 install -r requirements.txt
  uvicorn app.main:app --reload

Frontend:
  cd frontend
  npm install
  npm run dev

