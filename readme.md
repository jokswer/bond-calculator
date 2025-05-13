# Bond Calculator API

A RESTful API for bond calculations and management built with **Express.js**, **Zod** for validation, and **Mongoose** for MongoDB interactions.

## Features

### User Management 🔐
- 🆕 User registration
- 🔑 Login with JWT authentication
- ♻️ Token refresh
- 🚪 Session logout

### Bond Operations 📊
- 📜 Get all bonds for a user
- 🔍 Get specific bond by ID
- ➕ Create new bond entries
- ✏️ Edit existing bonds
- 🗑️ Delete bonds

### Technical Highlights ⚙️
- ✅ Robust validation with Zod schemas
- 🛡️ Protected routes with JWT middleware
- 🗄️ MongoDB data storage with Mongoose
- 🧹 Clean architecture with separated concerns

## Technologies Used

- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **Zod** - Schema validation
- **JSON Web Tokens** - Authentication
- **TypeScript** - Static typing

## Getting Started

### Prerequisites

- Node.js (v22+ recommended)
- npm