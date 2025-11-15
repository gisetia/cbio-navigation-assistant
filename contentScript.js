const STATE_KEY = "cbioTutorialsEnabled";
const CONTAINER_ID = "cbio-tutorials-overlay";
const STYLE_ID = "cbio-tutorials-overlay-style";
const BODY_ACTIVE_CLASS = "cbio-tutorials-overlay-enabled";
const MODAL_ID = "cbio-tutorials-modal";
const MODAL_VISIBLE_CLASS = "cbio-tutorials-modal--visible";
const BODY_MODAL_CLASS = "cbio-tutorials-modal-open";
const LAYOUT_ID = "cbio-tutorials-layout";
const CONTENT_WRAPPER_ID = "cbio-tutorials-content-wrapper";
const DEFAULT_APPLIED_KEY = "cbioTutorialsDefaultApplied";

const instructionConfigs = [
  {
    appliesTo: ["results/comparison/overlap"],
    markdownPath: "tutorials/results-comparison-overlap.md"
  },
  {
    appliesTo: ["results/comparison/survival"],
    markdownPath: "tutorials/results-comparison-survival.md"
  },
  {
    appliesTo: ["global"],
    markdownPath: "tutorials/navigation-tips.md"
  },
  {
    appliesTo: ["global"],
    markdownPath: "tutorials/tutorials-overview.md"
  }

];

const fallbackInstructions = {
  markdownPath: "tutorials/fallback.md"
};

function escapeHtml(raw = "") {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderInlineMarkdown(text) {
  let result = escapeHtml(text);

  result = result.replace(/`([^`]+)`/g, "<code>$1</code>");
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  result = result.replace(/__(.+?)__/g, "<strong>$1</strong>");
  result = result.replace(/\*(.+?)\*/g, "<em>$1</em>");
  result = result.replace(/_(.+?)_/g, "<em>$1</em>");
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => {
    const trimmedHref = href.trim();
    const isAbsolute =
      /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmedHref) ||
      trimmedHref.startsWith("//");

    if (!isAbsolute) {
      const normalized = trimmedHref.replace(/^\.?\/+/, "");
      if (normalized && !normalized.includes("..")) {
        if (normalized.toLowerCase().endsWith(".md")) {
          const dataAttr = escapeHtml(normalized);
          return `<a href="#" data-cbio-modal-doc="${dataAttr}">${label}</a>`;
        }
        const resolvedHref = chrome.runtime.getURL(normalized);
        return `<a href="${escapeHtml(
          resolvedHref
        )}" target="_blank" rel="noopener noreferrer">${label}</a>`;
      }
    }

    const safeHref = escapeHtml(trimmedHref);
    return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  });

  return result;
}

function renderMarkdown(markdown = "") {
  const normalized = markdown.replace(/\r\n/g, "\n").trim();
  if (!normalized) {
    return "";
  }

  const lines = normalized.split("\n");
  const htmlParts = [];
  let paragraphLines = [];
  let listType = null;

  const closeParagraph = () => {
    if (paragraphLines.length === 0) {
      return;
    }
    const text = paragraphLines.join(" ");
    htmlParts.push(`<p>${renderInlineMarkdown(text)}</p>`);
    paragraphLines = [];
  };

  const closeList = () => {
    if (!listType) {
      return;
    }
    htmlParts.push(`</${listType}>`);
    listType = null;
  };

  lines.forEach((rawLine) => {
    const line = rawLine;
    const trimmed = line.trim();

    if (!trimmed) {
      closeParagraph();
      closeList();
      return;
    }

    const headingMatch = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (headingMatch) {
      closeParagraph();
      closeList();
      const [, hashes, text] = headingMatch;
      const level = Math.min(5, hashes.length + 2);
      htmlParts.push(
        `<h${level}>${renderInlineMarkdown(text.trim())}</h${level}>`
      );
      return;
    }

    const bulletMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (bulletMatch) {
      closeParagraph();
      if (listType !== "ul") {
        closeList();
        listType = "ul";
        htmlParts.push("<ul>");
      }
      htmlParts.push(`<li>${renderInlineMarkdown(bulletMatch[1])}</li>`);
      return;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      closeParagraph();
      if (listType !== "ol") {
        closeList();
        listType = "ol";
        htmlParts.push("<ol>");
      }
      htmlParts.push(`<li>${renderInlineMarkdown(orderedMatch[1])}</li>`);
      return;
    }

    if (listType) {
      closeList();
    }
    paragraphLines.push(trimmed);
  });

  closeParagraph();
  closeList();

  return htmlParts.join("\n");
}

function stripMarkdownSummary(text = "") {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .trim();
}

function extractMetadata(markdown = "") {
  const meta = {
    title: "",
    summary: "",
    content: ""
  };
  if (!markdown) {
    return meta;
  }
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const remaining = [];
  let titleCaptured = false;
  let summaryCaptured = false;

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();

    if (!titleCaptured && /^#{1,6}\s+/.test(trimmed)) {
      meta.title = trimmed.replace(/^#{1,6}\s+/, "").trim();
      titleCaptured = true;
      continue;
    }

    if (!summaryCaptured) {
      if (!trimmed) {
        continue;
      }
      if (/^#{1,6}\s+/.test(trimmed)) {
        titleCaptured = true;
        continue;
      }
      if (/^([-*]\s+|\d+\.\s+)/.test(trimmed)) {
        summaryCaptured = true;
        remaining.push(rawLine);
        continue;
      }
      if (/^(\*{3,}|-{3,}|_{3,})$/.test(trimmed)) {
        continue;
      }
      meta.summary = stripMarkdownSummary(trimmed);
      summaryCaptured = true;
      continue;
    }

    remaining.push(rawLine);
  }

  meta.content = remaining.join("\n").trim();
  return meta;
}

function applyHeaderMetadata(overlay, meta = {}) {
  if (!overlay || !overlay._refs) {
    return;
  }
  const { headerTitle, headerSummary } = overlay._refs;
  if (headerTitle) {
    headerTitle.textContent = meta.title || "";
    headerTitle.hidden = !headerTitle.textContent;
  }
  if (headerSummary) {
    headerSummary.textContent = meta.summary || "";
    headerSummary.hidden = !headerSummary.textContent;
  }
}

function fetchMarkdownAsset(assetPath) {
  if (!assetPath) {
    return Promise.resolve("");
  }
  const url = chrome.runtime.getURL(assetPath);
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${assetPath}: ${response.status}`);
      }
      return response.text();
    })
    .catch((error) => {
      console.error("[cBio Tutorials] Markdown load error:", error);
      return "";
    });
}

function getInstructionMarkdown(instruction) {
  if (!instruction) {
    return Promise.resolve("");
  }
  if (typeof instruction.markdown === "string") {
    if (!instruction.meta) {
      instruction.meta = extractMetadata(instruction.markdown);
      instruction.cleanedMarkdown = instruction.meta.content || instruction.markdown;
    }
    return Promise.resolve(instruction.cleanedMarkdown || instruction.markdown);
  }
  if (!instruction.markdownPath) {
    instruction.markdown = "";
    instruction.meta = instruction.meta || {};
    instruction.cleanedMarkdown = "";
    return Promise.resolve("");
  }
  if (!instruction._markdownPromise) {
    instruction._markdownPromise = fetchMarkdownAsset(instruction.markdownPath)
      .then((markdownText) => {
        instruction.markdown = markdownText;
        instruction.meta = extractMetadata(markdownText);
        instruction.cleanedMarkdown =
          instruction.meta.content || instruction.markdown;
        return instruction.cleanedMarkdown;
      })
      .catch(() => "");
  }
  return instruction._markdownPromise;
}

function ensureModalElements() {
  if (modalRefs) {
    return modalRefs;
  }

  const backdrop = document.createElement("div");
  backdrop.id = MODAL_ID;
  backdrop.className = "cbio-tutorials-modal";
  backdrop.setAttribute("role", "dialog");
  backdrop.setAttribute("aria-modal", "true");

  const dialog = document.createElement("div");
  dialog.className = "cbio-tutorials-modal__dialog";

  const header = document.createElement("div");
  header.className = "cbio-tutorials-modal__header";

  const titleEl = document.createElement("h3");
  titleEl.className = "cbio-tutorials-modal__title";
  titleEl.textContent = "Extended Tutorial";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "cbio-tutorials-modal__close";
  closeBtn.setAttribute("aria-label", "Close tutorial");
  closeBtn.textContent = "×";
  closeBtn.addEventListener("click", () => closeMarkdownModal());

  header.appendChild(titleEl);
  header.appendChild(closeBtn);

  const contentEl = document.createElement("div");
  contentEl.className = "cbio-tutorials-modal__content";

  dialog.appendChild(header);
  dialog.appendChild(contentEl);
  backdrop.appendChild(dialog);

  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) {
      closeMarkdownModal();
    }
  });

  document.body.appendChild(backdrop);

  if (!modalKeydownHandlerAttached) {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMarkdownModal();
      }
    });
    modalKeydownHandlerAttached = true;
  }

  modalRefs = {
    backdrop,
    titleEl,
    contentEl
  };
  return modalRefs;
}

function closeMarkdownModal() {
  if (!modalRefs) {
    return;
  }
  modalRefs.backdrop.classList.remove(MODAL_VISIBLE_CLASS);
  document.body.classList.remove(BODY_MODAL_CLASS);
  modalRefs.contentEl.innerHTML = "";
}

function openMarkdownModal(docPath, titleText) {
  if (!docPath) {
    return;
  }

  const refs = ensureModalElements();
  const safeTitle = titleText || "Extended Tutorial";

  refs.titleEl.textContent = safeTitle;
  refs.contentEl.innerHTML = "<p>Loading tutorial…</p>";

  refs.backdrop.classList.add(MODAL_VISIBLE_CLASS);
  document.body.classList.add(BODY_MODAL_CLASS);

  fetchMarkdownAsset(docPath)
    .then((markdown) => {
      if (
        !modalRefs ||
        !modalRefs.backdrop.classList.contains(MODAL_VISIBLE_CLASS)
      ) {
        return;
      }
      if (!markdown) {
        modalRefs.contentEl.innerHTML =
          "<p>This tutorial file is empty. Update the Markdown to add content.</p>";
        return;
      }
      modalRefs.contentEl.innerHTML = renderMarkdown(markdown);
    })
    .catch((error) => {
      console.error("[cBio Tutorials] Modal load error:", error);
      if (!modalRefs) {
        return;
      }
      modalRefs.contentEl.innerHTML =
        "<p>We couldn't load this tutorial. Reload the extension or check the console for details.</p>";
    });
}

function handleMarkdownLinkClick(event) {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }
  const anchor = target.closest("a[data-cbio-modal-doc]");
  if (!anchor) {
    return;
  }
  event.preventDefault();
  const docPath = anchor.getAttribute("data-cbio-modal-doc");
  const label = anchor.textContent ? anchor.textContent.trim() : "Extended Tutorial";
  openMarkdownModal(docPath, label);
}

function deriveContextKeys(urlString) {
  try {
    const url = new URL(urlString, window.location.origin);
    const keys = new Set();
    const trimmedPath = url.pathname.replace(/^\/|\/$/g, "");

    if (!trimmedPath) {
      keys.add("home");
    }

    if (trimmedPath) {
      const segments = trimmedPath.split("/").filter(Boolean);
      if (segments.length > 0) {
        keys.add(segments[0]);
      }
      keys.add(segments.join("/"));
    }

    const tabParam = url.searchParams.get("tab");
    if (tabParam) {
      keys.add(tabParam.toLowerCase());
    }

    keys.add("global");
    return Array.from(keys);
  } catch (error) {
    return ["global"];
  }
}

function resolveInstructionSets(urlString) {
  const contexts = deriveContextKeys(urlString);
  const matched = [];
  const globals = [];

  instructionConfigs.forEach((config) => {
    if (!Array.isArray(config.appliesTo) || config.appliesTo.length === 0) {
      return;
    }
    const shouldInclude = config.appliesTo.some((key) =>
      contexts.includes(key)
    );
    if (!shouldInclude) {
      return;
    }
    if (config.appliesTo.includes("global")) {
      globals.push(config);
      return;
    }
    matched.push(config);
  });

  if (matched.length === 0 && globals.length === 0) {
    return [fallbackInstructions];
  }

  return [...matched, ...globals];
}

const HISTORY_PATCH_FLAG = "__cbioTutorialsHistoryPatched";

let lastKnownUrl = window.location.href;
let urlPollerId = null;
let modalRefs = null;
let modalKeydownHandlerAttached = false;

function waitForBody(callback) {
  if (document.body) {
    callback();
    return;
  }
  const observer = new MutationObserver(() => {
    if (document.body) {
      observer.disconnect();
      callback();
    }
  });
  observer.observe(document.documentElement, { childList: true });
}

function injectStyles() {
  if (document.getElementById(STYLE_ID)) {
    return;
  }
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    :root {
      --cbio-tutorials-panel-width: clamp(220px, 18vw, 320px);
    }

    #${LAYOUT_ID} {
      display: flex;
      align-items: flex-start;
      width: 100%;
      min-height: 100vh;
    }

    #${CONTENT_WRAPPER_ID} {
      flex: 1;
      min-width: 0;
    }

    #${CONTAINER_ID} {
      flex: 0 0 var(--cbio-tutorials-panel-width);
      max-width: var(--cbio-tutorials-panel-width);
      min-width: 220px;
      position: sticky;
      top: 0;
      height: 100vh;
      background: #f7f9fc;
      border-right: 1px solid #ccd6eb;
      box-shadow: 2px 0 8px rgba(13, 27, 42, 0.16);
      padding: 12px 14px;
      box-sizing: border-box;
      font-family: "Helvetica Neue", Arial, sans-serif;
      color: #0d1b2a;
      z-index: 10;
      overflow-y: auto;
      transition: flex-basis 0.2s ease, max-width 0.2s ease, padding 0.2s ease;
    }

    #${CONTAINER_ID}.collapsed {
      flex: 0 0 48px;
      min-width: 48px;
      max-width: 48px;
      padding: 10px 6px;
    }

    #${CONTAINER_ID} .cbio-tutorials-overlay__header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    #${CONTAINER_ID} .cbio-tutorials-overlay__titles {
      display: flex;
      flex-direction: column;
      gap: 1px;
      flex: 1;
    }

    #${CONTAINER_ID} .cbio-tutorials-overlay__brand {
      font-size: 0.86rem;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #102a43;
    }

    #${CONTAINER_ID} .cbio-tutorials-overlay__page-title {
      margin: 0;
      font-size: 0.78rem;
      font-weight: 600;
      color: #274c77;
    }

    #${CONTAINER_ID} .cbio-tutorials-overlay__page-summary {
      margin: 0;
      font-size: 0.68rem;
      color: #486581;
    }

    #${CONTAINER_ID} .cbio-tutorials-overlay__sections {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    #${CONTAINER_ID}.collapsed .cbio-tutorials-overlay__sections {
      display: none;
    }

    #${CONTAINER_ID} section {
      background: #ffffff;
      border-radius: 10px;
      padding: 10px 12px;
      box-shadow: 0 1px 4px rgba(13, 27, 42, 0.08);
    }

    #${CONTAINER_ID} section h3 {
      margin: 0 0 2px 0;
      font-size: 0.82rem;
    }

    #${CONTAINER_ID} section h4 {
      margin: 0 0 10px 0;
      font-size: 0.64rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #486581;
    }

    #${CONTAINER_ID} section .cbio-tutorials-overlay__body {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    #${CONTAINER_ID} section .cbio-tutorials-overlay__body h3,
    #${CONTAINER_ID} section .cbio-tutorials-overlay__body h4,
    #${CONTAINER_ID} section .cbio-tutorials-overlay__body h5 {
      margin: 0;
      font-size: 0.74rem;
      color: #274c77;
    }

    #${CONTAINER_ID} section .cbio-tutorials-overlay__body p {
      font-size: 0.72rem;
      line-height: 1.35;
      margin: 0;
    }

    #${CONTAINER_ID} section .cbio-tutorials-overlay__body ul,
    #${CONTAINER_ID} section .cbio-tutorials-overlay__body ol {
      margin: 0;
      padding-left: 14px;
    }

    #${CONTAINER_ID} section .cbio-tutorials-overlay__body li {
      font-size: 0.7rem;
      line-height: 1.35;
      margin-bottom: 4px;
    }

    #${CONTAINER_ID} section .cbio-tutorials-overlay__body code {
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      font-size: 0.68rem;
      background: #e2e8f0;
      color: #102a43;
      padding: 0 3px;
      border-radius: 4px;
    }

    #${CONTAINER_ID} section .cbio-tutorials-overlay__body a {
      color: #1b3a57;
      text-decoration: underline;
    }

    .cbio-tutorials-modal {
      position: fixed;
      inset: 0;
      background: rgba(13, 27, 42, 0.48);
      display: none;
      align-items: flex-start;
      justify-content: center;
      padding: 60px 24px;
      z-index: 2147483646;
    }

    .cbio-tutorials-modal.${MODAL_VISIBLE_CLASS} {
      display: flex;
    }

    .cbio-tutorials-modal__dialog {
      max-width: 1000px;
      width: min(100%, 1000px);
      max-height: calc(100vh - 120px);
      background: #ffffff;
      border-radius: 14px;
      box-shadow: 0 12px 30px rgba(15, 76, 129, 0.2);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .cbio-tutorials-modal__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid #e2e8f0;
      gap: 10px;
    }

    .cbio-tutorials-modal__title {
      margin: 0;
      font-size: 0.9rem;
      color: #1b3a57;
    }

    .cbio-tutorials-modal__close {
      border: none;
      background: #274c77;
      color: #ffffff;
      border-radius: 999px;
      width: 28px;
      height: 28px;
      font-size: 0.9rem;
      line-height: 1;
      cursor: pointer;
    }

    .cbio-tutorials-modal__close:hover {
      background: #1b3a57;
    }

    .cbio-tutorials-modal__content {
      padding: 14px 18px 20px;
      overflow-y: auto;
      font-size: 0.74rem;
      line-height: 1.35;
      color: #102a43;
    }

    .cbio-tutorials-modal__content h2,
    .cbio-tutorials-modal__content h3,
    .cbio-tutorials-modal__content h4 {
      color: #274c77;
      margin-top: 0.9rem;
      margin-bottom: 0.5rem;
      font-size: 0.82rem;
    }

    .cbio-tutorials-modal__content p {
      margin-bottom: 0.55rem;
    }

    .cbio-tutorials-modal__content ul,
    .cbio-tutorials-modal__content ol {
      padding-left: 16px;
      margin-bottom: 0.55rem;
    }

    .cbio-tutorials-modal__content li {
      margin-bottom: 0.32rem;
    }

    .cbio-tutorials-modal__content code {
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      background: #edf2fb;
      color: #102a43;
      padding: 1px 3px;
      border-radius: 3px;
      font-size: 0.68rem;
    }

    body.${BODY_MODAL_CLASS} {
      overflow: hidden;
    }

    #${CONTAINER_ID} .cbio-tutorials-overlay__toggle {
      border: none;
      background: #274c77;
      color: #ffffff;
      border-radius: 10px;
      padding: 4px 8px;
      font-size: 0.7rem;
      cursor: pointer;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      transform-origin: center;
      transition: background 0.2s ease;
    }

    #${CONTAINER_ID} .cbio-tutorials-overlay__toggle:hover {
      background: #1b3a57;
    }

    #${CONTAINER_ID}.collapsed .cbio-tutorials-overlay__toggle {
      writing-mode: vertical-rl;
      text-orientation: upright;
    }
  `;
  document.head.appendChild(style);
}

function wrapPageContent() {
  let layout = document.getElementById(LAYOUT_ID);
  if (layout) {
    return layout;
  }

  layout = document.createElement("div");
  layout.id = LAYOUT_ID;

  const contentWrapper = document.createElement("div");
  contentWrapper.id = CONTENT_WRAPPER_ID;

  const existingNodes = Array.from(document.body.childNodes);
  existingNodes.forEach((node) => {
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      (node.id === CONTAINER_ID || node.id === MODAL_ID)
    ) {
      layout.appendChild(node);
    } else {
      contentWrapper.appendChild(node);
    }
  });

  layout.appendChild(contentWrapper);
  document.body.appendChild(layout);
  return layout;
}

function unwrapPageContent() {
  const layout = document.getElementById(LAYOUT_ID);
  const contentWrapper = document.getElementById(CONTENT_WRAPPER_ID);
  if (!layout || !contentWrapper) {
    return;
  }

  const fragment = document.createDocumentFragment();
  while (contentWrapper.firstChild) {
    fragment.appendChild(contentWrapper.firstChild);
  }
  document.body.insertBefore(fragment, layout);
  layout.remove();
}

function ensureOverlay() {
  const layout = wrapPageContent();
  let overlay = document.getElementById(CONTAINER_ID);
  if (overlay) {
    if (overlay.parentElement !== layout) {
      layout.insertBefore(overlay, layout.firstChild);
    }
    return overlay;
  }

  overlay = document.createElement("aside");
  overlay.id = CONTAINER_ID;

  const header = document.createElement("div");
  header.className = "cbio-tutorials-overlay__header";

  const toggleButton = document.createElement("button");
  toggleButton.type = "button";
  toggleButton.className = "cbio-tutorials-overlay__toggle";
  toggleButton.textContent = "Collapse";
  toggleButton.title = "Toggle tutorial panel";
  toggleButton.addEventListener("click", () => {
    const collapsed = overlay.classList.toggle("collapsed");
    toggleButton.textContent = collapsed ? "Expand" : "Collapse";
  });

  const titleGroup = document.createElement("div");
  titleGroup.className = "cbio-tutorials-overlay__titles";

  const brandTitleEl = document.createElement("h1");
  brandTitleEl.className = "cbio-tutorials-overlay__brand";
  brandTitleEl.textContent = "cBioPortal Navigation Helper";
  titleGroup.appendChild(brandTitleEl);

  header.appendChild(toggleButton);
  header.appendChild(titleGroup);

  const sectionsContainer = document.createElement("div");
  sectionsContainer.className = "cbio-tutorials-overlay__sections";

  overlay.appendChild(header);
  overlay.appendChild(sectionsContainer);

  overlay._refs = {
    sectionsContainer,
    toggleButton
  };

  layout.insertBefore(overlay, layout.firstChild);
  return overlay;
}

function buildInstructionSection(instruction, index, overlay, isPrimary) {
  const section = document.createElement("section");
  const sectionTitle = document.createElement("h3");
  const sectionSummary = document.createElement("h4");
  const bodyEl = document.createElement("div");
  bodyEl.className = "cbio-tutorials-overlay__body";
  bodyEl.addEventListener("click", handleMarkdownLinkClick);

  const initialMeta = instruction.meta || {};
  sectionTitle.textContent = initialMeta.title || "cBioPortal Tutorial";
  sectionSummary.textContent = initialMeta.summary || "";
  if (isPrimary) {
    applyHeaderMetadata(overlay, initialMeta);
  }

  bodyEl.textContent = "Loading instructions...";
  getInstructionMarkdown(instruction).then((markdownText) => {
    if (!bodyEl.isConnected) {
      return;
    }
    const meta = instruction.meta || {};
    sectionTitle.textContent = meta.title || "cBioPortal Tutorial";
    sectionSummary.textContent = meta.summary || "";
    if (isPrimary) {
      applyHeaderMetadata(overlay, meta);
    }
    const renderedMarkdown = renderMarkdown(markdownText);
    if (renderedMarkdown) {
      bodyEl.innerHTML = renderedMarkdown;
    } else {
      bodyEl.textContent = "Guidance will appear here once configured.";
    }
  });

  section.appendChild(sectionTitle);
  section.appendChild(sectionSummary);
  section.appendChild(bodyEl);
  section.dataset.index = String(index);
  return section;
}

function updateOverlayContent(instructionSets) {
  const overlay = ensureOverlay();
  const { sectionsContainer } = overlay._refs;

  const primary = instructionSets[0];
  if (primary && primary.meta) {
    applyHeaderMetadata(overlay, primary.meta);
  } else {
    applyHeaderMetadata(overlay, {});
  }

  sectionsContainer.textContent = "";
  instructionSets.forEach((instruction, index) => {
    sectionsContainer.appendChild(
      buildInstructionSection(instruction, index, overlay, instruction === primary)
    );
  });
}

function enableOverlay() {
  waitForBody(() => {
    injectStyles();
    ensureOverlay();
    document.body.classList.add(BODY_ACTIVE_CLASS);
    updateOverlayContent(resolveInstructionSets(window.location.href));
  });
}

function disableOverlay() {
  const overlay = document.getElementById(CONTAINER_ID);
  if (overlay && overlay.parentElement) {
    overlay.parentElement.removeChild(overlay);
  }
  document.body?.classList.remove(BODY_ACTIVE_CLASS);
  closeMarkdownModal();
  unwrapPageContent();
}

function applyState(isEnabled) {
  if (isEnabled) {
    enableOverlay();
    return;
  }
  disableOverlay();
}

function monitorUrlChanges() {
  const handleLocationChange = () => {
    if (!document.body.classList.contains(BODY_ACTIVE_CLASS)) {
      lastKnownUrl = window.location.href;
      return;
    }
    if (lastKnownUrl !== window.location.href) {
      lastKnownUrl = window.location.href;
      updateOverlayContent(resolveInstructionSets(lastKnownUrl));
    }
  };

  if (!window[HISTORY_PATCH_FLAG]) {
    ["pushState", "replaceState"].forEach((methodName) => {
      const original = history[methodName];
      history[methodName] = function patchedHistoryMethod(...args) {
        const result = original.apply(this, args);
        handleLocationChange();
        return result;
      };
    });
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    window[HISTORY_PATCH_FLAG] = true;
  }

  if (urlPollerId === null) {
    urlPollerId = window.setInterval(handleLocationChange, 1000);
  }
}

function init() {
  chrome.storage.local.get([STATE_KEY, DEFAULT_APPLIED_KEY], (result) => {
    const defaultApplied = Boolean(result[DEFAULT_APPLIED_KEY]);
    const storedValue = result[STATE_KEY];

    if (!defaultApplied) {
      chrome.storage.local.set(
        { [STATE_KEY]: true, [DEFAULT_APPLIED_KEY]: true },
        () => applyState(true)
      );
      return;
    }

    applyState(Boolean(storedValue));
  });

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "local" || !changes[STATE_KEY]) {
      return;
    }
    applyState(Boolean(changes[STATE_KEY].newValue));
  });

  monitorUrlChanges();
}

init();
