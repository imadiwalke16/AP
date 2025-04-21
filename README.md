# 🚗 Service Book App -

A **React Native** mobile application powered by a robust **.NET Core Web API backend** built on **Clean Architecture** principles. The **Service Book App** streamlines vehicle maintenance by enabling users to book service appointments, track service history, and receive real-time updates—all in one intuitive platform.

<p align="center">
  <img src="https://github.com/user-attachments/assets/94b2e6cc-20fb-4d66-b46b-40900692044c" width="250"/>
  <img src="https://github.com/user-attachments/assets/65915b6e-4dc8-4945-b064-98f619b90d89" width="250"/>
  <img src="https://github.com/user-attachments/assets/4ac352f7-3e07-4c9f-8c7f-1d741fb924ca" width="250"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/7a5beb32-80a3-4094-9769-b13de71f24c3" width="250"/>
  <img src="https://github.com/user-attachments/assets/6e57a9d5-6d6b-4e0a-9c08-7a0233a6c57b" width="250"/>
  <img src="https://github.com/user-attachments/assets/84d88a21-03f4-432c-a3d9-03c9e064fb85" width="250"/>
</p>

---

## 🛠️ Tech Stack

### Frontend
- **React Native CLI**
- **Redux Toolkit** for state management
- **SignalR Client** for real-time notifications
- **Notifee (optional)** for advanced in-app and push notification handling
- **Axios** for API integration

### Backend
- **ASP.NET Core Web API**
- **PostgreSQL** (via EF Core - Code First approach)
- **SignalR** for WebSocket-based live notifications
- **Background Services** for scheduled promotional notifications
- **JWT Authentication**
- **Clean Architecture** with layered separation (Domain, Application, Infrastructure, API)

---

## 📱 Key Features

### 🔧 Service Management
- Book, view, and manage service appointments
- View historical service records with filtering & sorting
- Admin support for scheduling, cancellations, and updates

### 🔔 Real-time Notifications
- In-app and push notifications using SignalR
- Read/unread status, clearing, and dynamic updates
- Supports both **transactional** (e.g., service updates) and **promotional** messages

### 👤 User Authentication
- Secure **JWT-based login**
- Token refresh support (in pipeline)
- Role-based access (Planned)

### 📊 Service History
- Detailed service logs per vehicle
- Service center info, status, remarks
- Sortable, filterable UI for better UX

### 🚀 Enhancements
- Push notification integration with Firebase/Notifee
- Service reminders
- Vehicle document storage
- Light/dark mode toggle
- Offline caching

---

## 🧪 Development Practices

- ✅ **Test-Driven Development (TDD)** approach
- ✅ API-first integration planning
- ✅ **Clean Architecture** to maximize maintainability & testability
- ✅ **Modular UI** design system (under development)
- ✅ Git branching & PR-based reviews to ensure quality merges

---

## 🧩 API Overview

> Example Endpoints:

- `POST /api/auth/login` – Authenticate user
- `GET /api/vehicle/user/{userId}` – Fetch vehicles
- `POST /api/appointment` – Book a service
- `GET /api/notifications/{userId}` – Fetch notifications
- `PUT /api/notifications/mark-as-read/{id}` – Mark notification read

Full API docs available in Swagger.-

---

## 🚦 Deployment Status

| Environment | Status     | URL           |
|-------------|------------|----------------|
| Local Dev   | ✅ Active  | `localhost`    |
| Staging     | 🟡 Planned | `TBD`          |
| Production  | ❌ Pending | `TBD`          |

---

## 💼 About the Team

This project is developed by **Aditya**, a passionate software engineer focused on mobile-first products, clean code, and scalable backend architecture. The project reflects hands-on expertise with end-to-end app development including devops, testing, and user-centric design.


---

## 📃 License

This project is private and intended for demonstration and interview purposes only. Commercial usage is restricted unless explicitly permitted.

---

## 📬 Contact

Feel free to reach out for collaboration or inquiries:

- **Email**: walkeaditya3@gmail.com 
- **LinkedIn**: www.linkedin.com/in/aditya-walke-666aw

---



