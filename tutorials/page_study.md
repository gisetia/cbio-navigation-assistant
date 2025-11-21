# Study Page Guide
Overview of the Structure, Features, and Tools in a Study Page

The study page consists of a header followed by a main content area that displays one of four tabs: **Summary**, **Clinical Data**, **CN Segments**, and **Plots**.

## Header
The header provides key contextual information about the study as well as quick-access controls for running queries and navigating available tools. It typically includes the following components:

### 1. Study Title and Citation: 
Displays the full study name, and a download icon.

### 2. Study Description: 
Short paragraph that summarizes the key scientific aims and important usage notes It often provides information about the cohort and experimental protocols. Use this to understand the dataset’s purpose, scope, and limitations.

### 3. Navigation Tabs: 
These tabs allow switching between different data views within the study:
- Summary – Interactive charts summarizing the cohort’s clinical and genomic features. Useful for exploring aggregated patterns across the dataset.
- Clinical Data – Tables listing clinical attributes for each sample. Useful for inspecting variables at the individual sample or patient level.
- CN Segments – Genome-wide copy-number segment data for visualizing large-scale copy-number changes.
- Plots (Beta) – Customizable visualization tools (if available).

### 4. Gene Query Input: 
Enables quick navigation to interactive gene-level analysis. Genes can be directly typed or clicked in one of the study summary tables.

### 5. Selected Sample Count: 
Shows how many patients and samples are currently selected. It is updated dynamically when filtering or selecting subgroups.

### 6. Utility Icons: 
Usually includes icons for:
- Download clinical data
- Create a virtual study with selected samples
- Navigate to patient view for selected samples

### 7. Blue Action Buttons
- Custom Selection – Tool to select specific samples or patients by ID.
- Charts/Columns – Select which charts and columns are visible.
- Groups – Tool to create sample groups for downstream analysis, based on current selected samples.