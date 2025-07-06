export default function Home() {
  return (
    <div className="space-y-4">
      <h1>Welcome!</h1>
      <p>
        This is a Task Manager application with: <br />- Backend: FastAPI, SQLAlchemy,
        SQLite<br />- Frontend: Next.js, Tailwind, Radix UI<br />- Runs in Docker Compose
      </p>
      <p>
        Project Structure: <br />- backend/ → FastAPI app<br />- frontend/ → Next.js app<br />-
        docker-compose.yml → defines both services
      </p>
      <p>
        To test the app first create a Project using the Projects page and then add a task to it using the Tasks page.
      </p>
    </div>
  );
}
