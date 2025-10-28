// src/data/mockData.ts

import { CPAPPatient, ValidationCategory, MLScore, AgentAction } from '../types';

/**
 * Generate 10 CPAP patients with different risk profiles
 */
export const generatePatients = (): CPAPPatient[] => {
  return [
    {
      patientId: 'PT-001',
      name: 'John Martinez',
      age: 52,
      enrollmentDate: '2025-10-01',
      daysInProgram: 8,
      status: 'on-track',
      lastSync: '2025-10-09 06:23 AM',
      currentUsage: { lastNightHours: 6.8, avgHours: 6.5, ahiScore: 2.1, maskLeakRate: 4 },
      compliance: { thirtyDayAdherence: 100, compliantNights: 8, totalNights: 8 },
      mlRiskScore: 12,
      interventionCount: 1
    },
    {
      patientId: 'PT-002',
      name: 'Sarah Chen',
      age: 45,
      enrollmentDate: '2025-09-24',
      daysInProgram: 15,
      status: 'on-track',
      lastSync: '2025-10-09 06:45 AM',
      currentUsage: { lastNightHours: 6.2, avgHours: 5.8, ahiScore: 3.2, maskLeakRate: 6 },
      compliance: { thirtyDayAdherence: 87, compliantNights: 13, totalNights: 15 },
      mlRiskScore: 18,
      interventionCount: 2,
      lastIntervention: 'Positive reinforcement sent'
    },
    {
      patientId: 'PT-003',
      name: 'Michael Brown',
      age: 58,
      enrollmentDate: '2025-10-04',
      daysInProgram: 5,
      status: 'at-risk',
      lastSync: '2025-10-09 06:12 AM',
      currentUsage: { lastNightHours: 2.1, avgHours: 2.8, ahiScore: 5.8, maskLeakRate: 22 },
      compliance: { thirtyDayAdherence: 40, compliantNights: 2, totalNights: 5 },
      mlRiskScore: 58,
      interventionCount: 3,
      lastIntervention: 'Mask fit video sent'
    },
    {
      patientId: 'PT-004',
      name: 'Lisa Johnson',
      age: 61,
      enrollmentDate: '2025-09-17',
      daysInProgram: 22,
      status: 'at-risk',
      lastSync: '2025-10-09 05:58 AM',
      currentUsage: { lastNightHours: 3.5, avgHours: 4.1, ahiScore: 4.2, maskLeakRate: 11 },
      compliance: { thirtyDayAdherence: 64, compliantNights: 14, totalNights: 22 },
      mlRiskScore: 47,
      interventionCount: 5,
      lastIntervention: 'Follow-up call scheduled'
    },
    {
      patientId: 'PT-005',
      name: 'David Kim',
      age: 49,
      enrollmentDate: '2025-08-25',
      daysInProgram: 45,
      status: 'on-track',
      lastSync: '2025-10-09 06:35 AM',
      currentUsage: { lastNightHours: 5.5, avgHours: 5.9, ahiScore: 2.8, maskLeakRate: 7 },
      compliance: { thirtyDayAdherence: 83, compliantNights: 25, totalNights: 30 },
      mlRiskScore: 22,
      interventionCount: 3
    },
    {
      patientId: 'PT-006',
      name: 'Maria Garcia',
      age: 55,
      enrollmentDate: '2025-09-27',
      daysInProgram: 12,
      status: 'critical',
      lastSync: '2025-10-09 06:08 AM',
      currentUsage: { lastNightHours: 1.8, avgHours: 2.2, ahiScore: 7.1, maskLeakRate: 28 },
      compliance: { thirtyDayAdherence: 33, compliantNights: 4, totalNights: 12 },
      mlRiskScore: 76,
      interventionCount: 6,
      lastIntervention: 'RT telehealth call conducted'
    },
    {
      patientId: 'PT-007',
      name: 'Robert Taylor',
      age: 47,
      enrollmentDate: '2025-10-06',
      daysInProgram: 3,
      status: 'on-track',
      lastSync: '2025-10-09 06:52 AM',
      currentUsage: { lastNightHours: 4.5, avgHours: 4.2, ahiScore: 4.5, maskLeakRate: 9 },
      compliance: { thirtyDayAdherence: 67, compliantNights: 2, totalNights: 3 },
      mlRiskScore: 35,
      interventionCount: 1
    },
    {
      patientId: 'PT-008',
      name: 'Jennifer Lee',
      age: 53,
      enrollmentDate: '2025-08-03',
      daysInProgram: 67,
      status: 'on-track',
      lastSync: '2025-10-09 06:18 AM',
      currentUsage: { lastNightHours: 6.1, avgHours: 6.3, ahiScore: 2.4, maskLeakRate: 5 },
      compliance: { thirtyDayAdherence: 90, compliantNights: 27, totalNights: 30 },
      mlRiskScore: 9,
      interventionCount: 2
    },
    {
      patientId: 'PT-009',
      name: 'James Wilson',
      age: 59,
      enrollmentDate: '2025-09-09',
      daysInProgram: 30,
      status: 'escalated',
      lastSync: '2025-10-09 05:45 AM',
      currentUsage: { lastNightHours: 1.3, avgHours: 1.8, ahiScore: 8.2, maskLeakRate: 18 },
      compliance: { thirtyDayAdherence: 27, compliantNights: 8, totalNights: 30 },
      mlRiskScore: 89,
      interventionCount: 9,
      lastIntervention: 'ESCALATED to care manager'
    },
    {
      patientId: 'PT-010',
      name: 'Amanda Davis',
      age: 50,
      enrollmentDate: '2025-07-13',
      daysInProgram: 88,
      status: 'compliant',
      lastSync: '2025-10-09 06:28 AM',
      currentUsage: { lastNightHours: 5.8, avgHours: 6.1, ahiScore: 2.6, maskLeakRate: 6 },
      compliance: { thirtyDayAdherence: 93, compliantNights: 28, totalNights: 30 },
      mlRiskScore: 7,
      interventionCount: 2,
      lastIntervention: 'Compliance report generated'
    }
  ];
};

/**
 * Get validation results based on patient status
 */
export const getValidations = (patient: CPAPPatient): ValidationCategory[] => {
  if (patient.status === 'on-track' || patient.status === 'compliant') {
    return [
      {
        category: 'Therapy Effectiveness',
        checks: [
          { name: 'Usage Hours (>4hrs/night)', status: 'pass', value: `${patient.currentUsage.lastNightHours} hrs`, duration: 23 },
          { name: 'AHI Score (<5 events/hr)', status: 'pass', value: `${patient.currentUsage.ahiScore}`, duration: 18 },
          { name: 'Mask Seal Quality (<24 L/min)', status: 'pass', value: `${patient.currentUsage.maskLeakRate} L/min`, duration: 15 }
        ]
      },
      {
        category: 'Compliance Tracking',
        checks: [
          { name: 'Medicare Threshold (70% of 30 days)', status: patient.compliance.thirtyDayAdherence >= 70 ? 'pass' : 'warning', value: `${patient.compliance.thirtyDayAdherence}%`, duration: 31 },
          { name: 'Consistent Usage Pattern', status: 'pass', duration: 27 },
          { name: 'Data Sync Status', status: 'pass', value: 'Connected', duration: 12 }
        ]
      },
      {
        category: 'Patient Engagement',
        checks: [
          { name: 'Mobile App Activity', status: 'pass', value: 'Active', duration: 19 },
          { name: 'Response to Messages', status: 'pass', value: '100%', duration: 14 },
          { name: 'Educational Content Viewed', status: 'pass', value: '3 videos', duration: 22 }
        ]
      }
    ];
  } else if (patient.status === 'at-risk') {
    return [
      {
        category: 'Therapy Effectiveness',
        checks: [
          { name: 'Usage Hours (>4hrs/night)', status: patient.currentUsage.lastNightHours >= 4 ? 'pass' : 'warning', value: `${patient.currentUsage.lastNightHours} hrs`, duration: 23 },
          { name: 'AHI Score (<5 events/hr)', status: patient.currentUsage.ahiScore < 5 ? 'pass' : 'warning', value: `${patient.currentUsage.ahiScore}`, duration: 18 },
          { name: 'Mask Seal Quality (<24 L/min)', status: patient.currentUsage.maskLeakRate < 24 ? 'pass' : 'fail', value: `${patient.currentUsage.maskLeakRate} L/min`, duration: 15 }
        ]
      },
      {
        category: 'Compliance Tracking',
        checks: [
          { name: 'Medicare Threshold (70% of 30 days)', status: 'warning', value: `${patient.compliance.thirtyDayAdherence}%`, duration: 31 },
          { name: 'Consistent Usage Pattern', status: 'warning', value: 'Irregular', duration: 27 },
          { name: 'Data Sync Status', status: 'pass', value: 'Connected', duration: 12 }
        ]
      },
      {
        category: 'Patient Engagement',
        checks: [
          { name: 'Mobile App Activity', status: 'warning', value: 'Sporadic', duration: 19 },
          { name: 'Response to Messages', status: 'warning', value: '67%', duration: 14 },
          { name: 'Educational Content Viewed', status: 'pass', value: '2 videos', duration: 22 }
        ]
      }
    ];
  } else {
    return [
      {
        category: 'Therapy Effectiveness',
        checks: [
          { name: 'Usage Hours (>4hrs/night)', status: 'fail', value: `${patient.currentUsage.lastNightHours} hrs`, duration: 23 },
          { name: 'AHI Score (<5 events/hr)', status: 'fail', value: `${patient.currentUsage.ahiScore}`, duration: 18 },
          { name: 'Mask Seal Quality (<24 L/min)', status: 'fail', value: `${patient.currentUsage.maskLeakRate} L/min`, duration: 15 }
        ]
      },
      {
        category: 'Compliance Tracking',
        checks: [
          { name: 'Medicare Threshold (70% of 30 days)', status: 'fail', value: `${patient.compliance.thirtyDayAdherence}%`, duration: 31 },
          { name: 'Consistent Usage Pattern', status: 'fail', value: 'Non-compliant', duration: 27 },
          { name: 'Data Sync Status', status: 'pass', value: 'Connected', duration: 12 }
        ]
      },
      {
        category: 'Patient Engagement',
        checks: [
          { name: 'Mobile App Activity', status: 'fail', value: 'None', duration: 19 },
          { name: 'Response to Messages', status: 'fail', value: '0%', duration: 14 },
          { name: 'Educational Content Viewed', status: 'fail', value: 'None', duration: 22 }
        ]
      }
    ];
  }
};

/**
 * Get ML risk score based on patient status
 */
export const getMLScore = (patient: CPAPPatient): MLScore => {
  if (patient.mlRiskScore <= 25) {
    return {
      overallScore: patient.mlRiskScore,
      riskLevel: 'low',
      factors: [
        { name: 'First Week Usage Pattern', score: 8, impact: 0.35, explanation: 'Strong early adoption indicates high likelihood of long-term compliance' },
        { name: 'Mask Seal Consistency', score: 5, impact: 0.20, explanation: 'Minimal leak rates show good mask fit and comfort' },
        { name: 'Therapy Response', score: 4, impact: 0.25, explanation: 'AHI reduction demonstrates effective therapy' },
        { name: 'Intervention Response', score: 3, impact: 0.20, explanation: 'Patient engaged positively with educational content' }
      ],
      reasoning: [
        'Patient demonstrates excellent adherence patterns consistent with successful long-term users',
        'Early intervention strategy working well - positive reinforcement maintaining motivation',
        'Historical cohort analysis shows 94% probability of 90-day compliance'
      ],
      recommendation: 'continue-monitoring'
    };
  } else if (patient.mlRiskScore <= 50) {
    return {
      overallScore: patient.mlRiskScore,
      riskLevel: 'medium',
      factors: [
        { name: 'First Week Usage Pattern', score: 42, impact: 0.35, explanation: 'Below-threshold usage in early days is strongest predictor of abandonment' },
        { name: 'Mask Seal Consistency', score: 38, impact: 0.20, explanation: 'High leak rates indicate poor mask fit causing discomfort' },
        { name: 'Therapy Response', score: 28, impact: 0.25, explanation: 'Elevated AHI suggests therapy not yet optimized' },
        { name: 'Intervention Response', score: 22, impact: 0.20, explanation: 'Moderate engagement with support resources' }
      ],
      reasoning: [
        'Usage pattern matches early abandonment risk profile from historical data',
        'Mask discomfort is addressable - similar patients improved after equipment adjustment',
        'Window of opportunity exists - proactive intervention can prevent escalation'
      ],
      recommendation: 'send-intervention'
    };
  } else if (patient.mlRiskScore <= 75) {
    return {
      overallScore: patient.mlRiskScore,
      riskLevel: 'high',
      factors: [
        { name: 'First Week Usage Pattern', score: 72, impact: 0.35, explanation: 'Severe early non-compliance pattern - critical intervention window closing' },
        { name: 'Mask Seal Consistency', score: 68, impact: 0.20, explanation: 'Persistent mask seal issues indicate fundamental equipment problem' },
        { name: 'Therapy Response', score: 55, impact: 0.25, explanation: 'Uncontrolled AHI - patient not experiencing therapy benefits' },
        { name: 'Intervention Response', score: 48, impact: 0.20, explanation: 'Limited engagement despite multiple outreach attempts' }
      ],
      reasoning: [
        'Patient trajectory matches high-risk abandonment profile with 78% probability of therapy discontinuation',
        'Technical issues (mask fit) combined with lack of perceived benefit creating compound barriers',
        'Automated interventions insufficient - requires human clinical expertise'
      ],
      recommendation: 'escalate'
    };
  } else {
    return {
      overallScore: patient.mlRiskScore,
      riskLevel: 'critical',
      factors: [
        { name: 'First Week Usage Pattern', score: 88, impact: 0.35, explanation: 'Extreme non-adherence - virtually no therapeutic usage recorded' },
        { name: 'Mask Seal Consistency', score: 82, impact: 0.20, explanation: 'Equipment failure or severe patient intolerance' },
        { name: 'Therapy Response', score: 79, impact: 0.25, explanation: 'No AHI improvement - patient health deteriorating without intervention' },
        { name: 'Intervention Response', score: 85, impact: 0.20, explanation: 'No response to any automated outreach - potential patient disengagement' }
      ],
      reasoning: [
        'CRITICAL: Patient has effectively abandoned therapy despite multiple interventions',
        'Health risk imminent - untreated sleep apnea increases stroke/cardiac event risk by 400%',
        'Immediate care manager intervention required to prevent therapy failure and adverse outcomes'
      ],
      recommendation: 'escalate'
    };
  }
};

/**
 * Get agent processing steps based on patient status
 */
export const getAgentSteps = (patient: CPAPPatient): AgentAction[] => {
  const baseSteps: AgentAction[] = [
    {
      timestamp: new Date().toISOString(),
      step: '1. Ingest CPAP Telemetry',
      thinking: `Received overnight usage data from ResMed AirView cloud platform (Device ID: ${patient.patientId.replace('PT-', 'RSM-')}) via Cloudera NiFi API integration`,
      result: `${patient.currentUsage.lastNightHours} hours usage, AHI ${patient.currentUsage.ahiScore}, mask leak ${patient.currentUsage.maskLeakRate} L/min`,
      duration: 125,
      system: 'nifi'
    },
    {
      timestamp: new Date().toISOString(),
      step: '2. Query Patient Context from Iceberg',
      thinking: `Retrieving comprehensive patient history from dme_therapy.patients Iceberg table - enrollment date, comorbidities, prior authorization details, intervention history`,
      result: `Patient enrolled ${patient.daysInProgram} days ago, ${patient.interventionCount} prior interventions, hypertension + diabetes comorbidities identified`,
      duration: 187,
      system: 'iceberg'
    },
    {
      timestamp: new Date().toISOString(),
      step: '3. Stream Processing & Validation',
      thinking: 'Apache Flink validates therapy effectiveness metrics against clinical thresholds and Medicare compliance requirements',
      result: patient.status === 'on-track' || patient.status === 'compliant' 
        ? 'All therapy metrics within acceptable ranges, compliance tracking on target'
        : patient.status === 'at-risk'
        ? 'Usage below threshold detected, mask seal quality degraded'
        : 'Critical non-compliance detected - multiple therapy failures',
      duration: 87,
      system: 'flink'
    },
    {
      timestamp: new Date().toISOString(),
      step: '4. Calculate Compliance Status',
      thinking: 'Evaluating 30-day rolling adherence against Medicare requirement: ≥4 hours/night for 70% of nights',
      result: `${patient.compliance.compliantNights} of ${Math.min(patient.compliance.totalNights, 30)} nights meet criteria (${patient.compliance.thirtyDayAdherence}%)`,
      duration: 62,
      system: 'flink'
    },
    {
      timestamp: new Date().toISOString(),
      step: '5. ML Risk Assessment',
      thinking: `Querying Cloudera AI abandonment prediction model (trained on 50K+ patient outcomes from Iceberg feature store) - analyzing usage patterns, comorbidity impact, intervention response history`,
      result: `Risk Score: ${patient.mlRiskScore} (${getMLScore(patient).riskLevel.toUpperCase()}) - ${patient.mlRiskScore > 75 ? 'Critical abandonment risk' : patient.mlRiskScore > 50 ? 'Moderate risk, intervention needed' : patient.mlRiskScore > 25 ? 'Low-moderate risk' : 'Low risk, on track'}`,
      duration: 234,
      system: 'cloudera-ai'
    }
  ];

  if (patient.status === 'compliant' && patient.daysInProgram >= 88) {
    baseSteps.push({
      timestamp: new Date().toISOString(),
      step: '6. Auto-Generate Compliance Report',
      thinking: '90-day compliance threshold achieved - autonomously generating Medicare documentation and triggering continued payment authorization',
      result: 'Compliance report generated, transmitted to DME provider, payment authorization logged in Healthfirst claims system',
      duration: 156,
      system: 'cloudera-ml'
    });
  } else if (patient.status === 'escalated' || patient.mlRiskScore > 75) {
    baseSteps.push({
      timestamp: new Date().toISOString(),
      step: '6. ESCALATE TO CARE MANAGER',
      thinking: `Agent autonomously determined human intervention required - patient non-responsive to ${patient.interventionCount} automated interventions, therapy failure imminent`,
      result: `Case escalated with full context package: usage history, intervention timeline, recommended action = urgent care manager outreach + equipment assessment`,
      duration: 203,
      system: 'cloudera-ml'
    });
  } else if (patient.status === 'at-risk' || patient.status === 'critical') {
    baseSteps.push({
      timestamp: new Date().toISOString(),
      step: '6. Determine Intervention Strategy',
      thinking: `Agent selecting personalized intervention from therapy optimization playbook based on risk factors and prior response patterns`,
      result: patient.currentUsage.maskLeakRate > 20 
        ? 'Send targeted SMS: Mask adjustment video + option to schedule respiratory therapist telehealth call'
        : patient.currentUsage.lastNightHours < 3
        ? 'Send empathetic SMS: "We noticed short usage - is the mask uncomfortable?" + comfort tips link'
        : 'Send motivational message: Benefits of consistent therapy + progress tracking',
      duration: 156,
      system: 'cloudera-ml'
    });
  } else {
    baseSteps.push({
      timestamp: new Date().toISOString(),
      step: '6. Positive Reinforcement',
      thinking: 'Patient on track - agent sending encouragement to maintain motivation and compliance',
      result: `SMS sent: "Great job! You've used your CPAP ${patient.compliance.compliantNights} compliant nights. This is making a real difference in your heart health!"`,
      duration: 156,
      system: 'cloudera-ml'
    });
  }

  baseSteps.push({
    timestamp: new Date().toISOString(),
    step: '7. Log & Update Timeline',
    thinking: 'Recording agent action in patient journey timeline, updating compliance tracker, scheduling next evaluation cycle',
    result: `Event logged to Kafka, patient record updated in Iceberg, next data sync in 24 hours`,
    duration: 45,
    system: 'kafka'
  });

  return baseSteps;
};