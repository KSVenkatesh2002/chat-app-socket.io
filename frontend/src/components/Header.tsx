import '../App.css'
import { UsersRound } from "lucide-react";
import Drawer from './Drawer';

const Header = () => {

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-none">
        {/* drawer start*/}
        <div className="drawer drawer-start">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> */}
              <UsersRound />
            </label>
          </div>
          <Drawer/>
        </div>
        {/* drawer end*/}
      </div>

      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Chat App</a>
      </div>

      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
        </button>
      </div>

    </div>
  )
}

export default Header