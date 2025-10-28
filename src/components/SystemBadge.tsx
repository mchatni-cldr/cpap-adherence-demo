// src/components/SystemBadge.tsx

import React from 'react';
import { Database } from 'lucide-react';

interface SystemBadgeProps {
  name: string;
  description?: string;
}

export const SystemBadge: React.FC<SystemBadgeProps> = ({ name, description }) => {
  return (
    <div 
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-medium shadow-sm"
      title={description}
    >
      <Database size={14} />
      <span>{name}</span>
    </div>
  );
};