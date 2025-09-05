import React, { useState } from 'react'
import { useChatStore } from '../store/useChatStore'


const MsgInput = () => {
  const { selectedUser, selectedGroupName, sendMessageToOnePerson, sendMessageToGroup, sendMessageToAll } = useChatStore()

  const [msg, setMsg] = useState('');

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (msg.trim()) {
      if(selectedUser !== '')
        sendMessageToOnePerson(msg)
      else if(selectedGroupName !== 'all')
        sendMessageToGroup(msg)
      else sendMessageToAll(msg)
      setMsg("");
    }
  };
  if (selectedGroupName ==='' && selectedUser === '')
    return (<div></div>)
  return (
      <div className="sticky bottom-0 gap-2 p-4 flex justify-evenly w-screen bg-accent">
        <form onSubmit={sendMessage} className="flex justify-evenly max-w-96 w-full">
          <input
            type="text"
            className="input input-bordered grow"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </div>
  )
}

export default MsgInput 
