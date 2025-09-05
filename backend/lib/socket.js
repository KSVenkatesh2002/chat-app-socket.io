import { Server } from "socket.io";
import http from "http";
import express from "express";
import { group } from "console";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://venkatesh-realtime-chat-app.onrender.com"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});


const userSocketMap = {};
const userGroupNames = ['all']

export function getReceiverSocketId(userName) {
  return userSocketMap[userName];
}

function convertAndSendGroupNames() {
  return userGroupNames.map((groupName) => ({
    groupName,
    notJoined: groupName === 'all' ? false : true
  }))
}

io.on("connection", (socket) => {


  const userName = socket.handshake.query.userName;

  if (!userName) {
    socket.disconnect(true);
    return;
  }

  // Username already exists — notify and disconnect
  if (userSocketMap[userName]) {
    socket.emit("usernameTaken", userName);
    socket.disconnect(true);
    return;
  }

  userSocketMap[userName] = socket.id;
  console.log("✅ connected", userName);

  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  io.to(socket.id).emit("getOnlineGroups", convertAndSendGroupNames())

  socket.on("message to all", ({ to, message }) => {
    const deliveryData = {
      newMessageData: message,
      to,
      from: userName,
      forWho: 'all'
    }
    socket.broadcast.emit("messageReceived", deliveryData);
  });

  socket.on("private message", ({ to, message }) => {
    const deliveryData = {
      newMessageData: message,
      to,
      from: userName,
      forWho: 'user'
    }
    io.to(userSocketMap[to]).emit('messageReceived', deliveryData);
  });

  socket.on("group message", ({ to, message }) => {
    const deliveryData = {
      newMessageData: message,
      to,
      from: userName,
      forWho: 'group'
    }
    socket.broadcast.to(to).emit("messageReceived", deliveryData);
  });

  socket.on("createGroup", (groupName, callback) => {
    if (userGroupNames.includes(groupName))
      callback({ success: false });
    else {
      userGroupNames.push(groupName)
      socket.join(groupName)
      socket.broadcast.emit("addNewGroup", groupName)
      callback({ success: true });
    }

  })

  socket.on("join group", (groupName) => {
    socket.join(groupName)
    socket.emit("group joined", groupName, userName);
  })

  socket.on("disconnect", (reason) => {
    for (const [user, id] of Object.entries(userSocketMap)) {
      if (id === socket.id) {
        delete userSocketMap[user];
        break;
      }
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log("❌ disconnected", userName);

  });

});


export { io, app, server };
