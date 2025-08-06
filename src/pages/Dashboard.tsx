import React from 'react';
import {
  UserGroupIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Étudiants actifs',
    value: '1,247',
    icon: UserGroupIcon,
    change: '+12%',
    changeType: 'increase'
  },
  {
    name: 'Cours disponibles',
    value: '89',
    icon: AcademicCapIcon,
    change: '+3%',
    changeType: 'increase'
  },
  {
    name: 'Paiements en attente',
    value: '€45,230',
    icon: CurrencyDollarIcon,
    change: '-8%',
    changeType: 'decrease'
  },
  {
    name: 'Examens ce mois',
    value: '24',
    icon: CalendarIcon,
    change: '+15%',
    changeType: 'increase'
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'payment',
    message: 'Nouveau paiement reçu de Marie Dubois',
    time: 'Il y a 2 heures'
  },
  {
    id: 2,
    type: 'enrollment',
    message: 'Nouvel étudiant inscrit: Jean Martin',
    time: 'Il y a 4 heures'
  },
  {
    id: 3,
    type: 'exam',
    message: 'Examen de Mathématiques L1 programmé',
    time: 'Il y a 6 heures'
  },
  {
    id: 4,
    type: 'grade',
    message: 'Notes publiées pour le cours de Physique',
    time: 'Il y a 1 jour'
  }
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Tableau de bord</h1>
        <p className="text-secondary-600">
          Vue d'ensemble de votre établissement scolaire
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-secondary-900">{stat.value}</p>
                <p className={`text-sm ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} par rapport au mois dernier
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="card">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            Activités récentes
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-secondary-900">{activity.message}</p>
                  <p className="text-xs text-secondary-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">
            Actions rapides
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors">
              <UserGroupIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-secondary-900">Ajouter étudiant</p>
            </button>
            <button className="p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors">
              <AcademicCapIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-secondary-900">Nouveau cours</p>
            </button>
            <button className="p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors">
              <CalendarIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-secondary-900">Programmer examen</p>
            </button>
            <button className="p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors">
              <CurrencyDollarIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-secondary-900">Gérer paiements</p>
            </button>
          </div>
        </div>
      </div>

      {/* Academic Calendar */}
      <div className="card">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">
          Calendrier académique - Système LMD
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-secondary-900 mb-2">Semestre 1 (Septembre - Décembre)</h4>
            <ul className="text-sm text-secondary-600 space-y-1">
              <li>• Début des cours: 1er Septembre</li>
              <li>• Examens partiels: Mi-Octobre</li>
              <li>• Examens finaux: Fin Décembre</li>
              <li>• Vacances: Janvier</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-secondary-900 mb-2">Semestre 2 (Février - Mai)</h4>
            <ul className="text-sm text-secondary-600 space-y-1">
              <li>• Début des cours: 1er Février</li>
              <li>• Examens partiels: Mi-Mars</li>
              <li>• Examens finaux: Fin Mai</li>
              <li>• Vacances d'été: Juin-Août</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};