
# **Diary App (Frontend + Backend)**

## **Overview**
The **Diary App** is a web application that allows users to manage personal diary entries securely. The application includes user authentication, CRUD operations for diaries, and a robust token-based authentication mechanism with token refresh functionality.

The project is built with:
- **Frontend**: Angular 18+, Angular Material
- **Backend**: Node.js, Express, and MongoDB

---

## **Features**
- **User Authentication**:
  - Signup and login functionality with password hashing.
  - Token-based authentication (JWT) with refresh token support.
- **Diary Management**:
  - CRUD operations for personal diary entries.
  - Pagination support for fetching diary lists.
- **Authorization**:
  - Users can only access their own diaries.
- **Error Handling**:
  - Graceful error responses for invalid or unauthorized requests.

---

## **Technologies Used**

### **Frontend**
- **Framework**: Angular 18+
- **Language**: TypeScript
- **State Management**: Angular Signals
- **HTTP Client**: Angular's `HttpClientModule`

### **Backend**
- **Runtime**: Node.js (v23.3.0)
- **Framework**: Express
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (Access & Refresh Tokens)

---

## **Installation and Setup**

### **Prerequisites**
- Node.js (v23.x or above)
- Angular CLI (v18.x or above)
- MongoDB (Running locally or on a server)
- Git

---

### **Backend Setup**

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd DiaryAuthApp
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/diary-app
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRATION=90m #token expiration delay
   JWT_REFRESH_EXPIRATION=7d #refresh token expiration delay
   ```

4. **Start the Server**:
   ```bash
   npm run dev
   ```

   The backend will run at `http://localhost:3000`.

---

### **Frontend Setup**

1. **Navigate to the Frontend Directory**:
   ```bash
   cd DiaryAuthApp
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   ng serve
   ```

   The frontend will run at `http://localhost:4200`.

---

## **API Endpoints**

### **Authentication**
| Method | Endpoint              | Description               |
|--------|-----------------------|---------------------------|
| POST   | `/api/auth/signup`        | User signup               |
| POST   | `/api/auth/sign-in`         | User login                |
| POST   | `/api/auth/refresh-token` | Refresh access token      |

### **Diaries**
| Method | Endpoint         | Description                   |
|--------|------------------|-------------------------------|
| GET    | `/api/diary`       | Get user's diaries (paginated)|
| POST   | `/api/diary`       | Create a new diary entry      |
| PUT    | `/api/diary/:id`   | Update an existing diary entry|
| DELETE | `/api/diary/:id`   | Delete a diary entry          |

---


## **How to Use**

1. **Sign Up**:
   - Navigate to the signup page at `/signup` and create a new account.

2. **Log In**:
   - Use your credentials to log in and access your personal dashboard.

3. **Manage Diaries**:
   - Add, edit, or delete diary entries. All actions are secured to ensure only authorized access.

---

## **Development Notes**

- **Token Refresh**:
  - The frontend uses an HTTP interceptor to automatically refresh tokens on `401 Unauthorized` errors.

- **Pagination**:
  - Diary lists are fetched in a paginated format. The current page and limit can be adjusted via query parameters.

- **Error Handling**:
  - Proper error messages are displayed for validation errors and unauthorized actions.

---

## **Future Enhancements**
- Add profile management features.
- Implement advanced search and filtering for diaries.
- Add export/import functionality for diaries.

---
