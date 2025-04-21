# Activity Schedule Manager
## 🧠 Overview

This project demonstrates best practices in both frontend and backend development:
- **Frontend:** Built with React using pure CSS (no styling libraries) to showcase clean, manual styling.  
  - **State Management:**  
    - [`@tanstack/react-query`](https://tanstack.com/query) for managing server state  
    - `React Context API` for global client state (kept minimal due to scoped needs)

- **Backend:** Developed using Node.js, Express.js, and MongoDB  
  - **Design Patterns Applied:**
    - **Singleton Pattern** for MongoDB connection
    - **Strategy Pattern** for handling repeated weekly schedule logic
    - **Repository Pattern** for cleaner DB interaction layer
  - **Other Features:**
    - Built-in rate limiter
    - Basic security enhancements
    - Optimized request/response payloads
    - Centralized error handling

### 💡 Key Optimization
Schedules are stored using a `Map` instead of an array to ensure **O(1)** access time for updating and retrieving by day—improving performance vs. array-based storage (`O(n)`).

---
## 🚀 Getting Started
### Clone the repository

```bash
git clone https://github.com/TanKaka123/activity-schedule-manager.git
cd activity-schedule-manager
```
### Install dependencies (both frontend and backend)
```bash
npm install
```
### Run in development mode
Start frontend and backend in separate terminals or use the commands below:
```bash
npm run dev:frontend
npm run dev:backend
```

## 📬 Contact
Have questions or feedback?
Feel free to reach out: hongtan.dev@gmail.com
Let me know if you want to include instructions for environment variables, deployment, or Docker!







