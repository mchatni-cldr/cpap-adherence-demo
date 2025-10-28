// src/types/index.ts

export type PatientStatus = 'on-track' | 'at-risk' | 'critical' | 'escalated' | 'compliant';

export interface CPAPPatient {
  patientId: string;
  name: string;
  age: number;
  enrollmentDate: string;
  daysInProgram: number;
  status: PatientStatus;
  lastSync: string;
  currentUsage: {
    lastNightHours: number;
    avgHours: number;
    ahiScore: number;
    maskLeakRate: number;
  };
  compliance: {
    thirtyDayAdherence: number;
    compliantNights: number;
    totalNights: number;
  };
  mlRiskScore: number;
  interventionCount: number;
  lastIntervention?: string;
}

export interface ValidationCheck {
  name: string;
  status: 'pass' | 'warning' | 'fail';
  value?: string;
  duration: number;
}

export interface ValidationCategory {
  category: string;
  checks: ValidationCheck[];
}

export interface MLFactor {
  name: string;
  score: number;
  impact: number;
  explanation: string;
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type AgentRecommendation = 'continue-monitoring' | 'send-intervention' | 'escalate' | 'auto-report';

export interface MLScore {
  overallScore: number;
  riskLevel: RiskLevel;
  factors: MLFactor[];
  reasoning: string[];
  recommendation: AgentRecommendation;
}

export type ClouderaSystem = 'nifi' | 'kafka' | 'flink' | 'cloudera-ai' | 'iceberg';

export interface AgentAction {
  timestamp: string;
  step: string;
  thinking: string;
  result: string;
  duration: number;
  system?: ClouderaSystem;
}

export interface DemoMetrics {
  totalPatients: number;
  onTrack: number;
  activeInterventions: number;
  escalations: number;
  reportsGenerated: number;
  totalTherapyHours: number;
}