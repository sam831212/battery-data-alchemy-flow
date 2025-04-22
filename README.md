
# Battery Data Alchemy

A comprehensive data processing and analysis platform for battery testing data, built with TypeScript frontend and Python backend.

## Overview

Battery Data Alchemy is an end-to-end ETL (Extract, Transform, Load) pipeline specifically designed for battery testing data. It processes raw test data from various battery testing machines, standardizes the format, performs analysis, and stores it in a structured database for further analysis and visualization.

## Tech Stack

### Frontend (TypeScript)
- React with TypeScript for UI components
- Tailwind CSS for styling
- Shadcn/ui for component library
- Zod for data validation
- React Query for state management
- Recharts for data visualization

### Backend (Python)
- Data processing and ETL pipeline modules
- Dynamic module loading system
- Experiment analysis framework
- Data validation and transformation utilities

## Project Architecture

```
battery-data-alchemy/
├── frontend/              # TypeScript React Application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── core/         # Core functionality
│   │   │   ├── validators/     # Data validation
│   │   │   ├── transformers/   # Data transformation
│   │   │   └── experiments/    # Experiment analysis
│   │   ├── pages/        # Application pages
│   │   └── utils/        # Utility functions
│   └── public/           # Static assets
│
├── backend/              # Python Backend
│   ├── data_ingestion/   # Data ingestion modules
│   ├── experiment/       # Experiment analysis
│   ├── transformation/   # Data transformation
│   └── utils/           # Utility functions
│
├── config/              # Configuration files
├── tests/              # Test suites
└── docs/              # Documentation
```

## Key Features

- **Data Validation**: Comprehensive validation using Zod schemas
- **Dynamic Module Loading**: Extensible architecture for adding new machine types
- **Experiment Analysis**: Modular framework for different experiment types
- **Interactive UI**: React-based interface with real-time data visualization
- **Pipeline Configuration**: YAML-based pipeline configuration
- **Type Safety**: Full TypeScript support for frontend codebase

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- Virtual environment tool (venv, conda)
- Git

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Create and activate virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the backend server:
   ```bash
   python src/main.py
   ```

## Development Progress

### Completed Features ✅
- Project structure and architecture
- Data validation module using Zod
- Dynamic module loading system
- Basic experiment analysis framework
- UI components and layout

### In Progress 🚧
- Data transformation pipeline
- Database integration
- Advanced analysis features
- Documentation

### Upcoming Features 📋
- Authentication system
- Advanced visualization tools
- Machine learning integration
- API documentation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to all contributors who have invested their time in contributing to this project
- Special thanks to the battery research community for providing insights into data analysis requirements

