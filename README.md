# Mini CRM - Backend API

A robust RESTful API backend for the Mini CRM system built with Node.js, Express, MongoDB (Mongoose), JWT authentication, Joi request validation, and Swagger documentation.

---

## 🚀 Features

- **Authentication & Authorization**:
  - Secure password hashing with `bcryptjs`.
  - JWT token-based authentication.
  - Role-based and user-specific ownership authorization (e.g. task status updates restricted to assignees).
- **Leads Module**:
  - Full CRUD operations with soft-delete (`isDeleted`, `deletedAt`).
  - Search, status filtering, and pagination support.
- **Companies Module**:
  - Company directory with aggregated active associated leads lookup.
- **Tasks Module**:
  - Task assignment, due-date validation, and assignee-only status updates.
- **Dashboard API**:
  - Fast aggregated CRM metrics and counts.
- **API Documentation**:
  - Interactive Swagger UI available at `/api-docs`.
- **Database Seeding**:
  - CLI script to seed sample users, companies, leads, and tasks.

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Authentication**: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Validation**: [Joi](https://joi.dev/)
- **API Docs**: [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express)

---

## 📂 Project Structure

```text
backend/
├── src/
│   ├── app.js               # Express app configuration & middleware
│   ├── config/
│   │   ├── db.js            # MongoDB Mongoose connection
│   │   └── swagger.js       # OpenAPI/Swagger specification
│   ├── controllers/         # Request handlers
│   │   ├── authController.js
│   │   ├── companyController.js
│   │   ├── dashboardController.js
│   │   ├── leadController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── middleware/          # Auth, Joi validation, error handlers
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── models/              # Mongoose schemas (User, Lead, Company, Task)
│   ├── routes/              # Express route routers
│   ├── services/            # CRM business logic & database queries
│   └── validation/          # Joi schemas
├── scripts/
│   └── seed.js              # Demo seed data script
├── server.js                # Server entry point & listener
├── package.json
└── .env.example
```

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js 18+ or 20+
- MongoDB running locally or a MongoDB Atlas connection string

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update values in `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/mini-crm
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
```

### 4. Seed Database (Optional)
Populate the database with sample users, companies, leads, and tasks:
```bash
npm run seed
```

### 5. Start the Server
- **Development (with hot reload):**
  ```bash
  npm run dev
  ```
- **Production:**
  ```bash
  npm start
  ```

---

## 📖 API Endpoints & Swagger Docs

Interactive Swagger UI is available at:  
👉 **`http://localhost:5000/api-docs`**

### Summary of Routes:
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/login` | User login & token generation | No |
| `GET` | `/api/auth/me` | Current authenticated user profile | Yes |
| `GET` | `/api/dashboard` | Aggregated CRM metrics | Yes |
| `GET` | `/api/users` | List users for assignment | Yes |
| `GET` | `/api/leads` | Search, filter & paginate leads | Yes |
| `POST` | `/api/leads` | Create a lead | Yes |
| `GET` | `/api/leads/:id` | Get single lead details | Yes |
| `PATCH` | `/api/leads/:id` | Update lead details | Yes |
| `DELETE` | `/api/leads/:id` | Soft-delete a lead | Yes |
| `GET` | `/api/companies` | List all companies | Yes |
| `POST` | `/api/companies` | Create a new company | Yes |
| `GET` | `/api/companies/:id` | Get company with associated leads | Yes |
| `GET` | `/api/tasks` | List all tasks | Yes |
| `POST` | `/api/tasks` | Create a task | Yes |
| `PATCH` | `/api/tasks/:id/status` | Update task status (assigned user only) | Yes |

---

## 🔐 Default Seed Credentials

- **Admin Account**: `admin@minicrm.local` / `crm12345`
- **Sales Rep Account**: `jordan@minicrm.local` / `crm12345`
