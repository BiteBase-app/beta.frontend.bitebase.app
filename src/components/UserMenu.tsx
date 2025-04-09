import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../app/auth';

export const UserMenu: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
    if (!currentUser?.email) return '?';
    return currentUser.email.charAt(0).toUpperCase();
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
      >
        {getInitials()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-2">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium">{currentUser?.displayName || 'User'}</p>
              <p className="text-xs text-gray-500">{currentUser?.email}</p>
            </div>

            <div className="py-1">
              <button 
                onClick={() => { navigate('/profile'); setIsOpen(false); }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
              >
                Profile
              </button>
              <button 
                onClick={() => { navigate('/dashboard'); setIsOpen(false); }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
              >
                Dashboard
              </button>
              <button 
                onClick={() => { navigate('/settings'); setIsOpen(false); }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
              >
                Settings
              </button>
            </div>

            <div className="border-t border-gray-100 pt-1">
              <button 
                onClick={handleLogout}
                disabled={loading}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md"
              >
                {loading ? 'Logging out...' : 'Log out'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
