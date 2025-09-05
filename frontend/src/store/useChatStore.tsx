import { create } from "zustand";
import toast from "react-hot-toast";
import { useSocket } from "./useSocket";


type Message = {
  from: string;
  msg: string;
};


interface ChatStore {
  messages: {
    [userName: string]: Message[];
  };
  groupMessages: {
    [userName: string]: Message[];
  };
  selectedUser: string,
  selectedGroupName: string,

  getChatsForSelectedUser: () => Message[];
  getChatsForSelectedGroup: () => Message[];

  sendMessageToOnePerson: (messageData: string) => void;
  sendMessageToGroup: (messageData: string) => void;
  sendMessageToAll: (messageData: string) => void;

  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;

  setSelectedUser: (selectedUser: string) => void;
  setSelectedGroup: (selectedGroupName: string) => void;
}

const getSocket = () => {
  const socket = useSocket.getState().socket;
  if (socket?.connected) {
    return socket;
  }
  throw new Error("Socket not connected");
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: {},
  groupMessages: {},
  selectedUser: '',
  selectedGroupName: '',

  getChatsForSelectedUser: () => {
    const { selectedUser, messages } = get();

    if (!selectedUser) {
      return [];
    }

    return messages[selectedUser] || [];
  },
  getChatsForSelectedGroup: () => {
    const { selectedGroupName, groupMessages } = get();

    if (!selectedGroupName) {
      return [];
    }

    return groupMessages[selectedGroupName] || [];
  },

  sendMessageToOnePerson: (messageData) => {
    sendMessage({
      to: get().selectedUser,
      messageData,
      type: 'user',
      socketEvent: 'private message',
      stateKey: 'messages',
      getUserName: () => useSocket.getState().userName,
      set,
      // get,
    });
  },
  sendMessageToGroup: (messageData) => {
    sendMessage({
      to:  get().selectedGroupName,
      messageData,
      type: 'group',
      socketEvent: 'group message',
      stateKey: 'groupMessages',
      getUserName: () => useSocket.getState().userName,
      set,
      // get,
    });
  },
  sendMessageToAll: (messageData) => {
    sendMessage({
      to:  'all',
      messageData,
      type: 'all',
      socketEvent: 'message to all',
      stateKey: 'groupMessages',
      getUserName: () => useSocket.getState().userName,
      set,
      // get,
    });
  },

  subscribeToMessages: () => {
    try {
      const socket = getSocket();

      socket.on("messageReceived", ({ newMessageData, to, from, forWho }) => {
        const { selectedUser, selectedGroupName } = get();
        const isMessageFromNonSelectedUser = from !== selectedUser && to !== selectedGroupName;
        if (isMessageFromNonSelectedUser) toast.success(`${from} : ${newMessageData}`);
        const newMessage = { from, msg: newMessageData };
        switch (forWho) {
          case 'user':
            set((state) => ({
              messages: {
                ...state.messages,
                [from]: [...(state.messages[from] || []), newMessage],
              },
            }));
            break
          case 'group':
            set((state) => ({
              groupMessages: {
                ...state.groupMessages,
                [to]: [...(state.groupMessages[to] || []), newMessage],
              },
            }));
            break
          case 'all':
            set((state) => ({
              groupMessages: {
                ...state.groupMessages,
                ['all']: [...(state.groupMessages['all'] || []), newMessage],
              },
            }));
            break
          default:
            toast.error('Error in message receive')
        }
      })
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "subscribe To Messages -> failed");
      console.log(error)
    }

  },
  unsubscribeFromMessages: () => {
    try {
      const socket = getSocket();
      socket.off("messageReceived");

    } catch (error: any) {
      toast.error(error?.response?.data?.message || "unsubscribe From Messages -> failed");
    }
  },

  setSelectedUser: (selectedUser: string) => {
    // const { selectedGroupName } = get();
    set({ selectedGroupName: '' })
    set({ selectedUser })
  },
  setSelectedGroup: (selectedGroupName: string) => {
    const isGroupJoined = useSocket
      .getState()
      .onlineGroups
      .some(group =>
        group.groupName === selectedGroupName
        && group.notJoined === false)
    try {
      if (isGroupJoined) {
        set({ selectedUser: '' })
        set({ selectedGroupName })
      } else {
        toast.error(`group not joined '${selectedGroupName} ' `)
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "set Selected Group -> failed");
    }

  },

}));
const sendMessage = ({
  to,
  messageData,
  type,
  socketEvent,
  stateKey, 
  getUserName,
  set,
  // get,

}: {
  to: string;
  messageData: string;
  type: 'user' | 'group' | 'all';
  socketEvent: string;
  stateKey: 'messages' | 'groupMessages';
  getUserName: () => string;
  set: (fn: (state: any) => any) => void;
  // get: () => any;
}) => {
  if (!to) {
    toast.error(`No ${type} selected`);
    return;
  }

  const socket = getSocket();

  try {
    socket.emit(socketEvent, {
      to,
      message: messageData,
    });

    const newMessage = {
      from: getUserName(),
      msg: messageData,
    };

    set((state) => ({
      [stateKey]: {
        ...state[stateKey],
        [to]: [...(state[stateKey][to] || []), newMessage],
      },
    }));
  } catch (error: any) {
    toast.error(
      error?.response?.data?.message || `sendMessageTo${type} -> failed`
    );
  }
};

