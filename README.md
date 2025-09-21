# Business Card Management API

A robust Node.js RESTful API for managing business cards and users, built with modern technologies and best practices.

---

## 📁 Project Structure

```
.
├── auth/                # Authentication logic (JWT, middleware)
│   ├── Providers/       # Token providers (JWT)
│   └── authService.js   # Auth middleware
├── cards/               # Business card domain
│   ├── helpers/         # Card normalization, biz number generation, validators
│   ├── models/          # Card Mongoose models and data access
│   ├── routes/          # Card API routes/controllers
│   ├── services/        # Card business logic
│   └── validations/     # Joi validation for cards
├── config/              # Environment configs (development, production)
├── DB/                  # Database connection services
│   ├── mongoDB/         # MongoDB connection scripts
│   └── dbService.js     # DB connection selector
├── initialData/         # Initial seed data and loader
├── logger/              # Logging middleware (Morgan, Chalk)
├── lodash/              # Lodash utility examples
├── middlewares/         # Express middlewares (CORS)
├── router/              # Main API router
├── users/               # User domain
│   ├── helpers/         # User normalization, bcrypt, validators
│   ├── models/          # User Mongoose models and data access
│   ├── routes/          # User API routes/controllers
│   ├── services/        # User business logic
│   └── validations/     # Joi validation for users
├── utils/               # Utility functions (error handling, date/time)
├── package.json         # Project dependencies and scripts
├── server.js            # Express app entry point
└── .gitignore           # Git ignore rules
```

---

## 🚀 Technologies Used

- **Node.js** & **Express.js**: Fast, scalable server and routing.
- **MongoDB** & **Mongoose**: NoSQL database and ODM for schema modeling.
- **Joi**: Powerful schema validation for user and card data.
- **JWT (jsonwebtoken)**: Secure authentication and authorization.
- **bcryptjs**: Password hashing for user security.
- **Morgan** & **Chalk**: HTTP request logging and colored console output.
- **Lodash**: Utility functions for data manipulation.
- **Config**: Environment-based configuration management.
- **CORS**: Cross-origin resource sharing middleware.

---

## 🛠️ How It Works

- **Authentication**: JWT-based, with middleware to protect routes.
- **User Management**: Register, login, update, and delete users. Admin and business roles supported.
- **Business Cards**: Create, update, like, and delete cards. Only business users can create cards.
- **Validation**: All incoming data is validated using Joi schemas.
- **Logging**: Requests and errors are logged with timestamps and color coding.
- **Database**: Connects to MongoDB Atlas in production, local MongoDB in development.
- **Initial Data**: Easily seed initial users and cards for testing.

---

## 📦 Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment:**
   - Edit `config/development.json` and `config/production.json` for DB credentials and settings.

3. **Run locally:**
   ```sh
   npm run dev
   ```

4. **Production start:**
   ```sh
   npm start
   ```

---

## 📚 API Endpoints

### Users

- `POST /users` — Register new user
- `POST /users/login` — Login and get JWT
- `GET /users` — Get all users (admin only)
- `GET /users/:id` — Get user by ID (self or admin)
- `PUT /users/:id` — Update user (self only)
- `PATCH /users/:id` — Change business status (self only)
- `DELETE /users/:id` — Delete user (self or admin)

### Cards

- `GET /cards` — Get all cards
- `GET /cards/my-cards` — Get cards created by logged-in user
- `GET /cards/:id` — Get card by ID
- `POST /cards` — Create new card (business users only)
- `PUT /cards/:id` — Update card (owner only)
- `PATCH /cards/:id` — Like/unlike card
- `DELETE /cards/:id` — Delete card (owner or admin)

---

## 📝 Validation

- **Joi** schemas ensure all user and card data is valid before database operations.
- Error handling is centralized for consistent API responses.

---

## 👨‍💻 For Developers

- Modular codebase for easy extension.
- Clear separation of concerns: routes, services, models, helpers, validations.
- Ready for deployment on cloud or local environments.

---

## 📖 License

MIT

---

## 💡 Need Help?

Open an issue or contact the maintainer for support(Firas Qaissi - Qaissi0003@gmail.com).
