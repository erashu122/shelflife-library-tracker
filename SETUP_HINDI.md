# ShelfLife Setup Guide - Hindi

Ye project 3 parts me run hoga:

1. Backend - IntelliJ IDEA
2. Database - MongoDB
3. Frontend - VS Code ya Kiro

## 1. Backend IntelliJ Me Kaise Open Kare

1. IntelliJ IDEA open karo.
2. **Open** button dabao.
3. Ye folder select karo:

```text
C:\Users\91995\Documents\task1\backend
```

4. IntelliJ agar puche to **Open as Maven Project** choose karo.
5. Main file:

```text
backend/src/main/java/com/shelflife/ShelfLifeApplication.java
```

6. Run karne se pehle environment variables set karo:

```env
MONGODB_URI=mongodb://localhost:27017/shelflife
JWT_SECRET=replace-with-a-64-character-production-secret-key-at-minimum
JWT_EXPIRATION_MS=86400000
GOOGLE_BOOKS_API_KEY=
FRONTEND_URL=http://localhost:5173
```

7. `ShelfLifeApplication` run karo.

Backend URL:

```text
http://localhost:8080
```

Swagger:

```text
http://localhost:8080/swagger-ui.html
```

## 2. MongoDB Database

MongoDB Compass ya MongoDB Atlas use kar sakte ho.

Local URL:

```text
mongodb://localhost:27017/shelflife
```

Database name:

```text
shelflife
```

Collections automatic banenge:

- `users`
- `books`
- `user_books`

Docker se local MongoDB start karna ho:

```bash
docker compose up -d
```

## 3. Frontend VS Code Ya Kiro Me Kaise Open Kare

VS Code/Kiro me ye folder open karo:

```text
C:\Users\91995\Documents\task1\frontend
```

Terminal me:

```bash
pnpm install
pnpm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Important Files

Backend:

- `backend/pom.xml` - Maven dependencies
- `backend/src/main/resources/application.yml` - MongoDB, JWT, CORS config
- `backend/src/main/java/com/shelflife/ShelfLifeApplication.java` - main run file
- `backend/src/main/java/com/shelflife/controller` - API endpoints
- `backend/src/main/java/com/shelflife/service` - business logic
- `backend/src/main/java/com/shelflife/entity` - MongoDB documents

Frontend:

- `frontend/package.json` - frontend dependencies/scripts
- `frontend/src/App.jsx` - routes
- `frontend/src/pages` - pages
- `frontend/src/services` - backend API calls
- `frontend/src/context` - auth/theme state
