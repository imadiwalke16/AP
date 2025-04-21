# 🚗 Service Book App

A **React Native** mobile application powered by a robust **.NET Core Web API backend** built on **Clean Architecture** principles. The **Service Book App** streamlines vehicle maintenance by enabling users to book service appointments, track service history, and receive real-time updates—all in one intuitive platform.


![alt text](<Screenshot 2025-04-21 at 7.40.15 PM-1.png>)
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

### 🚀 Upcoming Enhancements
- Push notification integration with Firebase/Notifee
- Service reminders
- Vehicle document storage
- Light/dark mode toggle
- Offline caching

---

## 📂 Project Structure

