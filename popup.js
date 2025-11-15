const STATE_KEY = "cbioTutorialsEnabled";
const DEFAULT_APPLIED_KEY = "cbioTutorialsDefaultApplied";

function updateStatusMessage(isEnabled) {
  const statusElement = document.getElementById("statusMessage");
  if (!statusElement) {
    return;
  }
  statusElement.textContent = isEnabled
    ? "Guidance is enabled on cbioportal.org."
    : "Guidance is disabled.";
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("activationToggle");
  if (!toggle) {
    return;
  }

  chrome.storage.local.get([STATE_KEY, DEFAULT_APPLIED_KEY], (result) => {
    const defaultApplied = Boolean(result[DEFAULT_APPLIED_KEY]);
    let isEnabled = Boolean(result[STATE_KEY]);

    if (!defaultApplied) {
      isEnabled = true;
      chrome.storage.local.set({
        [STATE_KEY]: true,
        [DEFAULT_APPLIED_KEY]: true
      });
    }

    toggle.checked = isEnabled;
    updateStatusMessage(isEnabled);
  });

  toggle.addEventListener("change", () => {
    const isEnabled = toggle.checked;
    chrome.storage.local.set(
      { [STATE_KEY]: isEnabled, [DEFAULT_APPLIED_KEY]: true },
      () => {
      updateStatusMessage(isEnabled);
      }
    );
  });
});
