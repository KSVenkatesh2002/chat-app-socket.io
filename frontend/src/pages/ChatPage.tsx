import { useChatStore } from '../store/useChatStore'
import MsgInput from '../components/MsgInput';
import BobbleChats from '../components/BobbleChats';
import { MessageSquare } from 'lucide-react';



const ChatPage = () => {
  const { selectedUser, selectedGroupName } = useChatStore()

  if (!selectedUser && !selectedGroupName)
    return (
      <div className="h-[calc(100vh-64px)] flex flex-col justify-center items-center bg-accent">
        <MessageSquare className='animate-bounce size-10 text-gray-700' />
        <h1 className='pt-7 text-gray-600 text-2xl font-bold '>Welcome To Chat App</h1>
        <span className="pt-4 text-center text-gray-500 text-md">
          Pick your chat partner from sidebar <br />
          start messaging!
        </span>
      </div>)
  return (
    <div >
      <p className=' w-full bg-indigo-200 p-2 shadow-md'>{selectedUser || selectedGroupName}</p>
      <BobbleChats isGroup={selectedGroupName === '' ? false : true} />
      <MsgInput />
    </div>
  )
}

export default ChatPage