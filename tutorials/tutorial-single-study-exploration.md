# Tutorial: Single Study Exploration

This document is a guide for navigating and exploring data in a single study within the cBioPortal website.

---
Tutorial Objectives

The tutorial covers the following key points:

* Introducing the **cBioPortal main page**.

* Showing two ways to **select a study**: from the **Query box** on the main page or from the **Data Sets page**.

* Walking through the four possible tabs in the study view: **Study Summary**, **Clinical Data**, **Heatmaps**, and **CN Segments**.

* Showing how to **run a query** from the study view.

---
Study Selection Methods

1. From the Query Box on the Main Page

* Filter the list of studies (optional).

* Select the checkbox next to the study of interest.

* Click "**Explore Selected Studies**" or click the "**View study summary**" button.

2. From the Data Sets Page

* Use the **search functionality** to find datasets of interest.

* Alternatively, sort the table by the number of samples with each data type.

---
Study View Tabs and Functionality

Once a study is selected, you land on the **Study Summary Tab**.

1. Study Summary Tab

* Purpose: Provides an **interactive overview** for exploration, allowing you to explore features of the samples.

* Filtering: Individual **charts** can be used to select a **subset of samples**. All other charts automatically **update** to reflect the features of the selected subset.

* Adding Charts: Use the "**Charts**" button to add new visualizations from categories:

    * **Clinical**: Lists all patient- and sample-level data available for this study.

    * **Genomic**: Summarizing genomic data (e.g., Mutation Count).

    * **Gene Specific**: Adds charts for individual genes from any molecular profile with continuous data (e.g., mRNA expression).

    * Other data types available in some studies: **X vs Y** (Beta, for comparing two clinical attributes), **Custom Data**, **Arm-level CNA**, and **Microbiome Signature**.

* Running a Query: Use the input box to **type a gene name** and run a query, or **click on a gene** in the tables to add it to the query. The query runs only on the **selected samples** (if filters were applied).

2. Clinical Data Tab

* Displays **clinical data** in a detailed, sortable table format.

* **Filters applied in the Summary tab** apply to this table.

* A button is available to **download** the clinical data table.

3. CN Segments Tab

* Available when copy number data is present.

* Integrates the **Integrated Genomics Viewer (IGV)** to browse segmented copy-number data across the entire genome.

* **Filters applied in the Summary tab** also apply here.

4. Heatmaps Tab

* **Only appears for some TCGA studies**.

* Embeds the **Next-Generation Clustered Heat Map (NG-CHM)** interactive tool.

---
Additional Features (Study View Header)

The following icons/buttons allow actions on the **currently selected samples/patients**:

* **Patient View (icon)**: See all selected samples/patients in a detailed view.

* **Create Virtual Study (icon)**: Create a new study containing only the selected samples/patients.

* **Custom Selection**: Enter a list of sample or patient IDs for a custom filter.

* **Groups**: Initiate a group comparison session.