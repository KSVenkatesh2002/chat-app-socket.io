# Chat App 💬  

A **realtime chat application** built with **React, Zustand, Socket.IO, Express, and Tailwind + DaisyUI**. Supports **1-to-1 chat, group chat, and broadcast messaging**, with a modern responsive UI.  

---

## ✨ Features  
- 🔹 Realtime messaging with **Socket.IO**  
- 🔹 **Private chats** (1-to-1 messaging)  
- 🔹 **Group messaging** (create/join groups)  
- 🔹 **Broadcast to all users**  
- 🔹 Online user list with **Drawer UI**  
- 🔹 Toast notifications for new messages  
- 🔹 Responsive UI with **TailwindCSS + DaisyUI**  
- 🔹 Clean state management using **Zustand**  

---

## 🛠️ Tech Stack  
**Frontend:** React, Zustand, TailwindCSS, DaisyUI  
**Backend:** Node.js, Express.js, Socket.IO  
**State Management:** Zustand  
**UI Components:** Lucide-react icons  

---

## 🚀 Getting Started  

### Prerequisites  
- Node.js (v18+)  
- npm or yarn  

### Installation  

```bash
# Clone repo
git clone https://github.com/your-username/chat-app.git

# Go into project folder
cd chat-app

# Install dependencies
npm install

## 🚀 Running the App

### Start backend (Express + Socket.IO):
cd server
npm install
npm start

### Start frontend (React):
cd client
npm install
npm run dev
```

## 📂 Project Structure
```bash
chat-app/
│── client/ # React frontend
│ ├── src/
| │ ├── lib/
| │ │ └── socket.ts/ # client side socket connection
│ │ ├── components/ # UI Components
│ │ ├── store/ # Zustand Store
│ │ ├── pages/ 
│ │ └── App.tsx
│── server/ # Express + Socket.IO backend
│ ├── index.js
│ ├── lib/
│ │ └── socket.js/ # server side socket function
```

---

## 📸 Screenshots (Optional)
screenshots 

---

## 🤝 Contributing
Contributions are welcome! Feel free to fork this repo and create a PR.

---

## 📜 License
MIT License © 2025 VENKATESH
