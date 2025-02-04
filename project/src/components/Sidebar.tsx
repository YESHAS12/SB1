import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Users, LogOut } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4">
      <div className="text-2xl font-bold mb-8 text-center">
        Student Portal
      </div>
      <nav className="space-y-2">
        <NavLink
          to="/students"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`
          }
        >
          <Users size={20} />
          <span>Students</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}