import React, { useState } from 'react';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  CalendarIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const mockExams = [
  {
    id: '1',
    courseCode: 'INFO101',
    courseName: 'Introduction à l\'Informatique',
    type: 'final',
    date: '2024-12-15',
    time: '09:00',
    duration: 120,
    location: 'Amphithéâtre A',
    semester: 1,
    academicYear: '2024-2025',
    level: 'L1',
    studentsCount: 45
  },
  {
    id: '2',
    courseCode: 'MATH101',
    courseName: 'Mathématiques Générales',
    type: 'midterm',
    date: '2024-10-20',
    time: '14:00',
    duration: 90,
    location: 'Salle 201',
    semester: 1,
    academicYear: '2024-2025',
    level: 'L1',
    studentsCount: 52
  },
  {
    id: '3',
    courseCode: 'PHYS201',
    courseName: 'Physique Appliquée',
    type: 'final',
    date: '2024-12-18',
    time: '10:30',
    duration: 180,
    location: 'Amphithéâtre B',
    semester: 1,
    academicYear: '2024-2025',
    level: 'L2',
    studentsCount: 38
  }
];

const examTypes = {
  midterm: 'Partiel',
  final: 'Final',
  makeup: 'Rattrapage'
};

const typeColors = {
  midterm: 'bg-blue-100 text-blue-800',
  final: 'bg-red-100 text-red-800',
  makeup: 'bg-yellow-100 text-yellow-800'
};

export const Exams: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const filteredExams = mockExams.filter(exam => {
    const matchesSearch = 
      exam.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === '' || exam.type === selectedType;
    const matchesLevel = selectedLevel === '' || exam.level === selectedLevel;
    
    const examMonth = new Date(exam.date).getMonth() + 1;
    const matchesMonth = selectedMonth === '' || examMonth.toString() === selectedMonth;
    
    return matchesSearch && matchesType && matchesLevel && matchesMonth;
  });

  const getExamStatus = (examDate: string) => {
    const today = new Date();
    const exam = new Date(examDate);
    
    if (exam < today) return 'completed';
    if (exam.toDateString() === today.toDateString()) return 'today';
    return 'upcoming';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'today': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'today': return 'Aujourd\'hui';
      case 'upcoming': return 'À venir';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Gestion des Examens</h1>
          <p className="text-secondary-600">
            Éphéméride des examens - Système LMD
          </p>
        </div>
        <button className="btn-primary flex items-center">
          <PlusIcon className="w-5 h-5 mr-2" />
          Programmer un examen
        </button>
      </div>

      {/* Academic Calendar Info */}
      <div className="card bg-primary-50 border-primary-200">
        <h3 className="text-lg font-semibold text-primary-900 mb-3">
          Calendrier Académique 2024-2025
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Semestre 1 (Sept - Déc)</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• Examens partiels: 15-25 Octobre</li>
              <li>• Examens finaux: 10-20 Décembre</li>
              <li>• Session rattrapage: 5-15 Janvier</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-primary-800 mb-2">Semestre 2 (Fév - Mai)</h4>
            <ul className="space-y-1 text-primary-700">
              <li>• Examens partiels: 15-25 Mars</li>
              <li>• Examens finaux: 10-20 Mai</li>
              <li>• Session rattrapage: 5-15 Juin</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" />
              <input
                type="text"
                placeholder="Rechercher par cours, code ou lieu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input-field"
            >
              <option value="">Tous les types</option>
              <option value="midterm">Partiel</option>
              <option value="final">Final</option>
              <option value="makeup">Rattrapage</option>
            </select>
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
          <div className="w-full md:w-48">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="input-field"
            >
              <option value="">Tous les mois</option>
              <option value="10">Octobre</option>
              <option value="11">Novembre</option>
              <option value="12">Décembre</option>
              <option value="1">Janvier</option>
              <option value="3">Mars</option>
              <option value="5">Mai</option>
              <option value="6">Juin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Exams List */}
      <div className="space-y-4">
        {filteredExams.map((exam) => {
          const status = getExamStatus(exam.date);
          return (
            <div key={exam.id} className="card hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-secondary-900">
                      {exam.courseCode} - {exam.courseName}
                    </h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      typeColors[exam.type as keyof typeof typeColors]
                    }`}>
                      {examTypes[exam.type as keyof typeof examTypes]}
                    </span>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                      {exam.level}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
                      {getStatusLabel(status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-secondary-600">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {new Date(exam.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      {exam.time} ({exam.duration} min)
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-2" />
                      {exam.location}
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-2 text-center">👥</span>
                      {exam.studentsCount} étudiants
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="btn-secondary text-xs">
                    Modifier
                  </button>
                  <button className="btn-primary text-xs">
                    Détails
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">24</div>
          <div className="text-sm text-secondary-600">Examens ce mois</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">8</div>
          <div className="text-sm text-secondary-600">Examens partiels</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-600">12</div>
          <div className="text-sm text-secondary-600">Examens finaux</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">4</div>
          <div className="text-sm text-secondary-600">Rattrapages</div>
        </div>
      </div>
    </div>
  );
};