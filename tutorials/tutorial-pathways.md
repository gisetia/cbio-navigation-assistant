# Tutorial: Pathways

This tutorial explains how to use the Pathways tab in cBioPortal to explore genomic data in the context of biological signaling pathways.

---

Pathways Tab Overview

* Motivation: Genomic alterations in cancer often affect a relatively small number of key signaling pathways (e.g., involved in cell proliferation, apoptosis, DNA repair).

* Function: The Pathways tab overlays alteration data from your study or individual patient onto hand-drawn pathways originally summarized by The Cancer Genome Atlas (TCGA).

* Availability: The Pathways tab is available in both the **Results View** (after running a query) and the **Patient View**.

* Technology: The Pathways tabs were built using a viewer-only edition of PathwayMapper, which is based on Cytoscape.js.

---

Pathways Tab in Results View (Query Results)

This view is accessed after running a query (e.g., on TP53 and MDM2/4).

### Pathway Components

* Pathway Diagram: Shows the selected pathway with the **alteration frequencies** of selected genetic profiles from the chosen study overlaid on the corresponding genes.

* Query Genes: Genes included in your query are shown with **thicker borders**.

* Pathways Table: Lists available TCGA pathways, sorted by a score based on how well they match your query genes.

### Ranking Options (For Pathways Table)

The ranking scheme determines the order of pathways in the table:

1.  Match count vs percentage:
    * Match count (Default): Ranks pathways by the absolute number of query genes matched.
    * Percentage: Ranks pathways by the ratio of query genes matching to the total number of genes in the pathway.

2.  Consider alteration frequency:
    * When checked, each matching gene contributes to the score with a **weight equal to its alteration frequency** in the study.

3.  TCGA Publications Toggle: You can toggle between pathways defined by the **TCGA PanCancer Atlas** (default) or **all TCGA publications**.

### Toolbar Operations

The toolbar above the pathway visualization provides several functions:

* Save: Save the current pathway as a static image (**PNG** or **SVG**).

* Perform Layout: Perform incremental layout on the pathway diagram.

* Query Gene Management: Add selected genes to query; add all valid genes in this pathway to query.

* Edit: Edit the pathway with the **PathwayMapper editor** (available in Results View only).

* Help: Quick help on the notation used.

---

Pathways Tab in Patient View (Individual Patient)

This view displays pathways specific to a single patient, highlighting their individual alterations.

* Pathway Diagram: Shows the pathway with the individual patient's **genetic alterations** overlaid.

* Altered Genes: Altered genes are shown with **thicker borders**.

* Details: Mouse over an altered gene (e.g., CCNE1) to see the **specific alteration details** (e.g., CNA: CCNE1 AMPLIFIED).

* Pathways Table: Lists TCGA pathways where **altered pathways are shown before non-altered ones** by default.

* Toolbar: The toolbar offers the ability to **Save** (PNG or SVG) and **Perform incremental layout**.