// src/components/MLExplainabilityPanel.tsx

import React from 'react';
import { MLScore } from '../types';

interface MLExplainabilityPanelProps {
  score: MLScore;
}

export const MLExplainabilityPanel: React.FC<MLExplainabilityPanelProps> = ({ score }) => {
  const riskColors = {
    low: 'text-green-600 bg-green-50 border-green-300',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-300',
    high: 'text-orange-600 bg-orange-50 border-orange-300',
    critical: 'text-red-600 bg-red-50 border-red-300'
  };

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
      <h3 className="text-lg font-bold mb-4 text-gray-900">ML Risk Assessment</h3>
      <div className={`p-4 rounded-lg border-2 mb-4 ${riskColors[score.riskLevel]}`}>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">Overall Risk Score</span>
          <span className="font-bold text-2xl">{score.overallScore}</span>
        </div>
        <div className="text-sm mt-2 uppercase font-semibold">{score.riskLevel} Risk</div>
      </div>
      
      <div className="space-y-3 mb-4">
        {score.factors.map((factor, idx) => (
          <div key={idx} className="bg-gray-50 p-3 rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-sm text-gray-800">{factor.name}</span>
              <span className="text-xs text-gray-600">Impact: {(factor.impact * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full ${
                  factor.score < 30 ? 'bg-green-500' :
                  factor.score < 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${factor.score}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600">{factor.explanation}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-sm text-blue-900 mb-2">ML Model Reasoning</h4>
        <ul className="space-y-1">
          {score.reasoning.map((reason, idx) => (
            <li key={idx} className="text-xs text-blue-800 flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">▪</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg">
        <div className="font-semibold text-sm mb-1">Agent Recommendation</div>
        <div className="text-xs">
          {score.recommendation === 'continue-monitoring' && '✓ Continue automated monitoring with positive reinforcement'}
          {score.recommendation === 'send-intervention' && '📧 Send targeted intervention (educational content + support offer)'}
          {score.recommendation === 'escalate' && '🚨 ESCALATE: Require human care manager intervention'}
          {score.recommendation === 'auto-report' && '📄 Auto-generate compliance report and trigger payment authorization'}
        </div>
      </div>
    </div>
  );
};