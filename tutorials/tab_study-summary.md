# Study Summary Tab Guide
Aggregated Views of Key Clinical and Genomic Features

The Study Summary tab provides interactive charts that summarize the cohort’s clinical and genomic features. It does not allow to perform comparisons, but it allows the creation of groups for downstream analysis and comparison.

The charts can be re-sized by dragging the bottom-right corner, and the can be re-organized by dragging their header. You can click within these charts to select samples matching certain characteristics, and the page will reload to display only the filtered subset. Whenever filters are applied, their details appear directly beneath the study description in the header, along with the option to clear one or more filters.

After applying a filter, you can turn the selected samples into a **Custom Group** by clicking the blue **Groups** button at the bottom-right of the header and choosing **Create new group from selected samples**.

**IMPORTANT** Before creating a new **Custom Group**, make sure the applied filters are correct.

When interacting with the chart controls, note that the hit‑boxes are tiny. To remove a chart or open its menu, hover over the chart’s top‑right corner and click right at the top edge of the icon. Clicking lower down on the icon won’t trigger the action.

The types of charts available include:

## 1. Frequency Tables: 
These appear as sortable tables that list categories with:
- Counts (#), percentages (Freq %), and other data-tyoe-specific attributes 
- A checkbox for selecting categories
- A search bar at the bottom

How to use them: 
- The tables can be sorted by any column.
- Use the search bar to quickly find a specific category.
- Select categories with checkboxes and click on **Select Samples** to filter the data.

## 2. Bar Charts
Bar charts display histogram-style summaries of how numerical values are distributed across samples.

How to use them:
- Hover over each bar to see exact counts and percentages.
- Click a single bar to select samples in that bin.
- Click and drag across multiple bars to select samples across a broader range of values.

Additional options available from the chart menu (three-dot menu icon appears at the top-right when hovering over the chart):
- Compare Groups: Open a new **Comparison** tab where sample groups, created from the selected histogram bins, are compared across clinical and genomic features.
- Custom Bins: Adjust how values are grouped by creating your own bin sizes.
- Show NA: Include or hide samples with missing values for this attribute.
- Download: Export the chart in various formats.

## 3. Pie Charts
Pie charts display categorical proportions at a glance.

How to use them:
- Hover too see the data as a **Frequency Table** which can be used as described above.
- Click on slices to select the samples represented by that category.

Additional options available from the chart menu (three-dot menu icon appears at the top-right when hovering over the chart):
- Show Table: Switch to view **Frequency Table**.
- Compare Groups: Open a new **Comparison** tab where sample groups, created from the selected slices, are compared across clinical and genomic features.

## 4. Scatter Plots
Scatter plots display the relationship between two numerical variables for all samples in the cohort. A correlation coefficient is shown on the right-hand side to indicate the strength and direction of the association.

How to use them:
- Hover over points to view information for individual samples.
- Click or drag-select to define custom sample subsets.

Additional options available from the chart menu (three-dot menu icon appears at the top-right when hovering over the chart):
- Swap Axes: Switch the variables plotted on the X and Y axes.
- Log Scale (X or Y): Apply a logarithmic scale to better visualize wide-ranging values.

## 5. Kaplan–Meier Survival Plots: 
Survival curves give an overview survival outcomes of all the selected patients.

How to use them:
- Hover to inspect survival probabilities at specific time points.