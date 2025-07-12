import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const user = useSelector((store) => store.user);
  console.log(user);  // Check if user exists after login

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">👑 DevTinder</a>
      </div>

      <div className="flex gap-2">
        {user && (  // ✅ Show only if user is logged in
          <div className="dropdown dropdown-end mx-5 flex items-center">
             <p className="px-4">Welcome, {user.firstname}</p>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={user.photourl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
