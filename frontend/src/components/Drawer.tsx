import { useState } from 'react'
import { UserRoundPlus } from "lucide-react";
import { useSocket } from '../store/useSocket'
import { useChatStore } from '../store/useChatStore'

const Drawer = () => {
  const { onlineUsers, userName: currentUser, onlineGroups, createGroup, joinGroup } = useSocket()
  const { setSelectedUser, selectedUser, setSelectedGroup, selectedGroupName } = useChatStore()

  const [groupName, setGroupName] = useState('')

  function handleSelectUser(name: string) {
    setSelectedUser(name)

    colorDrawer()
  }
  function handleSelectGroup(name: string): void {
    setSelectedGroup(name)

    colorDrawer()
  }

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-3">

        <li className={`${currentUser !== '' ? 'bg-accent' : 'bg-red-500'} p-2 rounded-2xl mb-2 text-center uppercase font-bold text-lg`}>
          {currentUser || 'Resister with some Name'}
        </li>

        {/* persons list */}
        <h2 className='flex justify-center text-center font-bold text-xl'>Person</h2>
        {onlineUsers.length > 1
          ? onlineUsers
            .filter((user) => user !== currentUser)
            .map((user, index) => (
              <li
                key={index}
                onClick={() => handleSelectUser(user)}
                className={`${selectedUser === user ? 'bg-accent text-white' : 'bg-accent/10'} cursor-pointer p-2 w-full rounded-md`}
              >
                {user}
              </li>))
          : <p className='text-center'>No active online Users</p>
        }


        {/* group list */}
        {/* <li className=' border-t-2 pt-5 text-center grow gap-2' > */}
        <h2 className='flex justify-center text-center font-bold text-xl border-t-2 pt-5'>Group</h2>
<div className='space-y-2 grow'>{onlineGroups.length > 0
          ? onlineGroups
            .map((group, index) => (
              <li
                key={index}
                className={`${selectedGroupName === group.groupName ? 'bg-accent text-white' : 'bg-accent/10'} flex flex-row justify-between  cursor-pointer p-1 w-full rounded-md`}
              >
                <p
                  onClick={() => handleSelectGroup(group.groupName)}
                  className='grow'
                >
                  {group.groupName}
                </p>

                {
                  group.notJoined == true && <button
                    onClick={() => joinGroup(group.groupName)}
                  >
                    <UserRoundPlus />
                  </button>
                }

              </li>))
          : 'No active online Groups'
        }</div>
        
        <div className='sticky bottom-0 left-0 right-0 flex flex-col gap-2 bg-white'>
          <input
            type="text"
            placeholder='Enter Group Name'
            className=" input input-bordered text-center"
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value)
            }}
          />
          <div className='flex justify-evenly gap-2'>
            <button className='btn' onClick={() => {
              if (groupName.trim()) {
                createGroup(groupName.trim().toLowerCase())
                setGroupName('')
              }
            }}>
              create group
            </button>
          </div>
        </div>


        {/* </li> */}

      </ul>

    </div>
  )
}

export default Drawer

function colorDrawer() {
  const drawerCheckbox = document.getElementById('my-drawer-4') as HTMLInputElement
  if (drawerCheckbox) drawerCheckbox.checked = false
}
