import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  AcademicCapIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  DocumentTextIcon,
  UsersIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Tableau de bord', href: '/', icon: HomeIcon },
  { name: 'Cours', href: '/courses', icon: AcademicCapIcon },
  { name: 'Étudiants', href: '/students', icon: UserGroupIcon },
  { name: 'Enseignants', href: '/teachers', icon: UsersIcon },
  { name: 'Personnel', href: '/staff', icon: UsersIcon },
  { name: 'Paiements', href: '/payments', icon: CurrencyDollarIcon },
  { name: 'Examens', href: '/exams', icon: CalendarIcon },
  { name: 'Relevés de notes', href: '/transcripts', icon: DocumentTextIcon },
  { name: 'Paramètres', href: '/settings', icon: CogIcon },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 px-4 bg-primary-600">
        <h1 className="text-xl font-bold text-white">EMEDIA UNIVERSITY</h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-secondary-200">
        <div className="text-xs text-secondary-500 text-center">
          © 2025 EMEDIA UNIVERSITY
          <br />
          <a href="https://www.e-mediauniversity.io" className="text-primary-600 hover:text-primary-700">
            www.e-mediauniversity.io
          </a>
        </div>
      </div>
    </div>
  );
};