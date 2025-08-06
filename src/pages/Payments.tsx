import React, { useState } from 'react';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  EyeIcon, 
  DocumentArrowUpIcon,
  PrinterIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const mockPayments = [
  {
    id: '1',
    studentId: 'EMU2024001',
    studentName: 'Marie Dubois',
    amount: 2500,
    type: 'tuition',
    description: 'Frais de scolarité S1 2024-2025',
    status: 'paid',
    dueDate: '2024-09-15',
    paidDate: '2024-09-10',
    proofUrl: '/receipts/payment-1-proof.pdf',
    receiptUrl: '/receipts/payment-1-receipt.pdf'
  },
  {
    id: '2',
    studentId: 'EMU2024002',
    studentName: 'Jean Martin',
    amount: 150,
    type: 'registration',
    description: 'Frais d\'inscription 2024-2025',
    status: 'pending',
    dueDate: '2024-10-01',
    paidDate: null,
    proofUrl: null,
    receiptUrl: null
  },
  {
    id: '3',
    studentId: 'EMU2024003',
    studentName: 'Sophie Bernard',
    amount: 75,
    type: 'exam',
    description: 'Frais d\'examen session rattrapage',
    status: 'overdue',
    dueDate: '2024-09-20',
    paidDate: null,
    proofUrl: null,
    receiptUrl: null
  }
];

const paymentTypes = {
  tuition: 'Scolarité',
  registration: 'Inscription',
  exam: 'Examen',
  other: 'Autre'
};

const statusColors = {
  paid: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  overdue: 'bg-red-100 text-red-800'
};

const statusLabels = {
  paid: 'Payé',
  pending: 'En attente',
  overdue: 'En retard'
};

export const Payments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = 
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === '' || payment.status === selectedStatus;
    const matchesType = selectedType === '' || payment.type === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handlePrintReceipt = (paymentId: string) => {
    // Logique d'impression du reçu
    console.log('Impression du reçu pour le paiement:', paymentId);
  };

  const handleUploadProof = (paymentId: string) => {
    // Logique d'upload de preuve de paiement
    console.log('Upload de preuve pour le paiement:', paymentId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Gestion des Paiements</h1>
          <p className="text-secondary-600">
            Gérez les frais de scolarité et autres paiements
          </p>
        </div>
        <button className="btn-primary flex items-center">
          <PlusIcon className="w-5 h-5 mr-2" />
          Nouveau paiement
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
                placeholder="Rechercher par étudiant, ID ou description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field"
            >
              <option value="">Tous les statuts</option>
              <option value="paid">Payé</option>
              <option value="pending">En attente</option>
              <option value="overdue">En retard</option>
            </select>
          </div>
          <div className="w-full md:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input-field"
            >
              <option value="">Tous les types</option>
              <option value="tuition">Scolarité</option>
              <option value="registration">Inscription</option>
              <option value="exam">Examen</option>
              <option value="other">Autre</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="table-header">
              <tr>
                <th className="px-6 py-3 text-left">Étudiant</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Montant</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Échéance</th>
                <th className="px-6 py-3 text-left">Statut</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-secondary-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-secondary-900">
                      {payment.studentName}
                    </div>
                    <div className="text-sm text-secondary-500">{payment.studentId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-secondary-900 max-w-xs">
                      {payment.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                    €{payment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-secondary-100 text-secondary-800">
                      {paymentTypes[payment.type as keyof typeof paymentTypes]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                    {new Date(payment.dueDate).toLocaleDateString('fr-FR')}
                    {payment.paidDate && (
                      <div className="text-xs text-green-600">
                        Payé le {new Date(payment.paidDate).toLocaleDateString('fr-FR')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                      statusColors[payment.status as keyof typeof statusColors]
                    }`}>
                      {payment.status === 'paid' && <CheckCircleIcon className="w-3 h-3 mr-1" />}
                      {payment.status === 'overdue' && <ExclamationTriangleIcon className="w-3 h-3 mr-1" />}
                      {statusLabels[payment.status as keyof typeof statusLabels]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      {payment.status !== 'paid' && (
                        <button
                          onClick={() => handleUploadProof(payment.id)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Upload preuve de paiement"
                        >
                          <DocumentArrowUpIcon className="w-4 h-4" />
                        </button>
                      )}
                      {payment.status === 'paid' && (
                        <button
                          onClick={() => handlePrintReceipt(payment.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Imprimer reçu"
                        >
                          <PrinterIcon className="w-4 h-4" />
                        </button>
                      )}
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
          <div className="text-2xl font-bold text-primary-600">€125,450</div>
          <div className="text-sm text-secondary-600">Total collecté</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">€98,200</div>
          <div className="text-sm text-secondary-600">Paiements reçus</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600">€22,150</div>
          <div className="text-sm text-secondary-600">En attente</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-600">€5,100</div>
          <div className="text-sm text-secondary-600">En retard</div>
        </div>
      </div>

      {/* Payment Upload Modal would go here */}
      {/* Receipt Generation Modal would go here */}
    </div>
  );
};