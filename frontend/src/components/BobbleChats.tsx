import MyMsg from './MyMsg'
import OthersMsg from './OthersMsg'
import { useChatStore } from '../store/useChatStore'
import { useSocket } from '../store/useSocket'

const BobbleChats = ({ isGroup }: { isGroup: boolean }) => {
  const { getChatsForSelectedUser, getChatsForSelectedGroup, selectedUser, selectedGroupName } = useChatStore()

  const { userName } = useSocket()

  const chats = isGroup ? getChatsForSelectedGroup() : getChatsForSelectedUser()

  if (!selectedUser && !selectedGroupName)
    return (
      <div className=' h-[calc(100vh-64px)] flex justify-center items-center '>
        <span className='p-10 bg-amber-500 rounded-full shadow-2xl shadow-amber-300'>
          Pick your chat partner, and enjoy with messages
        </span>
      </div>
    )
  if (chats.length === 0) {
    return (
      <div className="h-[calc(100vh-64px)] flex flex-col justify-center items-center bg-accent text-xl">
        start chatting
      </div>
    )
  }
  return (
    <div className="flex flex-col bg-accent min-h-[calc(100vh-176px)] overflow-auto p-4">
      {
        <div className="flex flex-col space-y-2">{
          chats.map((message, index) => (
            message.from == userName ? (
              <MyMsg key={index} msg={message.msg} />
            ) : (
              <OthersMsg
                key={index}
                msg={message.msg}
                isGroup={isGroup}
                fromName={message.from}
              />
            )
          ))
        }</div>
      }
    </div>
  )
}

export default BobbleChats