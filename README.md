# NestJS Hexagonal Architecture Project

An enterprise-ready **NestJS** application implementing **Hexagonal Architecture**, **JWT Authentication**, and **Docker** support.

## 🚀 Quick Start Guide (Zero to Hero)

Follow these steps to set up the project from scratch.

### 1. 📥 Clone & Install
```bash
# Clone the repository
git clone https://github.com/AndersonLucero/base-nestjs-project.git
cd base-nestjs-project

# Install dependencies
npm install
```

### 2. 🌍 Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
JWT_SECRET="secretKey" # Change this in production
```

### 3. 🐘 Start Database
We use Docker to spin up a PostgreSQL instance easily.
```bash
# Start ONLY the database container
docker-compose -f docker/docker-compose.db.yml up -d
```
*Wait a few seconds for the database to serve traffic.*

### 4. 🗄️ Setup Database Schema
Initialize the database tables using Prisma.
```bash
npx prisma generate
npx prisma db push
```

### 5. ▶️ Run the Application
You can now run the backend application.
```bash
# Development Mode
npm run start:dev

# Production Build
npm run build
npm run start:prod
```
The server will start at `http://localhost:3000`.

---

## 🐳 Docker Deployment (Full Stack)
If you want to run **both** the app and database in containers:
```bash
docker-compose -f docker/docker-compose.yml up --build
```

---

## 🏗️ Architecture Overview

The project is structured into three distinct layers:

1.  **Domain Layer** (`src/domain`): Pure business logic (Entities, Repository Interfaces).
2.  **Application Layer** (`src/application`): Orchestrates business logic (Use Cases, DTOs).
3.  **Infrastructure Layer** (`src/infrastructure`): Implementation details (Prisma, Controllers, Auth).

### Key Features
-   **Hexagonal Architecture**: Separation of concerns.
-   **JWT Auth**: Secure authentication with Guards and Strategies.
-   **Interceptors**: Global logging and response transformation.
-   **Barrel Files**: Clean imports.

## 🧪 Testing

### Run Automated Tests
```bash
npm test
```

### Manual Verification
**1. Login**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com", "password":"yourpassword"}'
```
