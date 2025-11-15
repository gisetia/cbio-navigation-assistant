# Tutorial: Group Comparison

This tutorial explains the Group Comparison feature, a suite of analysis tools that lets you compare the clinical and genomic features of user-defined groups of samples or patients.

---
## Group Definition and Entry Points

Groups can be defined based on any clinical or genomic features available in the study.

### 1. Entering Group Comparison (Method 1: From a Chart)

1.  **Select a Study:** Choose a study and view the **Study Summary** page.

2.  **Add a Chart:** Use the "**Charts**" menu to add a chart of a clinical or genomic attribute (e.g., Neoplasm Histologic Grade).

3.  **Compare Groups:** Hover over the menu icon (a horizontal bar icon) on the newly created chart and click "**vs. Compare Groups**."

4.  **Result:** This takes you directly to the Group Comparison view with groups pre-defined by the categories in that chart (e.g., G2, G3, G4 grades).

### 2. Entering Group Comparison (Method 2: User-Defined Groups)

1.  **Define Group 1 (Filter):** Apply filters on the **Study Summary** page to select a subset of samples (e.g., click the checkbox next to IDH1 in the **Mutated Genes** table and then click **Select Samples**).

2.  **Create Group 1:** At the bottom of the filtered table, click "**Create new group from selected samples**." Give the group a name (e.g., IDH1 mutant). This group is now saved under the "**Groups**" button.

3.  **Clear Filters and Repeat:** Clear the existing filter ("**Clear All Filters**"), apply a new filter (e.g., for TP53 mutant samples), and **create a new group**.

4.  **Compare:** Click the "**Groups**" button, select the groups you want to compare, and click the "**Compare**" button to reach the Group Comparison view.

---
## Group Comparison Tabs and Functionality

All Group Comparison pages share a header showing the **groups available** for analysis. You can **toggle** groups on or off, **reorder** them by dragging, and click the "**x**" to remove them.

### 1. Overlap Tab

* **Purpose:** Shows which samples or patients **overlap** (are present in more than one selected group) using a Venn or UpSet diagram (if 4 or more groups are selected).

* **Overlap Management:** When samples/patients overlap, a drop-down menu appears in the header allowing you to **Exclude** (default) or **Include** overlapping cases in analyses performed in other tabs.

* **Creating New Groups:** You can **click on a section** of the Venn/UpSet diagram (e.g., the intersection area, or an area exclusive to one group) to select that subset of samples and create a **new custom group** from those areas.

* **Select Groups:** In the Groups bar, selected groups are highlighted in color; unselected ones remain grey. Use the “Deselect all” link in the Groups bar to clear all default selections, then click on each of the desired groups to highlight them. Only the highlighted groups will be used for the comparison analyses.

### 2. Survival Tab

* **Purpose:** Displays a **Kaplan-Meier survival plot** (e.g., Overall Survival, Disease-free Survival) to compare outcomes among the selected groups.

* **Visibility:** This tab is only visible if the original study contains survival data.

* **What you should see:** A Kaplan–Meier survival plot with a line for each selected group, shown in the legend on the right. Above the legend, the p-value from a logrank test comparing the groups is displayed. Above the plot, there is "Calculate hazard ratios" checkbox. Under the plot, a table shows a summary of important survival statistics. 

### 3. Clinical Tab

* **Purpose:** Compares the distribution of **clinical attributes** across the selected groups.

* **Functionality:** Select a clinical attribute from the table (e.g., Supervised DNA Methylation Cluster, ATRX status). A plot (e.g., 100% stacked bar chart) appears on the right, visualizing the distribution of that attribute across the comparison groups.

### 4. Mutations Tab

* **Purpose:** Compares the **frequency of mutations** in common genes across the selected groups.

* **Visualization:** Shows a bar chart of mutation frequency for the highest frequency genes in any group.

* **Two-Group Comparison:** When exactly **two groups** are selected, two additional plots appear: a Volcano plot and a scatter plot of altered frequency in one group versus the other. These plots help identify genes significantly enriched in one group.

### 5. Copy-number Tab

* **Purpose:** Compares the **frequency of amplifications and deep deletions** in common genes across the selected groups.

* **Functionality:** Similar to the Mutations tab, it features bar charts and specialized plots for two-group comparisons to highlight enriched copy number alterations.

---
##  Use Case: Identifying Samples Without an Alteration

The **Overlap Tab** can be used to identify and create a group of samples *lacking* a specific alteration.

1.  **Define Group A:** Create a group of samples with a **specific alteration** (e.g., IDH1 or IDH2 mutant).

2.  **Define Group B:** Create a group of all samples **with mutation data** (e.g., filter the Study View to only samples "With Mutation Data: YES").

3.  **Compare:** Run a comparison between Group A and Group B.

4.  **Select Non-Overlapping Area:** On the **Overlap tab**, select the area of the Venn diagram that represents samples **in Group B but NOT in Group A**. This is the desired group of samples with mutation data, but *without* the specific IDH1/IDH2 alteration.

5.  **Create New Group:** Create a new custom group from this selected area. You can then use this new group for further analysis and comparison.
