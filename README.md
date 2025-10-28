# DME Therapy Adherence & Compliance Agent

A real-time CPAP (Continuous Positive Airway Pressure) therapy monitoring and compliance management system built with React and TypeScript. This application provides healthcare providers with intelligent monitoring capabilities for patient adherence to CPAP therapy, powered by Cloudera's data platform.

## 🏥 Overview

This application helps healthcare providers monitor CPAP therapy compliance for sleep apnea patients, ensuring Medicare compliance requirements are met while providing real-time insights into patient therapy effectiveness. 

This is a UI only demo with no infrastructure provisioned. Please use it as a demo to discuss use cases and art of possible.

### Key Features

- **Real-time Patient Monitoring**: Live feed of CPAP device telemetry data
- **Medicare Compliance Tracking**: Automated tracking of 30-day adherence requirements
- **AI-Powered Risk Assessment**: Machine learning models for predicting patient intervention needs
- **Automated Interventions**: Intelligent agent system for proactive patient care
- **Comprehensive Analytics**: Detailed therapy metrics and usage patterns
- **Data Validation**: Real-time validation of incoming telemetry data

## 🏗️ Architecture

The application integrates with Cloudera's data platform using the following architecture:

```
Device Cloud → NiFi → Iceberg → Flink → CAI → Kafka
```

- **Device Cloud**: CPAP device telemetry ingestion
- **NiFi**: Data flow orchestration and processing
- **Iceberg**: Data lake storage for patient context
- **Flink**: Real-time stream processing and validation
- **CAI (Cloudera AI)**: Machine learning model inference
- **Kafka**: Event streaming and logging

## 📊 Dashboard Features

### Metrics Overview
- Total patient count and status distribution
- Real-time compliance rates
- Active intervention tracking
- Escalation monitoring
- Automated report generation
- Therapy hours tracking

### Patient Management
- Live patient feed with real-time sync status
- Individual patient detailed views
- Compliance status visualization
- Intervention history tracking
- Risk assessment scores

### AI Agent Processing
The system includes an intelligent agent that processes patient data through multiple steps:
1. Telemetry ingestion via NiFi
2. Patient context querying from Iceberg
3. Stream validation with Flink
4. Medicare compliance calculation
5. ML risk prediction on Cloudera AI
6. Intervention strategy determination
7. Result logging to Kafka

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- TypeScript knowledge
- React 18+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dme-therapy-agent
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.

### Dependencies

The application uses the following key dependencies:
- **React 18**: Core framework
- **TypeScript**: Type safety
- **Lucide React**: Icon library
- **Tailwind CSS**: Styling framework

## 📋 Data Models

### CPAPPatient
Core patient data structure including:
- Patient identification and demographics
- Enrollment and program tracking
- Current usage metrics (hours, AHI scores, mask leak rates)
- Compliance tracking (30-day adherence percentages)
- Intervention history

### Key Metrics Tracked
- **Last Night Hours**: Previous night's therapy usage
- **Average Hours**: Rolling average usage
- **AHI Score**: Apnea-Hypopnea Index
- **Mask Leak Rate**: Equipment performance metric
- **30-Day Adherence**: Medicare compliance percentage
- **Compliant Nights**: Nights with ≥4 hours usage

## 🔧 Configuration

### Real-time Updates
The application simulates real-time updates with a 5-second interval for:
- Patient sync timestamps
- Therapy hours accumulation
- Status changes

### Medicare Compliance
- **Compliant**: ≥70% adherence (green status)
- **At Risk**: 50-69% adherence (yellow status)  
- **Critical**: <50% adherence (red status)
- **Minimum Usage**: 4 hours per night requirement

## 🎨 UI Components

### Core Components
- **MetricCard**: Dashboard statistics display
- **PatientCard**: Patient list item with status
- **SystemBadge**: Architecture component labels
- **ValidationPanel**: Data validation results
- **MLExplainabilityPanel**: AI model insights
- **AgentActivityLog**: Processing step tracking

### Status System
Color-coded patient status indicators:
- 🟢 **Green**: Compliant/On-track patients
- 🟡 **Yellow**: At-risk patients requiring attention  
- 🔴 **Red**: Critical patients needing immediate intervention
- 🟣 **Purple**: Special status or escalated cases

## 📈 Monitoring & Analytics

### Real-time Metrics
- Patient compliance rates
- Intervention effectiveness
- System performance indicators
- Therapy outcome trends

### Compliance Reporting
- Automated Medicare compliance documentation
- 30-day rolling adherence calculations
- Intervention outcome tracking
- Escalation pattern analysis


## 🛠️ Development

### Project Structure
```
src/
├── components/          # Reusable UI components
├── data/               # Mock data and utilities
├── types/              # TypeScript type definitions
└── App.tsx            # Main application component
```

### Adding New Features
1. Define TypeScript interfaces in `types/`
2. Create reusable components in `components/`
3. Update mock data in `data/mockData.ts`
4. Integrate with main App component

