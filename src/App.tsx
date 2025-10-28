// src/App.tsx

import React, { useState, useEffect } from 'react';
import { Activity, Clock, TrendingUp, Users, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { CPAPPatient } from './types';
import { generatePatients, getValidations, getMLScore, getAgentSteps } from './data/mockData';
import {
  MetricCard,
  PatientCard,
  SystemBadge,
  ValidationPanel,
  MLExplainabilityPanel,
  AgentActivityLog
} from './components';

function App() {
  const [patients, setPatients] = useState<CPAPPatient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<CPAPPatient | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [metrics, setMetrics] = useState({
    totalPatients: 10,
    onTrack: 6,
    activeInterventions: 4,
    escalations: 1,
    reportsGenerated: 1,
    totalTherapyHours: 47.3
  });

  useEffect(() => {
    const initialPatients = generatePatients();
    setPatients(initialPatients);
    setSelectedPatient(initialPatients[0]);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setPatients(prev => {
        const updated = [...prev];
        const randomIdx = Math.floor(Math.random() * updated.length);
        updated[randomIdx] = {
          ...updated[randomIdx],
          lastSync: new Date().toLocaleString('en-US', { 
            month: '2-digit', 
            day: '2-digit', 
            year: 'numeric',
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          })
        };
        return updated;
      });

      setMetrics(prev => ({
        ...prev,
        totalTherapyHours: parseFloat((prev.totalTherapyHours + Math.random() * 0.5).toFixed(1))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePatientSelect = async (patient: CPAPPatient) => {
    // Start processing
    setIsProcessing(true);
    setProcessingStep(0);
    setSelectedPatient(null);

    // Simulate agent processing steps with delays
    const steps = getAgentSteps(patient);
    
    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(i + 1);
      // Use the actual duration from each step (convert ms to realistic delay)
      await new Promise(resolve => setTimeout(resolve, steps[i].duration * 3)); // 3x for visibility
    }

    // Processing complete - show results
    setSelectedPatient(patient);
    setIsProcessing(false);
    setProcessingStep(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-3xl font-bold mb-2">DME Therapy Adherence & Compliance Agent</h1>
              <p className="text-blue-100">Real-time CPAP adherence monitoring</p>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
              <span className="text-sm font-semibold">Powered by</span>
              <span className="text-lg font-bold">Cloudera</span>
            </div>
          </div>
          
          {/* Architecture Flow */}
          <div className="mt-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <div className="text-xs text-blue-100 mb-3 font-semibold text-center">AGENT PROCESSING ARCHITECTURE</div>
            <div className="flex justify-center items-center gap-2 flex-wrap text-sm">
              <SystemBadge name="Device Cloud" />
              <span className="text-white text-xl">→</span>
              <SystemBadge name="NiFi" />
              <span className="text-white text-xl">→</span>
              <SystemBadge name="Iceberg" />
              <span className="text-white text-xl">→</span>
              <SystemBadge name="Flink" />
              <span className="text-white text-xl">→</span>
              <SystemBadge name="CAI" />
              <span className="text-white text-xl">→</span>
              <SystemBadge name="Kafka" />
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <MetricCard 
            label="Total Patients" 
            value={metrics.totalPatients} 
            icon={Users}
            color="blue"
          />
          <MetricCard 
            label="On Track" 
            value={metrics.onTrack} 
            icon={CheckCircle}
            color="green"
            trend={`${((metrics.onTrack/metrics.totalPatients)*100).toFixed(0)}% compliant`}
          />
          <MetricCard 
            label="Active Interventions" 
            value={metrics.activeInterventions} 
            icon={Activity}
            color="yellow"
          />
          <MetricCard 
            label="Escalations" 
            value={metrics.escalations} 
            icon={AlertTriangle}
            color="red"
          />
          <MetricCard 
            label="Reports Generated" 
            value={metrics.reportsGenerated} 
            icon={CheckCircle}
            color="purple"
            trend="Auto-compliance docs"
          />
          <MetricCard 
            label="Therapy Hours" 
            value={metrics.totalTherapyHours} 
            icon={TrendingUp}
            color="cyan"
            trend="Last 24 hours"
          />
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Patient Feed */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold mb-4 text-gray-900">Patient Monitor (Live Feed)</h2>
              <div className="text-xs text-gray-500 mb-3 bg-blue-50 p-2 rounded">
                📡 Real-time sync from CPAP devices cloud              </div>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {patients.map(patient => (
                  <PatientCard
                    key={patient.patientId}
                    patient={patient}
                    onClick={() => handlePatientSelect(patient)}
                    isActive={selectedPatient?.patientId === patient.patientId}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Patient Details or Processing State */}
          <div className="lg:col-span-2 space-y-4">
            {isProcessing && (
              <div className="bg-white p-8 rounded-lg border-2 border-gray-200 shadow-sm">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="animate-spin text-blue-600" size={48} />
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Agent Processing Patient Data</h3>
                    <p className="text-gray-600 mb-4">Analyzing telemetry and calculating risk assessment...</p>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="text-sm font-semibold text-blue-900">
                        Step {processingStep} of 7
                      </div>
                      <div className="text-xs text-blue-700 mt-1">
                        {processingStep === 1 && "Ingesting CPAP telemetry via NiFi..."}
                        {processingStep === 2 && "Querying patient context from Iceberg data lake..."}
                        {processingStep === 3 && "Running stream validation with Flink..."}
                        {processingStep === 4 && "Calculating Medicare compliance status..."}
                        {processingStep === 5 && "Running ML risk prediction model on Cloudera AI..."}
                        {processingStep === 6 && "Determining intervention strategy with Cloudera AI..."}
                        {processingStep === 7 && "Logging results to Kafka..."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!isProcessing && selectedPatient && (
              <>
                {/* Patient Details */}
                <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                      <p className="text-gray-600">{selectedPatient.patientId} • Age {selectedPatient.age}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-lg font-bold ${
                      selectedPatient.status === 'on-track' || selectedPatient.status === 'compliant' ? 'bg-green-100 text-green-800' :
                      selectedPatient.status === 'at-risk' ? 'bg-yellow-100 text-yellow-800' :
                      selectedPatient.status === 'critical' ? 'bg-red-100 text-red-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {selectedPatient.status.toUpperCase().replace('-', ' ')}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-gray-600 text-sm">Enrolled</span>
                      <div className="font-semibold">{selectedPatient.enrollmentDate}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Program Day</span>
                      <div className="font-semibold">{selectedPatient.daysInProgram}/90</div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Last Sync</span>
                      <div className="font-semibold text-sm">{selectedPatient.lastSync}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Interventions</span>
                      <div className="font-semibold">{selectedPatient.interventionCount}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                    <div>
                      <span className="text-gray-600 text-xs">Last Night</span>
                      <div className="font-bold text-xl text-blue-600">{selectedPatient.currentUsage.lastNightHours}h</div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-xs">Avg Usage</span>
                      <div className="font-bold text-xl text-blue-600">{selectedPatient.currentUsage.avgHours}h</div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-xs">AHI Score</span>
                      <div className="font-bold text-xl text-blue-600">{selectedPatient.currentUsage.ahiScore}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-xs">Mask Leak</span>
                      <div className="font-bold text-xl text-blue-600">{selectedPatient.currentUsage.maskLeakRate} L/min</div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Medicare Compliance Status</div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>30-Day Adherence</span>
                          <span className="font-semibold">{selectedPatient.compliance.thirtyDayAdherence}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all ${
                              selectedPatient.compliance.thirtyDayAdherence >= 70 ? 'bg-green-500' :
                              selectedPatient.compliance.thirtyDayAdherence >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedPatient.compliance.thirtyDayAdherence}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {selectedPatient.compliance.compliantNights} of {Math.min(selectedPatient.compliance.totalNights, 30)} nights ≥4 hours
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedPatient.lastIntervention && (
                    <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="text-xs font-semibold text-purple-900">Last Intervention</div>
                      <div className="text-sm text-purple-800">{selectedPatient.lastIntervention}</div>
                    </div>
                  )}
                </div>

                {/* Agent Activity Log */}
                <AgentActivityLog actions={getAgentSteps(selectedPatient)} />

                {/* Validation Results */}
                <ValidationPanel validations={getValidations(selectedPatient)} />

                {/* ML Explainability */}
                <MLExplainabilityPanel score={getMLScore(selectedPatient)} />
              </>
            )}

            {!isProcessing && !selectedPatient && (
              <div className="bg-white p-8 rounded-lg border-2 border-gray-200 shadow-sm text-center">
                <Activity className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Select a Patient</h3>
                <p className="text-gray-600">Choose a patient from the left panel to view their therapy details and agent analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;