import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";
import { useChatStore } from "./useChatStore";

const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:3000"
  : "https://venkatesh-realtime-chat-app.onrender.com";

type group = {
  groupName: string;
  notJoined: boolean;
};

interface SocketStore {
  userName: string,
  socket: Socket | null;
  onlineUsers: string[];
  onlineGroups: group[];

  setMyName: (data: string) => void;
  connectSocket: (data: string) => void;
  disconnectSocket: () => void;
  createGroup: (selectedGroupName: string) => void;
  addToGroup: (groupName: string, notJoined: boolean) => void;
  joinGroup: (groupName: string) => void;
}

export const useSocket = create<SocketStore>((set, get) => ({
  userName: '',
  socket: null,
  onlineUsers: [],
  onlineGroups: [],

  setMyName: (data) => {

    // toast.success(`Your user name is ${get().userName}`)
    get().connectSocket(data);
  },

  connectSocket: async (data) => {
    if (get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userName: data,
      },
      transports: ["websocket"],
      autoConnect: false,
    });

    socket.connect();
    socket.on("connect_error", (err) => {
      console.error("Socket connect error:", err.message);
    });

    socket.on("connect", () => {
      set({ userName: data });
      toast.success("Connected");
      set({ socket });
      const { subscribeToMessages, unsubscribeFromMessages } = useChatStore.getState()
      unsubscribeFromMessages()
      subscribeToMessages()
    });

    socket.on("usernameTaken", (name) => {
      toast.error(`Username "${name}" is already taken. Please choose another.`);
      socket.disconnect(); // Make sure to disconnect the invalid attempt
      set({ socket: null, userName: '' }); // Reset state
    });

    socket.on("getOnlineUsers", (userNames: string[]) => {
      if (userNames.length > 0) {
        set({ onlineUsers: userNames });
      }
    });

    socket.on("getOnlineGroups", (groupName: group[]) => {
      set({ onlineGroups: groupName });
    });

    socket.on('addNewGroup', (groupName) => {
      get().addToGroup(groupName, true)
    })

    socket.on("disconnect", () => {
      set({ userName: '' });
      set({ socket: null });
    });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) {
      socket.disconnect();
      set({ userName: '' });
      set({ socket: null });
    }
  },

  createGroup: (selectedGroupName) => {
    const { socket } = get();
    if (!socket?.connected) {
      console.warn("Socket not connected. Cannot emit group creation.");
      return;
    }
    socket.emit("createGroup", selectedGroupName, (res: { success: boolean }) => {
      if (res.success) {

        get().addToGroup(selectedGroupName, false)
        useChatStore.setState({ selectedUser: '' });
        useChatStore.setState({ selectedGroupName });
      } else {
        // Group name already taken or other error
        toast.error(`Group name "${selectedGroupName}" is already occupied`);
      }
    })
  },

  addToGroup: (groupName, notJoined) => {
    const newGroup = {
      groupName,
      notJoined,
    };

    set((state) => ({
      onlineGroups: [...state.onlineGroups, newGroup],
    }));
  },

  joinGroup: (groupName) => {
    const { socket } = get();

    if (!socket?.connected) {
      console.warn("Socket not connected. Cannot emit group creation.");
      return;
    }

    socket.emit('join group', groupName)
    console.log('joinGroup ', get().onlineGroups)
    set((state) => ({
      onlineGroups: state.onlineGroups.map((group) =>
        group.groupName === groupName
          ? { ...group, notJoined: false }
          : group
      ),
    }));

    console.log('joinGroup ', get().onlineGroups)
  }

}));
