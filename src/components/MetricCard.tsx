// src/components/MetricCard.tsx

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'cyan';
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  label, 
  value, 
  icon: Icon, 
  trend, 
  color = 'blue' 
}) => {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
    purple: 'text-purple-600',
    cyan: 'text-cyan-600'
  };

  const iconColorClasses = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    yellow: 'text-yellow-500',
    red: 'text-red-500',
    purple: 'text-purple-500',
    cyan: 'text-cyan-500'
  };

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-600 font-medium mb-2 h-10 flex items-center">{label}</p>
          <p className={`text-3xl font-bold mb-1 ${colorClasses[color]}`}>{value}</p>
          {trend && <p className="text-xs text-gray-500">{trend}</p>}
        </div>
        <Icon className={`${iconColorClasses[color]} flex-shrink-0 ml-2`} size={32} />
      </div>
    </div>
  );
};