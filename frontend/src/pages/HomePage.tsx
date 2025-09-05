import React, { useState } from 'react'
import { useSocket } from '../store/useSocket'


const HomePage = () => {
  const { setMyName } = useSocket()
  const [nameInput, setNameInput] = useState("");
  // const { subscribeToMessages, unsubscribeFromMessages } = useChatStore()
  const handleNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    setMyName(nameInput.trim().toLowerCase());

  };
  return (
    <div className="hero bg-base-200 h-[calc(100vh-64px)]">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <form onSubmit={handleNameSubmit} className='flex flex-col justify-center items-center gap-2'>
          <label htmlFor="username" className="text-5xl font-bold">
            Choose your secret identity
          </label>
          <span className="py-6 text-center">
            This is how your buddies will spot you. Batman is already taken 🦇
          </span>
          <input
            type="text"
            placeholder="Type here"
            className="input"
            id='username'
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">This is my name</button>
        </form>
      </div>
    </div>
  )
}

export default HomePage