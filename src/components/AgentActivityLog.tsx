// src/components/AgentActivityLog.tsx

import React from 'react';
import { Activity, Clock } from 'lucide-react';
import { AgentAction } from '../types';

interface AgentActivityLogProps {
  actions: AgentAction[];
}

export const AgentActivityLog: React.FC<AgentActivityLogProps> = ({ actions }) => {
  const systemColors = {
    nifi: 'bg-blue-100 text-blue-800 border-blue-300',
    kafka: 'bg-green-100 text-green-800 border-green-300',
    flink: 'bg-purple-100 text-purple-800 border-purple-300',
    'cloudera-ai': 'bg-orange-100 text-orange-800 border-orange-300',
    iceberg: 'bg-cyan-100 text-cyan-800 border-cyan-300'
  };

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
      <h3 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
        <Activity size={20} />
        Agent Processing Steps
      </h3>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {actions.map((action, idx) => (
          <div key={idx} className="border-l-4 border-blue-500 pl-4 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm text-gray-800">{action.step}</span>
              {action.system && (
                <span className={`text-xs px-2 py-1 rounded border ${systemColors[action.system]}`}>
                  {action.system.toUpperCase()}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-600 mb-2 bg-gray-50 p-2 rounded italic">
              💭 {action.thinking}
            </div>
            <div className="text-sm text-gray-800 bg-blue-50 p-2 rounded">
              ✓ {action.result}
            </div>
            <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
              <Clock size={12} />
              {action.duration}ms
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};