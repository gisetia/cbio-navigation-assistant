# cBioPortal Tutorials Assistant

This Chrome extension adds an always-visible guidance panel to pages on [cBioPortal](https://www.cbioportal.org) so that humans and AI agents can quickly learn how to navigate the site. Use the popup switch to enable or disable the helper as needed.

## Features
- Only activates on `cbioportal.org` pages.
- Popup toggle to turn the helper on/off at any time.
- Context-aware instructions for common views (home, study, results, patient).
- Collapsible sidebar so the main application remains accessible.

## Install (Developer Mode)
1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** (top-right corner).
3. Click **Load unpacked** and choose this project folder (`cbio-tutorials-extension`).
4. Pin the “cBioPortal Tutorials Assistant” action if you want quick access to the toggle.

## Usage
1. Visit any page on `cbioportal.org`.
2. Open the extension popup and flip the switch to **Show guidance when I visit cBioPortal**.
3. A sidebar appears on the left with navigation tips tailored to the current view.
4. Use the **Collapse** button on the sidebar to minimize it without turning it off.
5. Return to the popup and disable the switch when you no longer need the helper.

## Customize the Tutorials
- Each entry in `instructionConfigs` now only needs `appliesTo` values and a `markdownPath`. The Markdown file supplies both the content and its metadata.
- Write Markdown under `tutorials/` starting with `# Title` on the first line and a short summary paragraph on the next line. Those two elements populate the sidebar/page title and subtitle automatically.
- Long-form guides (for example `tutorials/oncoprint-deep-dive.md`) can live alongside the other files; link to them from any tutorial and they’ll open in the in-page modal overlay.
- Use `appliesTo` keys (e.g., `["study"]`, `["comparison/overlap"]`, `["global"]`) to control where a tutorial appears. The first matching block becomes the primary section; any `["global"]` blocks append afterward.
- Adjust the sidebar styling in `injectStyles()` or tweak the popup appearance in `popup.css`.

## Development Notes
- The extension stores its on/off state in `chrome.storage.local` under the key `cbioTutorialsEnabled`.
- The content script listens for URL changes (including SPA navigation) and swaps in the appropriate instruction set.
- No build step is required; load the folder directly as an unpacked extension.
