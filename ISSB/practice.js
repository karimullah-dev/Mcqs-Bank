// ============================================================================
// HARDCODED GEMINI API CONFIGURATION
// ============================================================================
const GEMINI_API_KEY = "AQ.Ab8RN6Iz2rpbZypbC_6my2-K10sHGVbeuRN4vVENAnPB8d0KCA";
const GEMINI_MODEL = "gemini-3.8-flash";

const LIKERT_SCALE = [
  { value: 1, label: "Strongly disagree", short: "SD" },
  { value: 2, label: "Disagree", short: "D" },
  { value: 3, label: "Slightly disagree", short: "SLD" },
  { value: 4, label: "Neutral / uncertain", short: "N" },
  { value: 5, label: "Slightly agree", short: "SLA" },
  { value: 6, label: "Agree", short: "A" },
  { value: 7, label: "Strongly agree", short: "SA" },
];

const TESTS = {
  opi: {
    key: "opi",
    shortTitle: "OPI Practice",
    title: "Officer Personality Inventory (OPI) — Practice",
    category: "Untimed Practice · 100 Statements",
    file: "opi.json",
    dataKey: "statements",
    itemLabel: "Statement",
    mode: "likert",
    instruction:
      "Read each statement at your own pace and select how accurately it describes you on the 7-point scale (1 = Strongly disagree to 7 = Strongly agree).",
    aiContext:
      "This is an untimed ISSB Officer Personality Inventory (OPI) practice test with 7-point Likert scale responses. Evaluate consistency, honesty, emotional stability, leadership readiness, and conscientiousness.",
  },
  wat: {
    key: "wat",
    shortTitle: "WAT Practice",
    title: "Word Association Test (WAT) — 3x Practice",
    category: "Untimed Practice · 100 Words · 3x Sentences / Word",
    file: "wat.json",
    dataKey: "wat_words",
    itemLabel: "Word",
    mode: "wat",
    instruction:
      "Untimed Practice Mode: No countdown timer. Write 3 different meaningful, action-oriented sentences for each word to train mental flexibility and fast positive association.",
    aiContext:
      "This is an untimed ISSB Word Association Test (WAT) Practice session where the candidate wrote up to 3 different sentences (Variation 1, Variation 2, Variation 3) for each stimulus word. Compare the variations, identify which one is most officer-like (natural, active, courageous, realistic vs. slogan/preachy), and suggest sharper alternatives.",
  },
  sct_eng: {
    key: "sct_eng",
    shortTitle: "SCT English Practice",
    title: "Sentence Completion Test (English) — 3x Practice",
    category: "Untimed Practice · 50 Sentences · 3x Completions / Stem",
    file: "sct_eng.json",
    dataKey: "sct_english",
    itemLabel: "Sentence",
    mode: "sct",
    instruction:
      "Untimed Practice Mode: Complete each incomplete sentence in 3 distinct ways to explore stronger, constructive mindsets. Press Enter to jump through Variation 1 → 2 → 3 → Next.",
    aiContext:
      "This is an untimed ISSB English Sentence Completion Test (SCT) Practice session where the candidate wrote up to 3 different completions (Variation 1, 2, 3) for each sentence stem. Compare all 3 completions, evaluate mindset toward responsibility, stress, and leadership, and point out the strongest completion.",
  },
  sct_urdu: {
    key: "sct_urdu",
    shortTitle: "SCT Urdu Practice",
    title: "Sentence Completion Test (Urdu / Roman) — 3x Practice",
    category: "Untimed Practice · 50 Sentences · 3x Completions / Stem",
    file: "sct_urdu.json",
    dataKey: "sct_hinglish",
    itemLabel: "Sentence",
    mode: "sct",
    instruction:
      "Untimed Practice Mode: Har sentence ko 3 mukhtalif tareeqon se mukammal karein taake aapki soch mazeed tez aur positive ho. Enter daba kar Variation 1 → 2 → 3 → Next par jayein.",
    aiContext:
      "This is an untimed ISSB Urdu (Roman Urdu / Hinglish) Sentence Completion Test (SCT) Practice session where the candidate wrote up to 3 different completions per stem. Compare the 3 variations, evaluate emotional maturity and leadership attitude, and highlight the best officer-like completion.",
  },
  pointer: {
    key: "pointer",
    shortTitle: "Pointer Practice",
    title: "Pointer Story Completion — 3x Story Angles",
    category: "Untimed Practice · 5 Stories · 3x Plots / Prompt",
    file: "pointer.json",
    dataKey: "pointer_stories",
    itemLabel: "Story",
    mode: "story",
    instruction:
      "Untimed Practice Mode: Brainstorm and write 3 different realistic story approaches/plots for the pointer starter above to sharpen creative tactical problem-solving.",
    aiContext:
      "This is an untimed ISSB Pointer Story Practice session where the candidate wrote up to 3 different story variations/angles for each prompt. Compare the plots for realism, initiative, courage, practical execution, and constructive resolution.",
  },
  srt: {
    key: "srt",
    shortTitle: "SRT Practice",
    title: "Situation Reaction Test (SRT) — 3x Action Plans",
    category: "Untimed Practice · 10 Situations · 3x Reactions / Case",
    file: "srt.json",
    dataKey: "srt_situations",
    itemLabel: "Situation",
    mode: "srt",
    instruction:
      "Untimed Practice Mode: Practice writing 3 distinct practical courses of action for each dilemma—compare different prioritizations, resourcefulness, and calm execution.",
    aiContext:
      "This is an untimed ISSB Situation Reaction Test (SRT) Practice session where the candidate wrote up to 3 distinct tactical courses of action per dilemma. Compare the 3 approaches, evaluate ethics, prioritization of human life, practicality, and decisiveness, and recommend the best reaction.",
  },
};

const VARIATION_META = {
  wat: [
    { badge: "Variation 1", hint: "Positive / Action Sentence" },
    { badge: "Variation 2", hint: "Leadership / Responsibility Angle" },
    { badge: "Variation 3", hint: "Creative / Everyday Practical Sentence" },
  ],
  sct: [
    { badge: "Variation 1", hint: "Spontaneous Positive Completion" },
    { badge: "Variation 2", hint: "Action & Duty Orientation" },
    { badge: "Variation 3", hint: "Resilience & Growth Angle" },
  ],
  story: [
    { badge: "Variation 1", hint: "Primary Story Approach" },
    { badge: "Variation 2", hint: "Alternative Tactical / Leadership Angle" },
    { badge: "Variation 3", hint: "Third Realistic Resolution" },
  ],
  srt: [
    { badge: "Variation 1", hint: "Immediate Direct Action Plan" },
    { badge: "Variation 2", hint: "Team / Coordination Approach" },
    { badge: "Variation 3", hint: "Contingency / Alternative Response" },
  ],
};

const state = {
  testKey: new URLSearchParams(window.location.search).get("test") || "wat",
  items: [],
  currentIndex: 0,
  answers: [],
  completed: false,
  autoAdvance: true,
  mapOpen: false,
  reportOpen: false,
  onlyAnsweredInReport: true,
  aiEvaluation: null,
};

const elements = {
  activeTestShort: document.querySelector("#active-test-short"),
  toggleReportButton: document.querySelector("#toggle-report-button"),
  resetButton: document.querySelector("#reset-button"),
  testTabs: document.querySelectorAll(".test-tab"),
  testCategoryLabel: document.querySelector("#test-category-label"),
  progressLabel: document.querySelector("#progress-label"),
  variationsCountPill: document.querySelector("#variations-count-pill"),
  progressFill: document.querySelector("#progress-fill"),
  answeredCount: document.querySelector("#answered-count"),
  remainingCount: document.querySelector("#remaining-count"),
  saveStatus: document.querySelector("#save-status"),
  mapToggleButton: document.querySelector("#map-toggle-button"),
  questionMap: document.querySelector("#question-map"),
  simulatorCard: document.querySelector("#simulator-card"),
  itemNumber: document.querySelector("#item-number"),
  testPill: document.querySelector("#test-pill"),
  modeControls: document.querySelector("#mode-controls"),
  testInstruction: document.querySelector("#test-instruction"),
  promptStage: document.querySelector("#prompt-stage"),
  promptText: document.querySelector("#prompt-text"),
  responseStage: document.querySelector("#response-stage"),
  previousButton: document.querySelector("#previous-button"),
  nextButton: document.querySelector("#next-button"),
  keyboardHint: document.querySelector("#keyboard-hint"),
  reportCard: document.querySelector("#report-card"),
  reportTitle: document.querySelector("#report-title"),
  reportSummaryText: document.querySelector("#report-summary-text"),
  backToSimButton: document.querySelector("#back-to-sim-button"),
  reportMetricsGrid: document.querySelector("#report-metrics-grid"),
  analyzeGeminiButton: document.querySelector("#analyze-gemini-button"),
  geminiError: document.querySelector("#gemini-error"),
  geminiLoading: document.querySelector("#gemini-loading"),
  geminiResultContainer: document.querySelector("#gemini-result-container"),
  onlyAnsweredCheckbox: document.querySelector("#only-answered-checkbox"),
  copyAiButton: document.querySelector("#copy-ai-button"),
  downloadMdButton: document.querySelector("#download-md-button"),
  downloadTxtButton: document.querySelector("#download-txt-button"),
  downloadJsonButton: document.querySelector("#download-json-button"),
  aiPromptPreview: document.querySelector("#ai-prompt-preview"),
  qaTableCount: document.querySelector("#qa-table-count"),
  qaList: document.querySelector("#qa-list"),
  loadingError: document.querySelector("#loading-error"),
};

function getTestConfig() {
  return TESTS[state.testKey] || TESTS.wat;
}

function getStorageKey(testKey = state.testKey) {
  return `issb-practice-v1-${testKey}`;
}

function normalizeEntry(raw) {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const vars = Array.isArray(raw.variations) ? raw.variations : [];
    return {
      rating: raw.rating !== null && raw.rating !== undefined && raw.rating !== "" ? Number(raw.rating) : null,
      variations: [
        String(vars[0] ?? ""),
        String(vars[1] ?? ""),
        String(vars[2] ?? ""),
      ],
    };
  }
  if (Array.isArray(raw)) {
    return {
      rating: null,
      variations: [String(raw[0] ?? ""), String(raw[1] ?? ""), String(raw[2] ?? "")],
    };
  }
  if (typeof raw === "number") {
    return { rating: raw, variations: ["", "", ""] };
  }
  if (typeof raw === "string" && raw.trim() !== "") {
    return { rating: null, variations: [raw, "", ""] };
  }
  return { rating: null, variations: ["", "", ""] };
}

function getEntry(index) {
  const normalized = normalizeEntry(state.answers[index]);
  state.answers[index] = normalized;
  return normalized;
}

function getFilledVariationsCount(index) {
  const entry = normalizeEntry(state.answers[index]);
  return entry.variations.filter((v) => String(v).trim() !== "").length;
}

function isEntryAnswered(rawEntry, mode = getTestConfig().mode) {
  const entry = normalizeEntry(rawEntry);
  const hasVar = entry.variations.some((v) => String(v).trim() !== "");
  if (mode === "likert") {
    return entry.rating !== null || hasVar;
  }
  return hasVar;
}

function isAnsweredIndex(index) {
  return isEntryAnswered(state.answers[index]);
}

function getTotalVariationsWritten() {
  return state.answers.reduce((sum, raw) => {
    const entry = normalizeEntry(raw);
    return sum + entry.variations.filter((v) => String(v).trim() !== "").length;
  }, 0);
}

function countWords(text) {
  const trimmed = String(text || "").trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function saveState() {
  try {
    const payload = {
      currentIndex: state.currentIndex,
      answers: state.answers,
      completed: state.completed,
      autoAdvance: state.autoAdvance,
      aiEvaluation: state.aiEvaluation,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(getStorageKey(), JSON.stringify(payload));
    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    elements.saveStatus.textContent = `Saved ${timeStr}`;
  } catch (_) {}
}

function restoreState(itemCount) {
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(getStorageKey()) || "null");
  } catch (_) {}

  state.currentIndex = saved?.currentIndex ? Math.min(saved.currentIndex, itemCount - 1) : 0;
  state.answers = Array.from({ length: itemCount }, (_, i) =>
    normalizeEntry(saved && Array.isArray(saved.answers) ? saved.answers[i] : null)
  );
  state.completed = Boolean(saved?.completed);
  state.autoAdvance = typeof saved?.autoAdvance === "boolean" ? saved.autoAdvance : true;
  state.aiEvaluation = saved?.aiEvaluation || null;
}

async function loadTest(testKey) {
  if (!TESTS[testKey]) testKey = "wat";
  state.testKey = testKey;
  state.reportOpen = false;

  const url = new URL(window.location.href);
  url.searchParams.set("test", testKey);
  window.history.replaceState({}, "", url);

  elements.testTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.test === testKey);
  });

  const config = getTestConfig();
  document.title = `${config.shortTitle} | ISSB Untimed 3x Practice`;
  elements.activeTestShort.textContent = config.title;
  elements.loadingError.classList.add("hidden");

  try {
    const response = await fetch(config.file);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const raw = await response.json();
    const list = raw[config.dataKey];
    if (!Array.isArray(list) || !list.length) {
      throw new Error(`Invalid data format in ${config.file}`);
    }
    state.items = list;
    restoreState(list.length);
    if (state.completed) {
      openReportView();
    } else {
      closeReportView();
      renderSimulator();
    }
    saveState();
  } catch (error) {
    console.error("Failed to load ISSB practice data:", error);
    elements.simulatorCard.classList.add("hidden");
    elements.reportCard.classList.add("hidden");
    elements.loadingError.classList.remove("hidden");
  }
}

function renderProgressHeader() {
  const config = getTestConfig();
  const total = state.items.length;
  const answered = state.answers.filter((a) => isEntryAnswered(a, config.mode)).length;
  const totalVars = getTotalVariationsWritten();
  const pct = total ? Math.round((answered / total) * 100) : 0;

  elements.testCategoryLabel.textContent = config.category;
  elements.progressLabel.textContent = `${config.itemLabel} ${Math.min(
    state.currentIndex + 1,
    total
  )} of ${total}`;
  elements.progressFill.style.width = `${pct}%`;
  elements.answeredCount.textContent = answered;
  elements.remainingCount.textContent = Math.max(0, total - answered);
  elements.variationsCountPill.textContent =
    config.mode === "likert"
      ? "Untimed · 7-Point Scale"
      : `Untimed · ${totalVars} / ${total * 3} Variations`;
}

function renderQuestionMap() {
  elements.questionMap.classList.toggle("hidden", !state.mapOpen);
  elements.mapToggleButton.textContent = state.mapOpen ? "Hide Map ▴" : "Question Map ▾";
  if (!state.mapOpen) return;

  const config = getTestConfig();
  elements.questionMap.replaceChildren();
  state.items.forEach((_, idx) => {
    const filledVars = getFilledVariationsCount(idx);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "map-dot";
    if (idx === state.currentIndex) btn.classList.add("current");
    if (isEntryAnswered(state.answers[idx], config.mode)) btn.classList.add("answered");
    if (config.mode !== "likert" && filledVars === 3) btn.classList.add("all-three-done");
    btn.textContent = idx + 1;
    btn.title =
      config.mode === "likert"
        ? `${config.itemLabel} ${idx + 1}`
        : `${config.itemLabel} ${idx + 1} (${filledVars}/3 variations)`;
    btn.addEventListener("click", () => {
      goToIndex(idx);
    });
    elements.questionMap.append(btn);
  });
}

function renderItemVariationBadge() {
  const config = getTestConfig();
  elements.modeControls.replaceChildren();

  if (config.mode === "likert") {
    const entry = getEntry(state.currentIndex);
    const label = document.createElement("label");
    label.className = "mode-toggle-pill";
    label.innerHTML = `<input type="checkbox" ${state.autoAdvance ? "checked" : ""} /> <span>Auto-advance on select</span>`;
    label.querySelector("input").addEventListener("change", (e) => {
      state.autoAdvance = e.target.checked;
      saveState();
    });

    const statusPill = document.createElement("span");
    statusPill.className = `practice-item-status-pill ${entry.rating !== null ? "all-done" : ""}`;
    statusPill.textContent = entry.rating !== null ? `✓ Selected (${entry.rating}/7)` : "Select 1–7";

    elements.modeControls.append(label, statusPill);
    return;
  }

  const filled = getFilledVariationsCount(state.currentIndex);
  const statusPill = document.createElement("span");
  statusPill.className = `practice-item-status-pill ${filled === 3 ? "all-done" : filled > 0 ? "partial" : ""}`;
  statusPill.textContent =
    filled === 3 ? "✓ 3 / 3 Variations Complete" : `${filled} / 3 Variations Written`;
  elements.modeControls.append(statusPill);
}

function createVariationCard({
  variationIndex,
  badgeText,
  hintText,
  value,
  isTextarea,
  rows,
  placeholder,
  previewStem = null,
  onInput,
  onAdvanceField,
  inputRefList,
}) {
  const card = document.createElement("div");
  card.className = `variation-field-card ${String(value || "").trim() ? "is-filled" : ""}`;

  const header = document.createElement("div");
  header.className = "variation-header";

  const left = document.createElement("div");
  left.className = "variation-title-group";
  left.innerHTML = `<span class="variation-badge">${escapeHtml(badgeText)}</span><span class="variation-hint">${escapeHtml(hintText)}</span>`;

  const wordCounter = document.createElement("span");
  wordCounter.className = "variation-word-count";
  wordCounter.textContent = `${countWords(value)} words`;

  header.append(left, wordCounter);
  card.append(header);

  let previewEl = null;
  const updatePreview = (val) => {
    if (!previewEl || previewStem === null) return;
    const completion = String(val || "").trim();
    previewEl.innerHTML = `<span class="sct-stem-part">${escapeHtml(previewStem)}</span> <strong class="sct-user-part">${
      completion ? escapeHtml(completion) : "…"
    }</strong>`;
  };

  if (previewStem !== null) {
    previewEl = document.createElement("div");
    previewEl.className = "sct-live-preview variation-sct-preview";
    updatePreview(value);
    card.append(previewEl);
  }

  let field;
  if (isTextarea) {
    field = document.createElement("textarea");
    field.className = "sim-textarea practice-variation-textarea";
    field.rows = rows || 4;
  } else {
    field = document.createElement("input");
    field.type = "text";
    field.className = "sim-text-input practice-variation-input";
    field.autocomplete = "off";
  }
  field.placeholder = placeholder;
  field.value = value || "";
  field.dataset.variationIndex = String(variationIndex);
  inputRefList.push(field);

  field.addEventListener("input", () => {
    const val = field.value;
    card.classList.toggle("is-filled", val.trim() !== "");
    wordCounter.textContent = `${countWords(val)} words`;
    updatePreview(val);
    onInput(val);
  });

  field.addEventListener("keydown", (e) => {
    if (!isTextarea && e.key === "Enter") {
      e.preventDefault();
      onAdvanceField(variationIndex);
    } else if (isTextarea && (e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      onAdvanceField(variationIndex);
    }
  });

  card.append(field);
  return card;
}

function renderSimulator() {
  const config = getTestConfig();
  const total = state.items.length;
  const prompt = state.items[state.currentIndex];
  const entry = getEntry(state.currentIndex);

  renderProgressHeader();
  renderQuestionMap();
  renderItemVariationBadge();

  elements.itemNumber.textContent = `${config.itemLabel} ${String(
    state.currentIndex + 1
  ).padStart(2, "0")} of ${total}`;
  elements.testPill.textContent = config.shortTitle;
  elements.testInstruction.textContent = config.instruction;

  elements.promptStage.className = `prompt-stage mode-${config.mode}`;
  if (config.mode === "wat") {
    elements.promptStage.innerHTML = `
      <div class="wat-projector-shell practice-wat-shell">
        <div class="wat-projector-header">
          <div class="wat-stage-timer-pill practice-no-timer-pill">
            <span class="wat-timer-icon" aria-hidden="true">∞</span>
            <strong class="wat-timer-val">UNTIMED</strong>
            <span class="wat-timer-label">3x VARIATIONS</span>
          </div>
          <div class="wat-header-right">
            <span class="wat-counter-badge">WORD ${String(state.currentIndex + 1).padStart(2, "0")} / ${total}</span>
          </div>
        </div>
        <h2 id="prompt-text" class="wat-word-display">${escapeHtml(prompt)}</h2>
      </div>
    `;
    elements.promptText = document.querySelector("#prompt-text");
  } else {
    elements.promptStage.innerHTML = `<h2 id="prompt-text">${escapeHtml(prompt)}</h2>`;
    elements.promptText = document.querySelector("#prompt-text");
  }

  elements.responseStage.replaceChildren();
  const inputRefs = [];

  const handleVariationAdvance = (varIdx) => {
    if (varIdx < 2 && inputRefs[varIdx + 1]) {
      inputRefs[varIdx + 1].focus();
    } else {
      nextItem();
    }
  };

  if (config.mode === "likert") {
    elements.keyboardHint.textContent = "Tip: Press keys 1–7 to select an option";
    const grid = document.createElement("div");
    grid.className = "likert-options";
    grid.setAttribute("role", "radiogroup");

    LIKERT_SCALE.forEach((item) => {
      const option = document.createElement("label");
      option.className = "likert-option";
      const checked = Number(entry.rating) === item.value;
      option.innerHTML = `
        <span class="likert-key-badge">${item.value}</span>
        <input type="radio" name="opi-practice-response" value="${item.value}" ${checked ? "checked" : ""} />
        <span class="likert-label-text">${item.label}</span>
      `;
      option.querySelector("input").addEventListener("change", () => {
        selectLikertValue(item.value);
      });
      grid.append(option);
    });
    elements.responseStage.append(grid);
  } else if (config.mode === "wat") {
    elements.keyboardHint.textContent = "Press Enter: Variation 1 → 2 → 3 → Next Word";
    const varGrid = document.createElement("div");
    varGrid.className = "practice-variations-grid";

    VARIATION_META.wat.forEach((meta, vIdx) => {
      varGrid.append(
        createVariationCard({
          variationIndex: vIdx,
          badgeText: meta.badge,
          hintText: meta.hint,
          value: entry.variations[vIdx],
          isTextarea: false,
          placeholder: `Write sentence ${vIdx + 1} for "${prompt}"…`,
          onInput: (val) => {
            entry.variations[vIdx] = val;
            saveState();
            updateCountersOnly();
          },
          onAdvanceField: handleVariationAdvance,
          inputRefList: inputRefs,
        })
      );
    });
    elements.responseStage.append(varGrid);
    setTimeout(() => inputRefs[0]?.focus(), 20);
  } else if (config.mode === "sct") {
    elements.keyboardHint.textContent = "Press Enter: Variation 1 → 2 → 3 → Next Sentence";
    const stemClean = prompt.replace(/\.{2,}$/, "").trim();
    const varGrid = document.createElement("div");
    varGrid.className = "practice-variations-grid";

    VARIATION_META.sct.forEach((meta, vIdx) => {
      varGrid.append(
        createVariationCard({
          variationIndex: vIdx,
          badgeText: meta.badge,
          hintText: meta.hint,
          value: entry.variations[vIdx],
          isTextarea: false,
          previewStem: stemClean,
          placeholder:
            state.testKey === "sct_urdu"
              ? `Variation ${vIdx + 1}: Sentence mukammal karein…`
              : `Variation ${vIdx + 1}: Complete the sentence differently…`,
          onInput: (val) => {
            entry.variations[vIdx] = val;
            saveState();
            updateCountersOnly();
          },
          onAdvanceField: handleVariationAdvance,
          inputRefList: inputRefs,
        })
      );
    });
    elements.responseStage.append(varGrid);
    setTimeout(() => inputRefs[0]?.focus(), 20);
  } else if (config.mode === "story" || config.mode === "srt") {
    elements.keyboardHint.textContent = "Ctrl + Enter to jump to next variation / case";
    const metaList = config.mode === "story" ? VARIATION_META.story : VARIATION_META.srt;
    const varGrid = document.createElement("div");
    varGrid.className = "practice-variations-grid";

    metaList.forEach((meta, vIdx) => {
      varGrid.append(
        createVariationCard({
          variationIndex: vIdx,
          badgeText: meta.badge,
          hintText: meta.hint,
          value: entry.variations[vIdx],
          isTextarea: true,
          rows: config.mode === "story" ? 5 : 4,
          placeholder:
            config.mode === "story"
              ? `${meta.badge}: Write story version ${vIdx + 1} with action, initiative, and outcome…`
              : `${meta.badge}: Write practical reaction option ${vIdx + 1} step-by-step…`,
          onInput: (val) => {
            entry.variations[vIdx] = val;
            saveState();
            updateCountersOnly();
          },
          onAdvanceField: handleVariationAdvance,
          inputRefList: inputRefs,
        })
      );
    });
    elements.responseStage.append(varGrid);
    setTimeout(() => inputRefs[0]?.focus(), 20);
  }

  elements.previousButton.disabled = state.currentIndex === 0;
  elements.nextButton.textContent =
    state.currentIndex === total - 1
      ? "Finish & View AI Report →"
      : `Next ${config.itemLabel.toLowerCase()} →`;
}

function updateCountersOnly() {
  const config = getTestConfig();
  const total = state.items.length;
  const answered = state.answers.filter((a) => isEntryAnswered(a, config.mode)).length;
  const totalVars = getTotalVariationsWritten();
  const pct = total ? Math.round((answered / total) * 100) : 0;

  elements.progressFill.style.width = `${pct}%`;
  elements.answeredCount.textContent = answered;
  elements.remainingCount.textContent = Math.max(0, total - answered);
  elements.variationsCountPill.textContent =
    config.mode === "likert"
      ? "Untimed · 7-Point Scale"
      : `Untimed · ${totalVars} / ${total * 3} Variations`;
  renderItemVariationBadge();
  if (state.mapOpen) renderQuestionMap();
}

function selectLikertValue(val) {
  const entry = getEntry(state.currentIndex);
  entry.rating = Number(val);
  saveState();
  renderSimulator();
  if (state.autoAdvance && state.currentIndex < state.items.length - 1) {
    setTimeout(() => {
      goToIndex(state.currentIndex + 1);
    }, 180);
  }
}

function goToIndex(index) {
  if (index < 0 || index >= state.items.length) return;
  state.currentIndex = index;
  saveState();
  if (state.reportOpen) closeReportView();
  renderSimulator();
}

function nextItem() {
  if (state.currentIndex >= state.items.length - 1) {
    state.completed = true;
    saveState();
    openReportView();
    return;
  }
  goToIndex(state.currentIndex + 1);
}

function previousItem() {
  if (state.currentIndex > 0) {
    goToIndex(state.currentIndex - 1);
  }
}

function formatEntryForReport(index) {
  const config = getTestConfig();
  const prompt = state.items[index];
  const entry = normalizeEntry(state.answers[index]);
  const answered = isEntryAnswered(entry, config.mode);

  if (!answered) {
    return {
      answered: false,
      ratingText: null,
      variations: [],
      combinedSummary: "[Not Practiced]",
    };
  }

  let ratingText = null;
  if (config.mode === "likert" && entry.rating !== null) {
    const found = LIKERT_SCALE.find((s) => s.value === Number(entry.rating));
    ratingText = found ? `${found.label} (${found.value}/7)` : `${entry.rating}/7`;
  }

  const stemClean = prompt.replace(/\.{2,}$/, "").trim();
  const variations = entry.variations
    .map((v, i) => {
      const trimmed = String(v || "").trim();
      if (!trimmed) return null;
      const fullSentence =
        config.mode === "sct" || config.mode === "story" ? `${stemClean} ${trimmed}` : trimmed;
      return {
        slot: i + 1,
        raw: trimmed,
        fullSentence,
      };
    })
    .filter(Boolean);

  const parts = [];
  if (ratingText) parts.push(`Rating: ${ratingText}`);
  variations.forEach((v) => {
    parts.push(`Variation ${v.slot}: ${v.raw}`);
  });

  return {
    answered: true,
    ratingText,
    variations,
    combinedSummary: parts.join(" | "),
  };
}

function buildStructuredReportData() {
  const config = getTestConfig();
  const total = state.items.length;

  const allEntries = state.items.map((prompt, idx) => {
    const formatted = formatEntryForReport(idx);
    return {
      questionNumber: idx + 1,
      question: prompt,
      ratingText: formatted.ratingText,
      variations: formatted.variations,
      candidateAnswer: formatted.combinedSummary,
      answered: formatted.answered,
    };
  });

  const filteredEntries = state.onlyAnsweredInReport
    ? allEntries.filter((e) => e.answered)
    : allEntries;

  const entriesToUse = filteredEntries.length > 0 ? filteredEntries : allEntries;
  const answeredCount = allEntries.filter((e) => e.answered).length;
  const totalVars = getTotalVariationsWritten();
  const completeThreeCount = state.answers.filter(
    (raw) => normalizeEntry(raw).variations.filter((v) => String(v).trim() !== "").length === 3
  ).length;

  return {
    testKey: config.key,
    mode: "untimed-practice-3x",
    testTitle: config.title,
    category: config.category,
    aiAssessmentInstructions: config.aiContext,
    exportedAt: new Date().toISOString(),
    summary: {
      totalQuestions: total,
      answeredQuestions: answeredCount,
      unansweredQuestions: total - answeredCount,
      completionPercentage: Math.round((answeredCount / total) * 100),
      totalVariationsWritten: totalVars,
      maxVariationsPossible: total * 3,
      itemsWithAllThreeVariations: completeThreeCount,
    },
    aiEvaluationResult: state.aiEvaluation || null,
    questionAndAnswers: entriesToUse.map((item) => ({
      number: item.questionNumber,
      question: item.question,
      ...(item.ratingText ? { likertRating: item.ratingText } : {}),
      variations: item.variations,
      candidateAnswer: item.candidateAnswer,
    })),
  };
}

function buildAiPromptMarkdown() {
  const report = buildStructuredReportData();

  const header = [
    `# ISSB Practice Report (Untimed · 3x Variations) — ${report.testTitle}`,
    ``,
    `## Instructions for AI Assessor (ChatGPT / Claude / Gemini)`,
    `You are an experienced **ISSB Senior Psychologist**. Below is a candidate's untimed brain-sharpening practice session where they wrote up to **3 different variations** per prompt.`,
    ``,
    `${report.aiAssessmentInstructions}`,
    ``,
    `Please provide a comprehensive assessment covering:`,
    `1. **Overall Mental Flexibility & Verdict**: How well the candidate generates constructive, natural, officer-like variations.`,
    `2. **Officer Like Qualities (OLQs) Profile**: Rate (1–10) Emotional Stability, Courage, Initiative, Practical Intelligence, Sense of Responsibility, Integrity, and Social Adjustment.`,
    `3. **Variation-by-Variation Comparison**: For each practiced question, identify which variation (1, 2, or 3) is strongest and explain why any variation is weak, repetitive, or bookish.`,
    `4. **Sharper Upgraded Example**: Provide an ideal natural officer-like version for weaker items.`,
    ``,
    `---`,
    ``,
    `## Practice Summary`,
    `- **Module**: ${report.testTitle}`,
    `- **Items Practiced**: ${report.summary.answeredQuestions} of ${report.summary.totalQuestions} (${report.summary.completionPercentage}%)`,
    `- **Total Variations Written**: ${report.summary.totalVariationsWritten} of ${report.summary.maxVariationsPossible}`,
    `- **Items with All 3 Variations**: ${report.summary.itemsWithAllThreeVariations}`,
    `- **Exported At**: ${new Date(report.exportedAt).toLocaleString()}`,
    ``,
    `---`,
    ``,
    `## Candidate Prompts & 3x Variations`,
    ``,
  ];

  const qaLines = report.questionAndAnswers.map((item) => {
    const lines = [`### Q${item.number}. ${item.question}`];
    if (item.likertRating) {
      lines.push(`- **Likert Rating**: ${item.likertRating}`);
    }
    if (item.variations.length > 0) {
      item.variations.forEach((v) => {
        const text =
          v.fullSentence !== v.raw ? `${v.raw} *(Full: ${v.fullSentence})*` : v.raw;
        lines.push(`- **Variation ${v.slot}**: ${text}`);
      });
    } else if (!item.likertRating) {
      lines.push(`- **Status**: [Not Practiced]`);
    }
    return lines.join("\n");
  });

  return header.concat(qaLines).join("\n\n") + "\n";
}

function renderGeminiResultCard() {
  const evaluation = state.aiEvaluation;
  if (!evaluation) {
    elements.geminiResultContainer.classList.add("hidden");
    elements.geminiResultContainer.replaceChildren();
    elements.analyzeGeminiButton.textContent = "✦ Analyze All Variations with Gemini AI";
    return;
  }

  elements.analyzeGeminiButton.textContent = "↻ Re-Analyze Variations with Gemini AI";
  elements.geminiResultContainer.classList.remove("hidden");

  const verdictClass =
    evaluation.verdict === "Recommended"
      ? "verdict-recommended"
      : evaluation.verdict === "Borderline"
        ? "verdict-borderline"
        : "verdict-improve";

  const olqHtml = (evaluation.olqScores || [])
    .map(
      (olq) => `
      <div class="olq-score-card">
        <div class="olq-score-top">
          <strong>${escapeHtml(olq.quality)}</strong>
          <span class="olq-score-num">${Number(olq.score) || 0}/10</span>
        </div>
        <div class="olq-bar-track">
          <div class="olq-bar-fill" style="width: ${Math.min(100, Math.max(0, (Number(olq.score) || 0) * 10))}%"></div>
        </div>
        <p class="olq-note">${escapeHtml(olq.comment)}</p>
      </div>
    `
    )
    .join("");

  const strengthsHtml = (evaluation.strengths || [])
    .map((s) => `<li>${escapeHtml(s)}</li>`)
    .join("");

  const weaknessesHtml = (evaluation.redFlagsAndWeaknesses || [])
    .map((w) => `<li>${escapeHtml(w)}</li>`)
    .join("");

  const critiquesHtml = (evaluation.questionReviews || [])
    .map(
      (rev) => `
      <div class="ai-review-item">
        <div class="ai-review-head">
          <span class="qa-number">Q${escapeHtml(rev.questionNumber)}</span>
          <span class="review-rating-tag ${rev.rating === "Strong" ? "tag-strong" : "tag-needs-work"}">
            ${escapeHtml(rev.rating)}
          </span>
        </div>
        <p class="review-prompt"><strong>Prompt:</strong> ${escapeHtml(rev.question)}</p>
        <p class="review-user-ans"><strong>Your Variations:</strong> ${escapeHtml(rev.candidateAnswer)}</p>
        <p class="review-analysis"><strong>Psychologist Comparison:</strong> ${escapeHtml(rev.psychologistFeedback)}</p>
        ${
          rev.betterSuggestedAnswer
            ? `<p class="review-better"><strong>Suggested Sharpest Response:</strong> ${escapeHtml(rev.betterSuggestedAnswer)}</p>`
            : ""
        }
      </div>
    `
    )
    .join("");

  elements.geminiResultContainer.innerHTML = `
    <div class="gemini-assessment-box">
      <div class="assessment-verdict-row">
        <div>
          <span class="verdict-pill ${verdictClass}">${escapeHtml(evaluation.verdict || "Evaluated")}</span>
          <h4 class="assessment-headline">${escapeHtml(evaluation.headline || "Practice Profile Summary")}</h4>
        </div>
        <div class="overall-score-circle">
          <span class="score-big">${Number(evaluation.overallScoreOutOf100) || 0}</span>
          <span class="score-sub">/ 100</span>
        </div>
      </div>

      <p class="assessment-summary-para">${escapeHtml(evaluation.overallPsychologicalSummary)}</p>

      <div class="olq-section">
        <h5>Officer Like Qualities (OLQ) Scorecard</h5>
        <div class="olq-grid">${olqHtml}</div>
      </div>

      <div class="sw-grid">
        <div class="sw-card sw-strengths">
          <h5>✓ Key Strengths Observed</h5>
          <ul>${strengthsHtml || "<li>No specific strengths listed.</li>"}</ul>
        </div>
        <div class="sw-card sw-weaknesses">
          <h5>⚠ Areas to Sharpen</h5>
          <ul>${weaknessesHtml || "<li>No major issues detected.</li>"}</ul>
        </div>
      </div>

      ${
        critiquesHtml
          ? `<div class="question-critiques-section">
              <h5>Question-by-Question Variation Critique &amp; Best Options</h5>
              <div class="critiques-list">${critiquesHtml}</div>
            </div>`
          : ""
      }
    </div>
  `;
}

async function analyzeWithGemini() {
  elements.geminiError.classList.add("hidden");

  if (!GEMINI_API_KEY || !GEMINI_API_KEY.trim()) {
    elements.geminiError.textContent =
      "Please set your GEMINI_API_KEY at the top of ISSB/practice.js first.";
    elements.geminiError.classList.remove("hidden");
    return;
  }

  const config = getTestConfig();
  const answeredCount = state.answers.filter((a) => isEntryAnswered(a, config.mode)).length;
  if (answeredCount === 0) {
    elements.geminiError.textContent =
      "Please practice at least 1 item before requesting a Gemini AI assessment.";
    elements.geminiError.classList.remove("hidden");
    return;
  }

  const report = buildStructuredReportData();
  elements.geminiLoading.classList.remove("hidden");
  elements.analyzeGeminiButton.disabled = true;

  const systemPrompt = `You are a Senior ISSB Psychologist evaluating a candidate's untimed 3-variation practice session for ${report.testTitle}.
${report.aiAssessmentInstructions}
Compare the candidate's variations (Variation 1, Variation 2, Variation 3) for each practiced question and return a structured JSON evaluation.`;

  const qaPayload = report.questionAndAnswers
    .filter((q) => q.candidateAnswer !== "[Not Practiced]")
    .map(
      (q) => `Q${q.number} | Prompt: "${q.question}" | Candidate Variations: "${q.candidateAnswer}"`
    )
    .join("\n");

  const responseSchema = {
    type: "object",
    properties: {
      verdict: {
        type: "string",
        enum: ["Recommended", "Borderline", "Needs Improvement"],
      },
      overallScoreOutOf100: { type: "integer" },
      headline: { type: "string" },
      overallPsychologicalSummary: { type: "string" },
      olqScores: {
        type: "array",
        items: {
          type: "object",
          properties: {
            quality: { type: "string" },
            score: { type: "integer" },
            comment: { type: "string" },
          },
          required: ["quality", "score", "comment"],
        },
      },
      strengths: {
        type: "array",
        items: { type: "string" },
      },
      redFlagsAndWeaknesses: {
        type: "array",
        items: { type: "string" },
      },
      questionReviews: {
        type: "array",
        items: {
          type: "object",
          properties: {
            questionNumber: { type: "integer" },
            question: { type: "string" },
            candidateAnswer: { type: "string" },
            rating: { type: "string", enum: ["Strong", "Needs Improvement"] },
            psychologistFeedback: { type: "string" },
            betterSuggestedAnswer: { type: "string" },
          },
          required: [
            "questionNumber",
            "question",
            "candidateAnswer",
            "rating",
            "psychologistFeedback",
            "betterSuggestedAnswer",
          ],
        },
      },
    },
    required: [
      "verdict",
      "overallScoreOutOf100",
      "headline",
      "overallPsychologicalSummary",
      "olqScores",
      "strengths",
      "redFlagsAndWeaknesses",
      "questionReviews",
    ],
  };

  try {
    const requestPayload = {
      model: GEMINI_MODEL,
      system_instruction: systemPrompt,
      input: `Evaluate the following ${report.summary.answeredQuestions} practiced items (${report.summary.totalVariationsWritten} total variations) from ${report.testTitle}:\n\n${qaPayload}`,
      generation_config: {
        temperature: 0.3,
      },
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: responseSchema,
      },
    };

    const apiKey = GEMINI_API_KEY.trim();

    let res = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey,
        payload: requestPayload,
      }),
    });

    if (res.status === 404 || res.status === 405) {
      const directEndpoint = `https://generativelanguage.googleapis.com/v1beta/interactions?key=${encodeURIComponent(
        apiKey
      )}`;
      res = await fetch(directEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });
    }

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody?.error?.message || `Gemini API returned HTTP ${res.status}`);
    }

    const data = await res.json();
    const modelStep = (data?.steps || []).find((s) => s.type === "model_output");
    const textPart = (modelStep?.content || []).find((c) => c.type === "text");
    const rawText = textPart?.text || data?.outputs?.[0]?.text;
    if (!rawText) {
      throw new Error("Gemini returned an empty response.");
    }

    const parsed = JSON.parse(rawText);
    state.aiEvaluation = parsed;
    saveState();
    renderGeminiResultCard();
  } catch (error) {
    console.error("Gemini evaluation failed:", error);
    elements.geminiError.textContent = `Gemini Evaluation Error: ${error.message}`;
    elements.geminiError.classList.remove("hidden");
  } finally {
    elements.geminiLoading.classList.add("hidden");
    elements.analyzeGeminiButton.disabled = false;
  }
}

function openReportView() {
  state.reportOpen = true;
  elements.simulatorCard.classList.add("hidden");
  elements.reportCard.classList.remove("hidden");
  elements.toggleReportButton.textContent = "← Back to Practice";
  renderReportView();
}

function closeReportView() {
  state.reportOpen = false;
  elements.reportCard.classList.add("hidden");
  elements.simulatorCard.classList.remove("hidden");
  elements.toggleReportButton.textContent = "AI Report & Export";
  renderSimulator();
}

function renderReportView() {
  const report = buildStructuredReportData();
  const config = getTestConfig();
  const isLikert = config.mode === "likert";

  elements.reportTitle.textContent = isLikert
    ? `${config.title} — Practice Report`
    : `${config.title} — 3x Practice Report`;
  elements.reportSummaryText.textContent = isLikert
    ? `${report.summary.answeredQuestions} of ${report.summary.totalQuestions} statements rated (${report.summary.completionPercentage}%). Analyze directly with Gemini AI or export your responses.`
    : `${report.summary.answeredQuestions} of ${report.summary.totalQuestions} items practiced (${report.summary.totalVariationsWritten} variations written). Analyze directly with Gemini AI or export your Q&A variations.`;

  elements.reportMetricsGrid.innerHTML = isLikert
    ? `
    <div class="metric-box">
      <span class="metric-label">Answered</span>
      <strong class="metric-value">${report.summary.answeredQuestions} / ${report.summary.totalQuestions}</strong>
    </div>
    <div class="metric-box">
      <span class="metric-label">Completion</span>
      <strong class="metric-value">${report.summary.completionPercentage}%</strong>
    </div>
    <div class="metric-box">
      <span class="metric-label">Scale Mode</span>
      <strong class="metric-value">1–7 Likert Options</strong>
    </div>
    <div class="metric-box">
      <span class="metric-label">Practice Pace</span>
      <strong class="metric-value">Untimed · No Timer</strong>
    </div>
  `
    : `
    <div class="metric-box">
      <span class="metric-label">Items Practiced</span>
      <strong class="metric-value">${report.summary.answeredQuestions} / ${report.summary.totalQuestions}</strong>
    </div>
    <div class="metric-box">
      <span class="metric-label">Total Variations</span>
      <strong class="metric-value">${report.summary.totalVariationsWritten} / ${report.summary.maxVariationsPossible}</strong>
    </div>
    <div class="metric-box">
      <span class="metric-label">All 3 Filled</span>
      <strong class="metric-value">${report.summary.itemsWithAllThreeVariations} items</strong>
    </div>
    <div class="metric-box">
      <span class="metric-label">Practice Pace</span>
      <strong class="metric-value">Untimed · No Timer</strong>
    </div>
  `;

  renderGeminiResultCard();

  const markdownText = buildAiPromptMarkdown();
  elements.aiPromptPreview.value = markdownText;

  elements.qaTableCount.textContent = `Showing ${report.questionAndAnswers.length} item${
    report.questionAndAnswers.length === 1 ? "" : "s"
  }`;

  elements.qaList.replaceChildren();
  report.questionAndAnswers.forEach((item) => {
    const row = document.createElement("div");
    const isAns = item.candidateAnswer !== "[Not Practiced]";
    row.className = `qa-item ${isAns ? "qa-answered" : "qa-unanswered"}`;

    let variationsHtml = "";
    if (item.likertRating) {
      variationsHtml += `<div class="qa-variation-row"><span class="qa-v-badge">Option</span><span class="qa-v-text">${escapeHtml(item.likertRating)}</span></div>`;
    }
    if (!isLikert && item.variations.length > 0) {
      variationsHtml += item.variations
        .map(
          (v) =>
            `<div class="qa-variation-row"><span class="qa-v-badge">V${v.slot}</span><span class="qa-v-text">${escapeHtml(
              v.fullSentence !== v.raw ? `${v.raw} (${v.fullSentence})` : v.raw
            )}</span></div>`
        )
        .join("");
    } else if (!item.likertRating) {
      variationsHtml = `<p class="answer-empty">[Not Answered]</p>`;
    }

    row.innerHTML = `
      <div class="qa-item-head">
        <span class="qa-number">Q${String(item.number).padStart(2, "0")}</span>
        <span class="qa-time">${isLikert ? (item.likertRating ? "Rated" : "Skipped") : `${item.variations.length}/3 variations`}</span>
        <button class="qa-edit-btn" type="button">${isLikert ? "Change option" : "Edit variations"}</button>
      </div>
      <div class="qa-question">
        <span class="qa-field-label">Question / Prompt:</span>
        <p>${escapeHtml(item.question)}</p>
      </div>
      <div class="qa-answer">
        <span class="qa-field-label">${isLikert ? "Selected Option:" : "Your 3x Variations:"}</span>
        <div class="qa-variations-list">${variationsHtml}</div>
      </div>
    `;
    row.querySelector(".qa-edit-btn").addEventListener("click", () => {
      goToIndex(item.number - 1);
    });
    elements.qaList.append(row);
  });
}

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function resetCurrentTest() {
  const config = getTestConfig();
  if (!window.confirm(`Reset all saved 3x practice variations for ${config.title}?`)) return;
  localStorage.removeItem(getStorageKey());
  state.completed = false;
  state.reportOpen = false;
  state.aiEvaluation = null;
  loadTest(state.testKey);
}

// Event Listeners
elements.testTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    loadTest(tab.dataset.test);
  });
});

elements.toggleReportButton.addEventListener("click", () => {
  if (state.reportOpen) closeReportView();
  else openReportView();
});

elements.backToSimButton.addEventListener("click", () => {
  closeReportView();
});

elements.resetButton.addEventListener("click", resetCurrentTest);

elements.mapToggleButton.addEventListener("click", () => {
  state.mapOpen = !state.mapOpen;
  renderQuestionMap();
});

elements.previousButton.addEventListener("click", previousItem);
elements.nextButton.addEventListener("click", nextItem);

elements.analyzeGeminiButton.addEventListener("click", analyzeWithGemini);

elements.onlyAnsweredCheckbox.addEventListener("change", (e) => {
  state.onlyAnsweredInReport = e.target.checked;
  renderReportView();
});

elements.copyAiButton.addEventListener("click", async () => {
  const text = buildAiPromptMarkdown();
  try {
    await navigator.clipboard.writeText(text);
    const original = elements.copyAiButton.textContent;
    elements.copyAiButton.textContent = "✓ Copied AI Prompt & 3x Report!";
    elements.copyAiButton.classList.add("copied-success");
    setTimeout(() => {
      elements.copyAiButton.textContent = original;
      elements.copyAiButton.classList.remove("copied-success");
    }, 2400);
  } catch (_) {
    elements.aiPromptPreview.select();
    document.execCommand("copy");
  }
});

elements.downloadMdButton.addEventListener("click", () => {
  downloadFile(
    `issb-practice-${state.testKey}-3x-report.md`,
    buildAiPromptMarkdown(),
    "text/markdown;charset=utf-8"
  );
});

elements.downloadTxtButton.addEventListener("click", () => {
  downloadFile(
    `issb-practice-${state.testKey}-3x-report.txt`,
    buildAiPromptMarkdown(),
    "text/plain;charset=utf-8"
  );
});

elements.downloadJsonButton.addEventListener("click", () => {
  downloadFile(
    `issb-practice-${state.testKey}-3x-report.json`,
    JSON.stringify(buildStructuredReportData(), null, 2),
    "application/json;charset=utf-8"
  );
});

document.addEventListener("keydown", (event) => {
  if (state.reportOpen) return;
  const config = getTestConfig();
  if (
    event.target instanceof HTMLInputElement ||
    event.target instanceof HTMLTextAreaElement
  ) {
    return;
  }

  if (config.mode === "likert" && /^[1-7]$/.test(event.key)) {
    event.preventDefault();
    selectLikertValue(Number(event.key));
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    previousItem();
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    nextItem();
  }
});

loadTest(state.testKey);
