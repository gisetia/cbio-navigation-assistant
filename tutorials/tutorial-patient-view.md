# Tutorial: Patient View

This tutorial is a guide for investigating individual patients and their samples in detail within the cBioPortal website.

---
Tutorial Objectives and Tabs Overview

The tutorial covers:

* Showing different ways to access the **Patient View**.

* Walking through the available tabs in Patient View.

* Highlighting the different types of information available across various studies.

The possible tabs in Patient View are:

* **Summary**: Basic patient and sample details, genomic overview, and lists of alterations.

* **Genomic Evolution**: Available for patients with two or more samples, visualizing how mutations change over time or across samples.

* **Pathways**: Alterations viewed in the context of TCGA-defined pathways.

* **Clinical Data**: Detailed patient-level and sample-level clinical information in table format.

* **Pathology Report**: (Only for TCGA studies) The original de-identified pathology report.

* **Tissue Image**: (Only for TCGA studies) Integrates the Cancer Digital Slide Archive for a zoomable image of the tissue.

---
Routes to Patient View

1.  **Direct Link:** Anywhere a **patient ID** or **sample ID** is displayed (e.g., in the Mutation table, on the OncoPrint visualization), that ID is a link directly to the Patient View for that case.

2.  **From Study View:**

    * Filter the study to a **subset of patients** of interest (using charts or tables on the Study Summary page).

    * Click the "**View selected cases**" button (often represented by an icon of a person) to see all selected patients in a Patient View session.

---
Patient View: Tab Details

### 1. Summary Tab

* **Basic Details:** Shows patient information (age, sex, disease, survival status) and basic sample info.

* **Genomic Overview:** Displays a figure showing where called CNA and mutations are across the entire genome.

* **Mutation Lists:** Lists all called mutations, structural variants, and Copy Number Alterations (CNAs - amplifications/deep deletions only) for the patient's sample(s).

* **Allele Frequency Histogram:** For multi-sample studies, hovering over the mutation count displays a histogram showing the **variant allele frequency** in each tumor sample.

* **Patient Timeline (for multi-sample studies):** For studies with extensive clinical data and multiple samples, a timeline shows surgeries, treatment, and radiographic progression.

### 2. Genomic Evolution Tab

* **Availability:** Only present for patients with **two or more samples**.

* **Purpose:** Provides visualizations to examine how **mutation allele frequencies** (VAF) vary among samples and change over time.

* **Line Chart:** Each dot is the VAF of a mutation in a sample. Lines connect mutations detected in multiple samples. This chart is linked to the mutation table below.

* **Heatmap:** Colors each box based on the **VAF** of a mutation in a sample. You can cluster or transpose the data.

* **Timeline Integration:** The patient timeline from the Summary tab can also be displayed here to put allele frequency changes in context.

### 3. Pathways Tab

* **Exploration:** Allows exploration of the patient's alterations in the context of **frequently altered pathways** defined by TCGA (e.g., TP53, RTK-RAS).

### 4. Clinical Data Tab

* **Information:** Presents all available **patient-level** and **sample-level** clinical information in separate tables.

* **Multi-Sample View:** Patients with multiple samples will show multiple columns in the sample-level table, enabling side-by-side comparison of sample-specific attributes (like mutation count, TMB, histologic grade, and 1p/19q status).

### 5. Pathology Report Tab

* **Availability:** Only available for **TCGA studies**.

* **Content:** Displays the original, de-identified surgical pathology report.

### 6. Tissue Image Tab

* **Availability:** Only available for **TCGA studies**.

* **Content:** Integrates the **Cancer Digital Slide Archive** to provide a zoomable image of the tissue slide.

---
Example Insight: Inferring Clonality

Patient View can be used to infer the **clonality** of mutations, especially in the absence of copy number changes. By comparing the **Variant Allele Frequencies (VAFs)** of two or more mutations in the same sample:

* If mutations (e.g., KRAS and NRAS) are typically mutually exclusive but are both present in a single sample, and their VAFs are **similar but lower** than a common clonal mutation (e.g., PIK3CA), it suggests the KRAS and NRAS alterations are likely present in **two distinct subclones** of the tumor, rather than co-occurring in the same cells.