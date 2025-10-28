// src/components/PatientCard.tsx

import React from 'react';
import { CPAPPatient } from '../types';

interface PatientCardProps {
  patient: CPAPPatient;
  onClick: () => void;
  isActive: boolean;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient, onClick, isActive }) => {
  const statusColors = {
    'on-track': 'bg-green-50 border-green-300',
    'at-risk': 'bg-yellow-50 border-yellow-300',
    'critical': 'bg-red-50 border-red-300',
    'escalated': 'bg-purple-50 border-purple-300',
    'compliant': 'bg-blue-50 border-blue-300'
  };

  const statusIcons = {
    'on-track': '✅',
    'at-risk': '⚠️',
    'critical': '🚨',
    'escalated': '📞',
    'compliant': '🎉'
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
        isActive ? 'ring-2 ring-blue-500 border-blue-500' : statusColors[patient.status]
      } hover:shadow-md mb-2`}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-semibold text-gray-900">{patient.name}</div>
          <div className="text-xs text-gray-600">{patient.patientId}</div>
        </div>
        <span className="text-xl">{statusIcons[patient.status]}</span>
      </div>
      <div className="text-sm space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-600">Day {patient.daysInProgram}/90</span>
          <span className="font-semibold">{patient.currentUsage.lastNightHours}h</span>
        </div>
        <div className="text-xs text-gray-500">Risk: {patient.mlRiskScore}</div>
      </div>
    </div>
  );
};