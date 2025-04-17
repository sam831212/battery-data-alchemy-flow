
# Project ToDo List

## 1. Project Setup
- [x] Initialize Repository: Set up a Git repository and establish the main branch structure.
- [x] Directory Structure: Create the folder and file skeleton based on the planned architecture.
- [x] Environment Setup: Set up a virtual environment and install initial dependencies.
- [x] Documentation Base: Create a README.md with an overview, setup instructions, and contribution guidelines.

## 2. Configuration & Dynamic Module Loading
- [x] Define YAML Configs: Create pipeline_config.yaml and database_schema.yaml.
- [x] Dynamic Loader: Implement dynamic_loader.ts to support loading modules based on YAML configuration.
- [x] Module Registration: Set up a standardized method for modules to self-register for dynamic loading.

## 3. Data Ingestion Module
- [ ] Abstract BaseIngestor: Develop base_ingestor.ts defining methods like load_data() and preprocess().
- [ ] Machine-Specific Ingestion: Implement modules (e.g., machine_type_x.ts) for each machine type.
- [ ] File Upload Integration: Develop components for CSV file upload and meta information extraction.

## 4. Experiment Analysis & Preprocessing
- [ ] Abstract Experiment Class: Create base_experiment.ts for experiment-specific calculations.
- [ ] Analysis Modules: Implement specific analysis modules (e.g., experiment_type_A.ts) incorporating calculations such as C-rate, SOC ranges, and timestamp adjustments.
- [ ] Preprocessing Logic: Develop preprocessing routines to filter, extract, and compute required fields from detail files.

## 5. Data Transformation & Validation
- [ ] Transformation Module: Implement data_transformer.ts to map and reformat data based on the target schema.
- [ ] Validation Module: Develop data_validator.ts using zod to enforce schema integrity and validation rules.
- [ ] Error Handling: Ensure proper error messages and logging for data discrepancies during transformation and validation.

## 6. Data Persistence Module
- [ ] Abstract BasePersistor: Define the persistence interface in base_persistor.ts.
- [ ] Database Implementation: Develop database_persistor.ts for actual persistence.
- [ ] Traceability: Ensure that traceability is maintained between step and detail records in the database.

## 7. Filtering & Query Functionality
- [ ] Filter Design: Define filtering criteria (e.g., date range, voltage/current/SOC/Temperature ranges, C-rate, step types).
- [ ] Query Module: Develop functionality to support querying from the database and integrate it into the UI.
- [ ] Test Filtering: Create tests to verify accuracy and reliability of query results.

## 8. User Interface
- [ ] Main App Layout: Develop the primary app layout, including file upload and configuration sections.
- [ ] Data Preview & Controls: Implement sections to display processed data, validation results, and control buttons to trigger ETL processing.
- [ ] Visualization Components: Create interactive visualization modules for plots and data previews.
- [ ] Export & Reporting: Add functionality for CSV export and auto-generated PDF reports.

## 9. Advanced Analysis & Automation
- [ ] Analytics Module: Develop features for advanced analysis (rate capability extraction, degradation trends, anomaly detection, OCV generation).
- [ ] Tagging & ML: Set up initial rules or ML-based algorithms for step tagging and outlier suggestion.
- [ ] Report Generation: Implement auto-generation of PDF reports based on visualization outputs and summary statistics.

## 10. Testing & Quality Assurance
- [ ] Unit Tests: Develop unit tests for each module (ingestion, transformation, validation, persistence).
- [ ] Integration Tests: Implement integration tests to ensure seamless data flow between pipeline stages.
- [ ] Continuous Integration: Configure CI/CD pipelines for automated testing and deployment.

## 11. Future Enhancements (Optional)
- [ ] API Integration: Plan for REST API endpoints to expose data queries and operations.
- [ ] Advanced UI Framework: Evaluate the potential migration to a more advanced front-end framework.
- [ ] Authentication: Consider implementing an authentication system for advanced user access control.
