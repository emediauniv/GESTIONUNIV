import React, { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/outline';

const mockCourses = [
  {
    id: '1',
    code: 'INFO101',
    name: 'Introduction à l\'Informatique',
    description: 'Cours de base en informatique pour débutants',
    credits: 6,
    level: 'L1',
    semester: 1,
    teacher: 'Dr. Pierre Dupont',
    teachingUnits: [
      {
        id: '1',
        name: 'Algorithmique',
        code: 'ALGO101',
        credits: 3,
        elements: [
          { id: '1', name: 'Cours magistral', code: 'CM', coefficient: 0.6, hours: 20 },
          { id: '2', name: 'Travaux dirigés', code: 'TD', coefficient: 0.4, hours: 15 }
        ]
      },
      {
        id: '2',
        name: 'Programmation',
        code: 'PROG101',
        credits: 3,
        elements: [
          { id: '3', name: 'Cours magistral', code: 'CM', coefficient: 0.5, hours: 15 },
          { id: '4', name: 'Travaux pratiques', code: 'TP', coefficient: 0.5, hours: 20 }
        ]
      }
    ]
  },
  {
    id: '2',
    code: 'MATH101',
    name: 'Mathématiques Générales',
    description: 'Mathématiques de base pour L1',
    credits: 8,
    level: 'L1',
    semester: 1,
    teacher: 'Prof. Marie Leroy',
    teachingUnits: [
      {
        id: '3',
        name: 'Analyse',
        code: 'ANA101',
        credits: 4,
        elements: [
          { id: '5', name: 'Cours magistral', code: 'CM', coefficient: 0.7, hours: 25 },
          { id: '6', name: 'Travaux dirigés', code: 'TD', coefficient: 0.3, hours: 15 }
        ]
      },
      {
        id: '4',
        name: 'Algèbre',
        code: 'ALG101',
        credits: 4,
        elements: [
          { id: '7', name: 'Cours magistral', code: 'CM', coefficient: 0.7, hours: 25 },
          { id: '8', name: 'Travaux dirigés', code: 'TD', coefficient: 0.3, hours: 15 }
        ]
      }
    ]
  }
];

export const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = selectedLevel === '' || course.level === selectedLevel;
    const matchesSemester = selectedSemester === '' || course.semester.toString() === selectedSemester;
    
    return matchesSearch && matchesLevel && matchesSemester;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Gestion des Cours</h1>
          <p className="text-secondary-600">
            Gérez les cours, unités d'enseignement et éléments constitutifs
          </p>
        </div>
        <button className="btn-primary flex items-center">
          <PlusIcon className="w-5 h-5 mr-2" />
          Nouveau cours
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
                placeholder="Rechercher par nom, code ou enseignant..."
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
          <div className="w-full md:w-48">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="input-field"
            >
              <option value="">Tous les semestres</option>
              <option value="1">Semestre 1</option>
              <option value="2">Semestre 2</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        {filteredCourses.map((course) => (
          <div key={course.id} className="card">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h3 className="text-lg font-semibold text-secondary-900">
                    {course.code} - {course.name}
                  </h3>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                    {course.level} - S{course.semester}
                  </span>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {course.credits} crédits
                  </span>
                </div>
                <p className="text-secondary-600 mb-2">{course.description}</p>
                <p className="text-sm text-secondary-500">
                  Enseignant: <span className="font-medium">{course.teacher}</span>
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                  className="text-primary-600 hover:text-primary-900"
                >
                  <EyeIcon className="w-5 h-5" />
                </button>
                <button className="text-secondary-600 hover:text-secondary-900">
                  <PencilIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Expanded Course Details */}
            {expandedCourse === course.id && (
              <div className="mt-6 border-t border-secondary-200 pt-6">
                <h4 className="text-md font-semibold text-secondary-900 mb-4">
                  Unités d'Enseignement
                </h4>
                <div className="space-y-4">
                  {course.teachingUnits.map((unit) => (
                    <div key={unit.id} className="bg-secondary-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-medium text-secondary-900">
                          {unit.code} - {unit.name}
                        </h5>
                        <span className="text-sm text-secondary-600">
                          {unit.credits} crédits
                        </span>
                      </div>
                      <div className="space-y-2">
                        <h6 className="text-sm font-medium text-secondary-700">
                          Éléments Constitutifs:
                        </h6>
                        {unit.elements.map((element) => (
                          <div key={element.id} className="flex justify-between items-center text-sm">
                            <span className="text-secondary-600">
                              {element.name} ({element.code})
                            </span>
                            <div className="flex space-x-4 text-secondary-500">
                              <span>Coeff: {element.coefficient}</span>
                              <span>{element.hours}h</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">89</div>
          <div className="text-sm text-secondary-600">Total cours</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">45</div>
          <div className="text-sm text-secondary-600">Cours L1</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">28</div>
          <div className="text-sm text-secondary-600">Cours L2-L3</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">16</div>
          <div className="text-sm text-secondary-600">Cours Master</div>
        </div>
      </div>
    </div>
  );
};