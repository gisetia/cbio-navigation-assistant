# Tutorial: Onco Query Language (OQL)

This tutorial introduces and explains the utility of Onco Query Language (OQL) for refining queries in cBioPortal.

---
OQL Overview and Purpose

* **What is OQL?** OQL defines the specific types of alterations that should be considered when running a query, determining what counts as an "altered" sample.

* **Why use OQL?** The default query typically includes only mutations (MUT), fusions (FUSION), amplifications (AMP), and homozygous/deep deletions (HOMDEL). OQL is necessary to customize which alterations define an altered sample, such as including **shallow deletions** or specifying a **particular amino acid change**.

* **Default Behavior:** If you hover over a gene name in the OncoPrint view of a regular query, you can see the default OQL being applied (e.g., IDH1: MUT FUSION AMP HOMDEL).

---
OQL Rules and Syntax

OQL is applied in the **"Enter Genes"** box of the query form.

### 1. Basic Format

The general format is:

`GENE: ALTERATION1 ALTERATION2 ...`

### 2. General Keywords (Alteration Types)

| Data Type | Keywords and Syntax | Purpose |
| :--- | :--- | :--- |
| **Mutations** | **MUT** | All non-synonymous mutations. |
| | **MUT-R132C** | Specific amino acid changes (e.g., R132C). |
| | **MUT-MISSENSE** | Specific mutation types (e.g., MISSENSE, NONSENSE, FRAMESHIFT, SPLICE, TRUNC). |
| **Fusions** | **FUSION** | All fusions / structural variants. |
| **Copy Number** | **AMP** | Amplifications. |
| | **HOMDEL** | Deep/Homozygous Deletions. |
| | **GAIN** | Gains (moderate copy number increase). |
| | **HETLOSS** | Shallow/Heterozygous Deletions. |
| | **CNA > GAIN** | Comparison operators (>, <, >=, <=) can be used (e.g., this is the same as AMP GAIN). |
| **mRNA Expression** | **EXP > 2** | mRNA expression is greater than 2 Standard Deviations (SD) above the mean. |
| | **EXP < -2** | mRNA expression is less than 2 SD below the mean. |
| **Protein Level** | **PROT >= 2** | Protein expression is greater than or equal to 2 SD above the mean. |

### 3. OQL Modifiers

| Modifier | Applicable Data Type | Explanation |
| :--- | :--- | :--- |
| **\_DRIVER** | Mutations, Fusions, CNA | Include only alterations classified as **putative driver events** (as defined by OncoPrint settings, typically OncoKB and CancerHotspots). |
| **\_GERMLINE** | Mutations | Include only mutations explicitly defined as **germline events** by the study. |
| **\_SOMATIC** | Mutations | Include all mutations **not** defined as germline. |
| **(a-b)** | Mutations | Include mutations that **overlap** with the protein position range a-b. Use `[a-b]` to require mutations to be **fully contained** within the range. Open-ended ranges (a-), (-b) are also allowed. |

---
OQL Usage Examples

### 1. Simplifying and Customizing Alteration Types

* **Default Query (IDH1, IDH2, EGFR, TP53):**
    * `IDH1 IDH2 EGFR TP53`

* **Same Query with OQL (by gene):**
    * `IDH1: MUT FUSION AMP HOMDEL`
    * `IDH2: MUT FUSION AMP HOMDEL`
    * *...and so on for all genes.*

* **Same Query with OQL (DATATYPES command):** The `DATATYPES` command sets the alterations for all listed genes at once.
    * `DATATYPES: MUT FUSION AMP HOMDEL`
    * `IDH1 IDH2 EGFR TP53`

* **Customizing to include Gains and Shallow Deletions:**
    * `EGFR: MUT FUSION AMP HOMDEL GAIN`
    * `TP53: MUT FUSION AMP HOMDEL HETLOSS`

* **Targeting a Specific Mutation:**
    * `IDH1: MUT-R132C` (Limits IDH1 hits to only the R132C mutation, and no other alteration types unless specified).

### 2. Incorporating Expression Data

* **Including mRNA Low Expression:** Use `EXP` keyword along with the appropriate profile selected in the "Select Genomic Profiles" section.
    * `BRCA1: MUT HOMDEL EXP < -1.5` (Includes mutation, deep deletion, or expression less than -1.5 SD).

### 3. Targeting Driver/Germline Status

* **Including Only Putative Drivers:** Use the `_DRIVER` modifier.
    * `BRCA1: MUT_DRIVER HOMDEL EXP < -1.5` (Applies `_DRIVER` only to mutations).
    * `BRCA2: DRIVER` (Applies the `DRIVER` filter to all default alteration types: MUT, FUSION, AMP, HOMDEL).

* **Querying for Putative Germline Driver Mutations:**
    * `BRCA1: MUT_GERMLINE_DRIVER`
    * `BRCA2: GERMLINE_DRIVER`

### 4. Grouping Genes (Gene Tracks)

* You can group related genes together on the OncoPrint using **gene tracks**. The format uses square brackets:
    * `["optional track name" GENE1 GENE2 ... ]`
    * Example: `["RAS" KRAS NRAS HRAS]`

* **Combining Tracks with OQL:** You can combine tracks with the `DATATYPES` command or by applying OQL directly inside the track brackets.
    * `DATATYPES: DRIVER`
    * `[EGFR ERBB2]`
    * `["RAS" KRAS NRAS HRAS]`