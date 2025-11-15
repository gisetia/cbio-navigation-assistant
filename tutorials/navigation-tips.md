# cBioPortal Navigation Best Practices
Keep these reminders in mind to avoid losing context while jumping between tabs or re-running analyses.

cBioPortal’s interface is highly dynamic—its charts and tables are rendered with JavaScript, causing element identifiers to change after refreshes or updates. Because components reload between tabs, settings and cohorts may reset, so it’s best to reselect them explicitly. Use DOM-based attributes (like data-test IDs) instead of screen coordinates for reliable interactions. Some options appear only when their conditions are met, and status messages can clarify missing or incomplete results. Keeping these behaviors in mind helps ensure smoother navigation across all cBioPortal views.
