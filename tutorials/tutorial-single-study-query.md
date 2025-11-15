# Tutorial: Single Study Query

This tutorial guides users on how to query one or multiple genes within a single dataset on cBioPortal.

---
Tutorial Objectives and Tabs Overview

The tutorial focuses on running a single-study query and walking through the various results tabs. Not all tabs will be present for every query or study (e.g., a study without mRNA data won't have a Co-expression tab).

Key Tabs in a Single-Study Query:

* **OncoPrint**: Overview of genetic alterations per sample for each queried gene.

* **Cancer Types Summary**: Frequency of alteration in each query gene across detailed cancer types in the study.

* **Mutual Exclusivity**: Statistical analysis to see if query genes are mutually exclusively altered or co-occur.

* **Plots**: Explore relationships among genetic alterations, gene expression, protein levels, and clinical features.

* **Mutations**: Detailed view of mutations called in each query gene, visualized on a lollipop plot.

* **Co-expression**: Explore genes whose mRNA/protein levels correlate with query genes.

* **Comparison/Survival**: Explore overlaps, outcomes, and comparisons among groups of samples (replaces/enhances the old "Enrichments" tab).

* **CN Segments**: Visualize copy number changes using the Integrated Genomics Viewer (IGV).

* **Pathways**: Explore queried genes within TCGA-defined pathways (integration with PathwayMapper).

* **Download**: Download data or copy lists of samples.

---
Running and Modifying a Query

### 1. Running the Query (from the Main Page)

1.  **Select Study:** Filter studies (optional) and check the box next to the study of interest (e.g., Brain Lower Grade Glioma).

2.  **Start Query:** Click "**Query By Gene**".

3.  **Select Data & Samples:** Choose the genomic profiles (data types) to query. By default, **Mutations** and **CNA** will be selected if available. An appropriate sample set is usually auto-selected (e.g., Samples with mutation and CNA data).

4.  **Enter Genes:** Type the gene symbol(s) (e.g., IDH1 EGFR) or use pre-defined lists. Onco Query Language (OQL) can be used for more specific alterations.

5.  **Submit Query.**

### 2. Modifying a Query

* **Full Modify:** Click the "**Modify Query**" button (available on all tabs in Results View) to return to the query interface. The existing query is pre-populated, allowing you to change the study, genomic profiles, sample set, or gene list.

* **Quick Edit:** Click the pencil icon next to the queried genes in the header for a quick edit of the gene list or OQL.

---
Results View: Header and Settings

* **General Header Info:** Shows the study name, the sample/patient set used, and the percentage of samples/patients with an alteration in any queried gene.

* **Variant Settings:** A menu (often accessed via a settings icon) controls how alterations are visualized:

    * Set the definition of **Putative Driver vs. Variant of Unknown Significance (VUS)** (e.g., using OncoKB, Hotspots, cBioPortal score, or COSMIC score).

    * **Filter Data** options allow you to exclude VUS, germline mutations, or unprofiled samples.

---
Results View: Key Tab Functionality

### OncoPrint Tab

* **Visualization:** Each column is a sample, each row is a queried gene. Alterations are color-coded (e.g., missense mutation, amplification). Samples are sorted by gene and alteration type.

* **Customization:** You can **Add Tracks** (e.g., clinical data, heatmaps like RNA levels, Arm-level CNA), **Sort** the sample order, and **Customize Visualization** (e.g., change the coloring rules for mutations).

* **Zoom:** Use the zoom controls or the **Minimap** to see all samples, zoom in/out, and move around the visualization.

### Cancer Types Summary Tab

* **Visualization:** Bar plots show the **alteration frequency** for all queried genes (combined) and each individual gene across the detailed **cancer subtypes** in the study.

* **Details:** Hover over a bar to see a summary of alteration types (Mutation, Structural Variant, CNA) and their frequencies in that subtype.

### Mutual Exclusivity Tab

* **Analysis:** Provides a **statistical analysis** of all pairwise combinations of query genes for **mutual exclusivity** (tend to occur in different samples) or **co-occurrence** (tend to occur in the same samples).

* **Metric:** The **Log2 Odds Ratio** indicates tendency: a positive value suggests co-occurrence; a negative value suggests mutual exclusivity.

### Plots Tab

* **Analysis:** Allows **plotting comparisons** between two data types (**Horizontal Axis** vs. **Vertical Axis**) for a query gene (e.g., comparing EGFR Copy Number vs. EGFR mRNA Expression).

* **Visualization:** Each dot represents a sample. You can select the **data type, profile, and gene** for each axis.

### Mutations Tab

* **Lollipop Plot:** Mutations are drawn as "lollipops" along the **domain structure** of the gene. The height reflects the number of samples with a mutation at that amino acid.

* **Annotations:** You can **Add annotation tracks** (e.g., Cancer Hotspots, OncoKB, PTMs, Exon, Topology) and view mutations in the context of a **3D protein structure** (PyMol).

* **Table:** A table below lists all mutations with various annotations (e.g., Protein Change, Mutation Type, Copy Number, Allele Frequency). You can filter the table by clicking on a **lollipop** or on the mutation type boxes (Driver, Missense, etc.).

### Co-expression Tab

* **Analysis:** Lists genes whose **mRNA/protein expression** is significantly correlated with the queried gene.

* **Visualization:** Clicking a correlated gene brings up a scatter plot comparing the expression levels of the queried gene (x-axis) against the correlated gene (y-axis). Dots can be color-coded by mutation status.

### Comparison/Survival Tab

* **Function:** Enables comparison of data between selected **Groups** (e.g., the default "Altered group" vs. "Unaltered group"). Additional groups for individual genes (IDH1, EGFR, IDH2) are also available.

* **Overlap Subtab:** Shows samples/patients that overlap among the selected groups. Allows creation of new saved groups.

* **Survival Subtab:** Generates **Kaplan-Meier survival plots** (e.g., Overall Survival, Disease Free Survival) to compare outcomes between groups.

* **Clinical Subtab:** Compares available **clinical data** (e.g., Subtype, Diagnosis Age) between selected groups, generating plots like stacked bar charts.

* **Molecular Profiles Subtabs (Genomic Alterations, mRNA, Protein, etc.):** Asks if alterations or expression of other genes are **enriched** in one group compared to another (visualized with a Volcano plot). Genes found to be significant can be added to the main query.

### CN Segments Tab

* **Visualization:** Views copy number for each sample at each queried gene using the **Integrated Genomics Viewer (IGV)**.

* **Detail:** Allows users to zoom in/out to see if amplifications or deletions are **focal** (at the gene locus) or **broad** (encompassing the entire chromosome).

### Download Tab

* **Data Files:** Download queried data types (e.g., Copy-number, Mutations) and all other data types (e.g., mRNA Expression, Protein Expression) for the queried genes as Tab Delimited Format or Transposed Matrix files.

* **Sample Lists:** Download lists of **Altered samples**, **Unaltered samples**, and a **Sample matrix** summarizing alteration status for all samples.
