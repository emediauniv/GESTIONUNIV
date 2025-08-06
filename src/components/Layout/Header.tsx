import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-secondary-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-secondary-900">
            Système de Gestion Scolaire
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-secondary-400 hover:text-secondary-600 transition-colors">
            <BellIcon className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-3">
            <UserCircleIcon className="w-8 h-8 text-secondary-400" />
            <div className="text-sm">
              <div className="font-medium text-secondary-900">
                {user?.user_metadata?.firstName} {user?.user_metadata?.lastName}
              </div>
              <div className="text-secondary-500">{user?.email}</div>
            </div>
            <button
              onClick={signOut}
              className="text-sm text-secondary-500 hover:text-secondary-700 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};