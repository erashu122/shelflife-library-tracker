# ShelfLife - Personal Library and Reading Tracker

ShelfLife is a production-ready full stack application for searching books with Google Books, saving titles to a private library, and tracking reading status, progress, ratings, and reviews.

## Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS, React Router, Axios, React Hook Form, React Hot Toast, Lucide React Icons  
**Backend:** Java 21, Spring Boot 3.3, Spring Security, Spring Data MongoDB, JWT, MongoDB, Maven, Lombok, Validation, Swagger

## Features

- User registration and login with JWT authentication
- BCrypt password hashing
- Protected frontend routes
- Google Books API search with pagination
- Personal library CRUD
- Reading statuses: Want to Read, Reading, Read
- Progress slider from 0 to 100 percent
- 1 to 5 star ratings and text reviews
- Owner-only access to library records
- Dashboard totals, average rating, progress bars, and recently added books
- Profile update, password change, and account deletion
- Responsive glassmorphism UI with dark/light theme
- Loading skeletons, toast notifications, filtering, sorting, and 404 page
- Swagger API documentation

## Folder Structure

```text
ShelfLife/
  backend/
    src/main/java/com/shelflife/
      config/
      controller/
      dto/
      entity/
      exception/
      mapper/
      repository/
      security/
      service/
    src/main/resources/application.yml
    pom.xml
  frontend/
    src/
      components/
      context/
      hooks/
      layouts/
      pages/
      services/
      utils/
    package.json
  docker-compose.yml
  README.md
```

## Which Folder To Open

Use this workflow when presenting or running the project:

| Work | Tool | Open This |
| --- | --- | --- |
| Backend | IntelliJ IDEA | `backend/pom.xml` or the `backend` folder |
| Frontend | VS Code or Kiro | `frontend` folder |
| Database | MongoDB Compass or MongoDB Atlas | database name: `shelflife` |
| Full project docs | Any editor | root `README.md` |

### Backend In IntelliJ

1. Open IntelliJ IDEA.
2. Click **Open**.
3. Select `C:\Users\91995\Documents\task1\backend`.
4. If IntelliJ asks, choose **Open as Maven Project**.
5. Main class: `com.shelflife.ShelfLifeApplication`.
6. Run configuration environment variables:

```env
MONGODB_URI=mongodb://localhost:27017/shelflife
JWT_SECRET=replace-with-a-64-character-production-secret-key-at-minimum
JWT_EXPIRATION_MS=86400000
GOOGLE_BOOKS_API_KEY=
FRONTEND_URL=http://localhost:5173
```

### Frontend In VS Code Or Kiro

1. Open VS Code or Kiro.
2. Open folder `C:\Users\91995\Documents\task1\frontend`.
3. Create `.env` from `.env.example`.
4. Run:

```bash
pnpm install
pnpm run dev
```

### Database In MongoDB

Local MongoDB URL:

```text
mongodb://localhost:27017/shelflife
```

Collections created by the backend:

- `users`
- `books`
- `user_books`

## Environment Variables

Backend: copy `backend/.env.example` into your deployment environment.

```env
MONGODB_URI=mongodb://localhost:27017/shelflife
JWT_SECRET=replace-with-a-64-character-production-secret-key-at-minimum
JWT_EXPIRATION_MS=86400000
GOOGLE_BOOKS_API_KEY=
FRONTEND_URL=http://localhost:5173
```

Frontend: copy `frontend/.env.example` to `frontend/.env`.

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## Local Installation

1. Start MongoDB:

```bash
docker compose up -d
```

2. Run the backend:

```bash
cd backend
mvn spring-boot:run
```

3. Run the frontend:

```bash
cd frontend
npm install
npm run dev
```

4. Open:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8080/api`
- Swagger UI: `http://localhost:8080/swagger-ui.html`

## API Documentation

All protected endpoints require:

```http
Authorization: Bearer <jwt-token>
```

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/books/search?q=&page=` | Search Google Books |
| POST | `/api/library` | Add book to current user's library |
| GET | `/api/library?status=&sort=` | List current user's library |
| GET | `/api/library/{id}` | Get one owned library book |
| PUT | `/api/library/{id}` | Update owned library book |
| DELETE | `/api/library/{id}` | Delete owned library book |
| GET | `/api/dashboard` | Current user's dashboard metrics |
| PUT | `/api/profile` | Update name or password |
| DELETE | `/api/profile` | Delete current user's account |

## Screenshots Placeholder

Add screenshots after running the app:

- `screenshots/login.png`
- `screenshots/dashboard.png`
- `screenshots/search.png`
- `screenshots/library.png`
- `screenshots/profile.png`

## Deployment Guide

### Backend on Render

1. Create a MongoDB Atlas database.
2. Create a Web Service from this repository.
3. Set root directory to `backend`.
4. Build command: `mvn clean package -DskipTests`
5. Start command: `java -jar target/shelflife-api-0.0.1-SNAPSHOT.jar`
6. Add backend environment variables from `backend/.env.example`.
7. Set `FRONTEND_URL` to your Vercel domain.

### Frontend on Vercel

1. Import the repository into Vercel.
2. Set root directory to `frontend`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add `VITE_API_BASE_URL=https://your-render-service.onrender.com/api`.

### Database

Use MongoDB Atlas for deployment or local MongoDB for development. The backend stores users, catalog books, and user-library entries in separate MongoDB collections.

## Security Notes

- Passwords are hashed with BCrypt.
- JWTs are signed server-side and required for all private endpoints.
- Library queries always use the authenticated `User`, preventing cross-user access.
- Profile deletion removes only the current user's personal library rows and account.

## Submission Notes

This repository is organized as a clean monorepo with separated frontend and backend applications, DTO-based backend APIs, global exception handling, and a scalable component/service structure suitable for portfolio and internship review.
