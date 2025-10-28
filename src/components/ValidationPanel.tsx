// src/components/ValidationPanel.tsx

import React from 'react';
import { ValidationCategory } from '../types';

interface ValidationPanelProps {
  validations: ValidationCategory[];
}

export const ValidationPanel: React.FC<ValidationPanelProps> = ({ validations }) => {
  return (
    <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
      <h3 className="text-lg font-bold mb-4 text-gray-900">Validation Results</h3>
      <div className="space-y-4">
        {validations.map((category, idx) => (
          <div key={idx} className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-800 mb-2">{category.category}</h4>
            <div className="space-y-2">
              {category.checks.map((check, cidx) => (
                <div key={cidx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      check.status === 'pass' ? 'bg-green-500' :
                      check.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></span>
                    <span className="text-gray-700">{check.name}</span>
                    {check.value && <span className="text-gray-500">({check.value})</span>}
                  </div>
                  <span className="text-gray-400 text-xs">{check.duration}ms</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};