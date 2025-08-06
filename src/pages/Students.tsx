import React, { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/outline';

const mockStudents = [
  {
    id: '1',
    studentId: 'EMU2024001',
    firstName: 'Marie',
    lastName: 'Dubois',
    email: 'marie.dubois@email.com',
    phone: '+33 6 12 34 56 78',
    level: 'L1',
    semester: 1,
    specialization: 'Informatique',
    status: 'active',
    enrollmentDate: '2024-09-01'
  },
  {
    id: '2',
    studentId: 'EMU2024002',
    firstName: 'Jean',
    lastName: 'Martin',
    email: 'jean.martin@email.com',
    phone: '+33 6 98 76 54 32',
    level: 'L2',
    semester: 3,
    specialization: 'Gestion',
    status: 'active',
    enrollmentDate: '2023-09-01'
  },
  {
    id: '3',
    studentId: 'EMU2024003',
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@email.com',
    phone: '+33 6 11 22 33 44',
    level: 'L3',
    semester: 5,
    specialization: 'Marketing',
    status: 'active',
    enrollmentDate: '2022-09-01'
  }
];

export const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = selectedLevel === '' || student.level === selectedLevel;
    
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Gestion des Étudiants</h1>
          <p className="text-secondary-600">
            Gérez les informations complètes de vos étudiants
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Nouvel étudiant
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, ID ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="input-field"
            >
              <option value="">Tous les niveaux</option>
              <option value="L1">Licence 1</option>
              <option value="L2">Licence 2</option>
              <option value="L3">Licence 3</option>
              <option value="M1">Master 1</option>
              <option value="M2">Master 2</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="table-header">
              <tr>
                <th className="px-6 py-3 text-left">ID Étudiant</th>
                <th className="px-6 py-3 text-left">Nom complet</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Niveau</th>
                <th className="px-6 py-3 text-left">Spécialisation</th>
                <th className="px-6 py-3 text-left">Statut</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-secondary-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-secondary-900">
                      {student.firstName} {student.lastName}
                    </div>
                    <div className="text-sm text-secondary-500">{student.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                      {student.level} - S{student.semester}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                    {student.specialization}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      student.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="text-secondary-600 hover:text-secondary-900">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">1,247</div>
          <div className="text-sm text-secondary-600">Total étudiants</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">1,198</div>
          <div className="text-sm text-secondary-600">Étudiants actifs</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">35</div>
          <div className="text-sm text-secondary-600">En attente</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-600">14</div>
          <div className="text-sm text-secondary-600">Suspendus</div>
        </div>
      </div>
    </div>
  );
};