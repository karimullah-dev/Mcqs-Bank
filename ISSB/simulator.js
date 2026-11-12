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
    shortTitle: "OPI",
    title: "Officer Personality Inventory (OPI)",
    category: "Personality Assessment · 100 Statements",
    file: "opi.json",
    dataKey: "statements",
    itemLabel: "Statement",
    mode: "likert",
    totalSeconds: 40 * 60,
    itemTargetSeconds: 24,
    defaultAutoAdvance: true,
    instruction:
      "Read each statement carefully and select how accurately it describes you on the 7-point scale. Be natural and consistent—AI evaluation checks for honesty and self-consistency across statements.",
    aiContext:
      "This is an ISSB Officer Personality Inventory (OPI) test with 7-point Likert scale responses (1 = Strongly disagree, 4 = Neutral, 7 = Strongly agree). Evaluate consistency, social desirability bias (lie-scale items like 'I have never told a lie'), emotional stability, leadership readiness, and conscientiousness.",
  },
  wat: {
    key: "wat",
    shortTitle: "WAT",
    title: "Word Association Test (WAT)",
    category: "Projective Word Association · 100 Words",
    file: "wat.json",
    dataKey: "wat_words",
    itemLabel: "Word",
    mode: "wat",
    totalSeconds: 100 * 10,
    itemTargetSeconds: 10,
    defaultAutoAdvance: true,
    instruction:
      "Write a spontaneous, meaningful sentence triggered by the flashed word. In real ISSB conditions, each word appears for 10 seconds before advancing automatically.",
    aiContext:
      "This is an ISSB Word Association Test (WAT). For each stimulus word, the candidate had ~10 seconds to write a sentence. Evaluate whether responses show constructive action, positivity, courage, social responsibility, and natural personality vs. memorized/bookish slogans, fear, aggression, regret, or escapism.",
  },
  sct_eng: {
    key: "sct_eng",
    shortTitle: "SCT English",
    title: "Sentence Completion Test (English)",
    category: "Projective Sentence Completion · 50 Sentences",
    file: "sct_eng.json",
    dataKey: "sct_english",
    itemLabel: "Sentence",
    mode: "sct",
    totalSeconds: 15 * 60,
    itemTargetSeconds: 18,
    defaultAutoAdvance: false,
    instruction:
      "Complete each incomplete sentence stem with the first natural thought that comes to mind. Press Enter to save and move to the next sentence.",
    aiContext:
      "This is an ISSB English Sentence Completion Test (SCT). Each prompt is an incomplete sentence stem completed by the candidate under time pressure. Analyze the candidate's attitude toward failure, authority, family, fear, stress, ambition, and interpersonal conflict.",
  },
  sct_urdu: {
    key: "sct_urdu",
    shortTitle: "SCT Urdu",
    title: "Sentence Completion Test (Urdu / Roman)",
    category: "Projective Sentence Completion · 50 Sentences",
    file: "sct_urdu.json",
    dataKey: "sct_hinglish",
    itemLabel: "Sentence",
    mode: "sct",
    totalSeconds: 15 * 60,
    itemTargetSeconds: 18,
    defaultAutoAdvance: false,
    instruction:
      "Complete each Roman Urdu / Urdu sentence naturally with your immediate thought. Press Enter to advance to the next sentence.",
    aiContext:
      "This is an ISSB Urdu (Roman Urdu / Hinglish) Sentence Completion Test (SCT). Analyze how the candidate completes each stem regarding anger, family relations, failure, social responsibility, pressure, and personal values.",
  },
  pointer: {
    key: "pointer",
    shortTitle: "Pointer Stories",
    title: "Pointer Story Completion Test",
    category: "Thematic Story Writing · 5 Stories",
    file: "pointer.json",
    dataKey: "pointer_stories",
    itemLabel: "Story",
    mode: "story",
    totalSeconds: 5 * 210,
    itemTargetSeconds: 210,
    defaultAutoAdvance: false,
    instruction:
      "Read the incomplete story starter and continue it into a complete, realistic story with a clear action plan and constructive outcome (3 min 30 sec per story).",
    aiContext:
      "This is an ISSB Pointer Story Completion Test. The candidate is given a tense or ambiguous story starter and 3.5 minutes to complete the story. Evaluate the central character's initiative, practical problem-solving, courage, integrity, realism, and outcome.",
  },
  srt: {
    key: "srt",
    shortTitle: "SRT",
    title: "Situation Reaction Test (SRT)",
    category: "Tactical Decision & Action · 10 Situations",
    file: "srt.json",
    dataKey: "srt_situations",
    itemLabel: "Situation",
    mode: "srt",
    totalSeconds: 20 * 60,
    itemTargetSeconds: 120,
    defaultAutoAdvance: false,
    instruction:
      "Read the emergency or moral dilemma carefully and write your exact practical course of action—prioritize life, duty, ethics, and realistic execution.",
    aiContext:
      "This is an ISSB Situation Reaction Test (SRT). The candidate responds to urgent real-life and military dilemmas. Evaluate their practical intelligence, sense of duty vs. personal emotion, moral integrity, prioritization of human life, coolness under pressure, and decisiveness.",
  },
};

const state = {
  testKey: new URLSearchParams(window.location.search).get("test") || "opi",
  items: [],
  currentIndex: 0,
  answers: [],
  timeSpent: [],
  itemElapsed: 0,
  elapsedSeconds: 0,
  paused: false,
  completed: false,
  autoAdvance: false,
  soundEnabled: true,
  mapOpen: false,
  reportOpen: false,
  onlyAnsweredInReport: true,
  aiEvaluation: null,
};

const elements = {
  activeTestShort: document.querySelector("#active-test-short"),
  toggleReportButton: document.querySelector("#toggle-report-button"),
  pauseButton: document.querySelector("#pause-button"),
  resetButton: document.querySelector("#reset-button"),
  testTabs: document.querySelectorAll(".test-tab"),
  testCategoryLabel: document.querySelector("#test-category-label"),
  progressLabel: document.querySelector("#progress-label"),
  itemTimerPill: document.querySelector("#item-timer-pill"),
  itemTimerLabel: document.querySelector("#item-timer-label"),
  itemTimerValue: document.querySelector("#item-timer-value"),
  timer: document.querySelector("#timer"),
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
  itemTimerBarWrap: document.querySelector("#item-Timer-bar-wrap"),
  itemTimerBarFill: document.querySelector("#item-timer-bar-fill"),
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
  return TESTS[state.testKey] || TESTS.opi;
}

function getStorageKey(testKey = state.testKey) {
  return `issb-sim-v2-${testKey}`;
}

function isAnswered(value) {
  return value !== null && value !== undefined && String(value).trim() !== "";
}

function formatTime(seconds) {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function countWords(text) {
  const trimmed = String(text || "").trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function playFlashBeep() {
  if (!state.soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(660, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (_) {}
}

function saveState() {
  try {
    const payload = {
      currentIndex: state.currentIndex,
      answers: state.answers,
      timeSpent: state.timeSpent,
      elapsedSeconds: state.elapsedSeconds,
      completed: state.completed,
      autoAdvance: state.autoAdvance,
      soundEnabled: state.soundEnabled,
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
  const config = getTestConfig();

  if (state.testKey === "opi" && !localStorage.getItem(getStorageKey("opi"))) {
    try {
      const legacy = JSON.parse(localStorage.getItem("issb-opi-practice-v1") || "null");
      if (legacy && Array.isArray(legacy.answers)) {
        localStorage.setItem(
          getStorageKey("opi"),
          JSON.stringify({
            currentIndex: legacy.currentIndex || 0,
            answers: legacy.answers,
            timeSpent: [],
            elapsedSeconds: legacy.elapsedSeconds || 0,
            completed: Boolean(legacy.completed),
            autoAdvance: true,
          })
        );
      }
    } catch (_) {}
  }

  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(getStorageKey()) || "null");
  } catch (_) {}

  state.currentIndex = saved?.currentIndex ? Math.min(saved.currentIndex, itemCount - 1) : 0;
  state.answers = Array.from({ length: itemCount }, (_, i) =>
    saved && Array.isArray(saved.answers) && saved.answers[i] !== undefined ? saved.answers[i] : null
  );
  state.timeSpent = Array.from({ length: itemCount }, (_, i) =>
    saved && Array.isArray(saved.timeSpent) && typeof saved.timeSpent[i] === "number"
      ? saved.timeSpent[i]
      : 0
  );
  state.elapsedSeconds = saved?.elapsedSeconds || 0;
  state.completed = Boolean(saved?.completed);
  state.autoAdvance =
    typeof saved?.autoAdvance === "boolean" ? saved.autoAdvance : config.defaultAutoAdvance;
  state.soundEnabled = typeof saved?.soundEnabled === "boolean" ? saved.soundEnabled : true;
  state.aiEvaluation = saved?.aiEvaluation || null;
  state.itemElapsed = 0;
}

async function loadTest(testKey) {
  if (!TESTS[testKey]) testKey = "opi";
  state.testKey = testKey;
  state.paused = false;
  state.reportOpen = false;

  const url = new URL(window.location.href);
  url.searchParams.set("test", testKey);
  window.history.replaceState({}, "", url);

  elements.testTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.test === testKey);
  });

  const config = getTestConfig();
  document.title = `${config.shortTitle} Simulator | ISSB`;
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
    console.error("Failed to load ISSB test:", error);
    elements.simulatorCard.classList.add("hidden");
    elements.reportCard.classList.add("hidden");
    elements.loadingError.classList.remove("hidden");
  }
}

function renderProgressHeader() {
  const config = getTestConfig();
  const total = state.items.length;
  const answered = state.answers.filter(isAnswered).length;
  const pct = total ? Math.round((answered / total) * 100) : 0;

  elements.testCategoryLabel.textContent = config.category;
  elements.progressLabel.textContent = `${config.itemLabel} ${Math.min(
    state.currentIndex + 1,
    total
  )} of ${total}`;
  elements.progressFill.style.width = `${pct}%`;
  elements.answeredCount.textContent = answered;
  elements.remainingCount.textContent = Math.max(0, total - answered);

  const remainingTotal = Math.max(0, config.totalSeconds - state.elapsedSeconds);
  elements.timer.textContent = formatTime(remainingTotal);

  const itemRemaining = Math.max(0, config.itemTargetSeconds - state.itemElapsed);
  elements.itemTimerLabel.textContent =
    config.mode === "wat" && state.autoAdvance
      ? "Auto-flash in"
      : `${config.itemLabel} timer`;
  elements.itemTimerValue.textContent = formatTime(itemRemaining);

  elements.itemTimerPill.classList.toggle(
    "timer-warning",
    itemRemaining <= 3 && (config.mode === "wat" || state.autoAdvance)
  );

  if (config.mode === "wat" || (config.mode === "sct" && state.autoAdvance)) {
    elements.itemTimerBarWrap.classList.remove("hidden");
    const ratio = Math.max(
      0,
      Math.min(100, ((config.itemTargetSeconds - state.itemElapsed) / config.itemTargetSeconds) * 100)
    );
    elements.itemTimerBarFill.style.width = `${ratio}%`;
    elements.itemTimerBarFill.classList.toggle("urgent", itemRemaining <= 3);
  } else {
    elements.itemTimerBarWrap.classList.add("hidden");
  }

  elements.pauseButton.textContent = state.paused ? "▶ Resume" : "⏸ Pause";
  elements.pauseButton.classList.toggle("is-paused", state.paused);
}

function renderQuestionMap() {
  elements.questionMap.classList.toggle("hidden", !state.mapOpen);
  elements.mapToggleButton.textContent = state.mapOpen ? "Hide Map ▴" : "Question Map ▾";
  if (!state.mapOpen) return;

  elements.questionMap.replaceChildren();
  state.items.forEach((_, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "map-dot";
    if (idx === state.currentIndex) btn.classList.add("current");
    if (isAnswered(state.answers[idx])) btn.classList.add("answered");
    btn.textContent = idx + 1;
    btn.title = `${getTestConfig().itemLabel} ${idx + 1}`;
    btn.addEventListener("click", () => {
      goToIndex(idx);
    });
    elements.questionMap.append(btn);
  });
}

function renderModeControls() {
  const config = getTestConfig();
  elements.modeControls.replaceChildren();

  if (config.mode === "likert") {
    const label = document.createElement("label");
    label.className = "mode-toggle-pill";
    label.innerHTML = `<input type="checkbox" ${state.autoAdvance ? "checked" : ""} /> <span>Auto-advance on select</span>`;
    label.querySelector("input").addEventListener("change", (e) => {
      state.autoAdvance = e.target.checked;
      saveState();
    });
    elements.modeControls.append(label);
  } else if (config.mode === "wat") {
    const autoLabel = document.createElement("label");
    autoLabel.className = "mode-toggle-pill";
    autoLabel.innerHTML = `<input type="checkbox" ${state.autoAdvance ? "checked" : ""} /> <span>10s Auto-Flash (Exam Mode)</span>`;
    autoLabel.querySelector("input").addEventListener("change", (e) => {
      state.autoAdvance = e.target.checked;
      state.itemElapsed = 0;
      saveState();
      renderProgressHeader();
    });

    const soundLabel = document.createElement("label");
    soundLabel.className = "mode-toggle-pill";
    soundLabel.innerHTML = `<input type="checkbox" ${state.soundEnabled ? "checked" : ""} /> <span>Sound cue</span>`;
    soundLabel.querySelector("input").addEventListener("change", (e) => {
      state.soundEnabled = e.target.checked;
      saveState();
    });

    elements.modeControls.append(autoLabel, soundLabel);
  } else if (config.mode === "sct") {
    const autoLabel = document.createElement("label");
    autoLabel.className = "mode-toggle-pill";
    autoLabel.innerHTML = `<input type="checkbox" ${state.autoAdvance ? "checked" : ""} /> <span>18s Auto-Advance Pace</span>`;
    autoLabel.querySelector("input").addEventListener("change", (e) => {
      state.autoAdvance = e.target.checked;
      state.itemElapsed = 0;
      saveState();
      renderProgressHeader();
    });
    elements.modeControls.append(autoLabel);
  }
}

function renderSimulator() {
  const config = getTestConfig();
  const total = state.items.length;
  const prompt = state.items[state.currentIndex];
  const currentAnswer = state.answers[state.currentIndex];

  renderProgressHeader();
  renderQuestionMap();
  renderModeControls();

  elements.itemNumber.textContent = `${config.itemLabel} ${String(
    state.currentIndex + 1
  ).padStart(2, "0")} of ${total}`;
  elements.testPill.textContent = config.shortTitle;
  elements.testInstruction.textContent = config.instruction;

  elements.promptStage.className = `prompt-stage mode-${config.mode}`;
  elements.promptText.textContent = prompt;
  elements.responseStage.replaceChildren();

  if (config.mode === "likert") {
    elements.keyboardHint.textContent = "Tip: Press keys 1–7 to select";
    const grid = document.createElement("div");
    grid.className = "likert-options";
    grid.setAttribute("role", "radiogroup");

    LIKERT_SCALE.forEach((item) => {
      const option = document.createElement("label");
      option.className = "likert-option";
      const checked = Number(currentAnswer) === item.value;
      option.innerHTML = `
        <span class="likert-key-badge">${item.value}</span>
        <input type="radio" name="opi-response" value="${item.value}" ${checked ? "checked" : ""} />
        <span class="likert-label-text">${item.label}</span>
      `;
      option.querySelector("input").addEventListener("change", () => {
        selectLikertValue(item.value);
      });
      grid.append(option);
    });
    elements.responseStage.append(grid);
  } else if (config.mode === "wat") {
    elements.keyboardHint.textContent = "Press Enter to save & next word";
    const wrap = document.createElement("div");
    wrap.className = "text-response-wrap";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "sim-text-input wat-input";
    input.placeholder = `Write a complete sentence using or inspired by "${prompt}"…`;
    input.value = currentAnswer || "";
    input.autocomplete = "off";

    const metaRow = document.createElement("div");
    metaRow.className = "input-helper-row";
    const wordCounter = document.createElement("span");
    wordCounter.textContent = `${countWords(input.value)} words`;
    const statusHint = document.createElement("span");
    statusHint.textContent = state.autoAdvance
      ? "Auto-saves every keystroke · Auto-flashes at 00:00"
      : "Auto-saves every keystroke · Press Enter for next";
    metaRow.append(wordCounter, statusHint);

    input.addEventListener("input", () => {
      state.answers[state.currentIndex] = input.value;
      wordCounter.textContent = `${countWords(input.value)} words`;
      saveState();
      updateCountersOnly();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        nextItem();
      }
    });

    wrap.append(input, metaRow);
    elements.responseStage.append(wrap);
    setTimeout(() => input.focus(), 20);
  } else if (config.mode === "sct") {
    elements.keyboardHint.textContent = "Press Enter to complete & next";
    const wrap = document.createElement("div");
    wrap.className = "text-response-wrap";

    const stemClean = prompt.replace(/\.{2,}$/, "").trim();
    const previewBox = document.createElement("div");
    previewBox.className = "sct-live-preview";

    const updatePreview = (val) => {
      const completion = String(val || "").trim();
      previewBox.innerHTML = `<span class="sct-stem-part">${stemClean}</span> <strong class="sct-user-part">${
        completion ? escapeHtml(completion) : "…"
      }</strong>`;
    };
    updatePreview(currentAnswer);

    const input = document.createElement("input");
    input.type = "text";
    input.className = "sim-text-input sct-input";
    input.placeholder =
      state.testKey === "sct_urdu"
        ? "Sentence mukammal karein aur Enter dabayein…"
        : "Type the rest of the sentence and press Enter…";
    input.value = currentAnswer || "";
    input.autocomplete = "off";

    input.addEventListener("input", () => {
      state.answers[state.currentIndex] = input.value;
      updatePreview(input.value);
      saveState();
      updateCountersOnly();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        nextItem();
      }
    });

    wrap.append(previewBox, input);
    elements.responseStage.append(wrap);
    setTimeout(() => input.focus(), 20);
  } else if (config.mode === "story" || config.mode === "srt") {
    elements.keyboardHint.textContent = "Ctrl + Enter for next";
    const wrap = document.createElement("div");
    wrap.className = "text-response-wrap";

    const textarea = document.createElement("textarea");
    textarea.className = "sim-textarea";
    textarea.rows = config.mode === "story" ? 8 : 6;
    textarea.placeholder =
      config.mode === "story"
        ? "Continue the story from the pointer prompt above. Describe what the central character did, how they handled the challenge, and the final outcome…"
        : "Write your exact practical action step-by-step: 1) Immediate response, 2) How you manage the risk/problem, 3) Final resolution…";
    textarea.value = currentAnswer || "";

    const metaRow = document.createElement("div");
    metaRow.className = "input-helper-row";
    const wordCounter = document.createElement("span");
    const targetWords =
      config.mode === "story" ? "Recommended: 70–120 words" : "Recommended: 25–60 words";
    wordCounter.textContent = `${countWords(textarea.value)} words (${targetWords})`;
    const saveNote = document.createElement("span");
    saveNote.textContent = "Saved automatically as you type";
    metaRow.append(wordCounter, saveNote);

    textarea.addEventListener("input", () => {
      state.answers[state.currentIndex] = textarea.value;
      wordCounter.textContent = `${countWords(textarea.value)} words (${targetWords})`;
      saveState();
      updateCountersOnly();
    });

    textarea.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        nextItem();
      }
    });

    wrap.append(textarea, metaRow);
    elements.responseStage.append(wrap);
    setTimeout(() => textarea.focus(), 20);
  }

  elements.previousButton.disabled = state.currentIndex === 0;
  elements.nextButton.textContent =
    state.currentIndex === total - 1
      ? "Finish & View AI Report →"
      : `Next ${config.itemLabel.toLowerCase()} →`;
}

function updateCountersOnly() {
  const total = state.items.length;
  const answered = state.answers.filter(isAnswered).length;
  const pct = total ? Math.round((answered / total) * 100) : 0;
  elements.progressFill.style.width = `${pct}%`;
  elements.answeredCount.textContent = answered;
  elements.remainingCount.textContent = Math.max(0, total - answered);
  if (state.mapOpen) renderQuestionMap();
}

function selectLikertValue(val) {
  state.answers[state.currentIndex] = Number(val);
  saveState();
  renderSimulator();
  if (state.autoAdvance && state.currentIndex < state.items.length - 1) {
    setTimeout(() => {
      goToIndex(state.currentIndex + 1);
    }, 180);
  }
}

function goToIndex(index, playCue = false) {
  if (index < 0 || index >= state.items.length) return;
  state.currentIndex = index;
  state.itemElapsed = 0;
  if (playCue) playFlashBeep();
  saveState();
  if (state.reportOpen) closeReportView();
  renderSimulator();
}

function nextItem(fromAutoTimer = false) {
  if (state.currentIndex >= state.items.length - 1) {
    state.completed = true;
    saveState();
    openReportView();
    return;
  }
  goToIndex(state.currentIndex + 1, fromAutoTimer && getTestConfig().mode === "wat");
}

function previousItem() {
  if (state.currentIndex > 0) {
    goToIndex(state.currentIndex - 1);
  }
}

function tick() {
  if (state.paused || state.reportOpen || !state.items.length) return;

  const config = getTestConfig();
  state.elapsedSeconds = Math.min(config.totalSeconds, state.elapsedSeconds + 1);
  state.itemElapsed += 1;
  state.timeSpent[state.currentIndex] = (state.timeSpent[state.currentIndex] || 0) + 1;

  if (state.elapsedSeconds >= config.totalSeconds) {
    state.completed = true;
    saveState();
    openReportView();
    return;
  }

  if (
    state.autoAdvance &&
    (config.mode === "wat" || config.mode === "sct") &&
    state.itemElapsed >= config.itemTargetSeconds
  ) {
    nextItem(true);
    return;
  }

  renderProgressHeader();
  if (state.elapsedSeconds % 5 === 0) saveState();
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatAnswerDisplay(index) {
  const config = getTestConfig();
  const raw = state.answers[index];
  if (!isAnswered(raw)) return null;

  if (config.mode === "likert") {
    const found = LIKERT_SCALE.find((s) => s.value === Number(raw));
    return found ? `${found.label} (${found.value}/7)` : String(raw);
  }
  return String(raw).trim();
}

function formatCombinedResponse(index) {
  const config = getTestConfig();
  const prompt = state.items[index];
  const answer = formatAnswerDisplay(index);
  if (!answer) return null;

  if (config.mode === "sct" || config.mode === "story") {
    const stemClean = prompt.replace(/\.{2,}$/, "").trim();
    return `${stemClean} ${answer}`;
  }
  return answer;
}

function buildStructuredReportData() {
  const config = getTestConfig();
  const total = state.items.length;
  const allEntries = state.items.map((prompt, idx) => {
    const answerText = formatAnswerDisplay(idx);
    const combined = formatCombinedResponse(idx);
    const answered = Boolean(answerText);
    return {
      questionNumber: idx + 1,
      question: prompt,
      answer: answerText || "[Not Answered]",
      combinedResponse: combined || "[Not Answered]",
      answered,
      timeSpentSeconds: state.timeSpent[idx] || 0,
    };
  });

  const filteredEntries = state.onlyAnsweredInReport
    ? allEntries.filter((e) => e.answered)
    : allEntries;

  const entriesToUse = filteredEntries.length > 0 ? filteredEntries : allEntries;
  const answeredCount = allEntries.filter((e) => e.answered).length;
  const avgTime =
    answeredCount > 0
      ? Math.round(
          allEntries.reduce((acc, item) => acc + (item.answered ? item.timeSpentSeconds : 0), 0) /
            answeredCount
        )
      : 0;

  return {
    testKey: config.key,
    testTitle: config.title,
    category: config.category,
    aiAssessmentInstructions: config.aiContext,
    exportedAt: new Date().toISOString(),
    summary: {
      totalQuestions: total,
      answeredQuestions: answeredCount,
      unansweredQuestions: total - answeredCount,
      completionPercentage: Math.round((answeredCount / total) * 100),
      totalTimeElapsedSeconds: state.elapsedSeconds,
      totalTimeFormatted: formatTime(state.elapsedSeconds),
      averageSecondsPerAnswer: avgTime,
    },
    aiEvaluationResult: state.aiEvaluation || null,
    questionAndAnswers: entriesToUse.map((item) => ({
      number: item.questionNumber,
      question: item.question,
      candidateAnswer: item.answer,
      ...(config.mode === "sct" || config.mode === "story"
        ? { completeCombinedText: item.combinedResponse }
        : {}),
      timeSpentSeconds: item.timeSpentSeconds,
    })),
  };
}

function buildAiPromptMarkdown() {
  const report = buildStructuredReportData();
  const config = getTestConfig();

  const header = [
    `# ISSB Psychological Assessment Report — ${report.testTitle}`,
    ``,
    `## Instructions for AI Assessor (ChatGPT / Claude / Gemini)`,
    `You are an experienced **ISSB Senior Psychologist**. Below is a candidate's practice session containing the exact **Questions / Stimuli** and the candidate's **Responses** (along with time spent on each item).`,
    ``,
    `${report.aiAssessmentInstructions}`,
    ``,
    `Based on these Questions and the Candidate's Answers, please provide a comprehensive psychological assessment covering:`,
    `1. **Overall Suitability Verdict**: (Recommended / Borderline / Needs Improvement) with clear psychological reasoning.`,
    `2. **Officer Like Qualities (OLQs) Profile**: Rate (1–10) and analyze Emotional Stability, Courage, Determination, Initiative, Practical Intelligence, Sense of Responsibility, Integrity, and Social Adjustment.`,
    `3. **Detailed Response Analysis**: Point out specific Question numbers where the candidate gave strong officer-like responses vs. responses showing hesitation, negativity, superficiality, contradiction, or stress.`,
    `4. **Suggested Improvements**: Rewrite weak or problematic responses into natural, authentic, positive responses suitable for ISSB.`,
    ``,
    `---`,
    ``,
    `## Session Summary`,
    `- **Test Module**: ${report.testTitle}`,
    `- **Questions Answered**: ${report.summary.answeredQuestions} of ${report.summary.totalQuestions} (${report.summary.completionPercentage}%)`,
    `- **Total Time Spent**: ${report.summary.totalTimeFormatted} (Avg ${report.summary.averageSecondsPerAnswer}s per answered item)`,
    `- **Exported At**: ${new Date(report.exportedAt).toLocaleString()}`,
    ``,
    `---`,
    ``,
    `## Candidate Questions & Answers`,
    ``,
  ];

  const qaLines = report.questionAndAnswers.map((item) => {
    const lines = [
      `### Q${item.number}. [Time: ${item.timeSpentSeconds}s]`,
      `- **Question / Prompt**: ${item.question}`,
      `- **Candidate's Answer**: ${item.candidateAnswer}`,
    ];
    if (
      (config.mode === "sct" || config.mode === "story") &&
      item.candidateAnswer !== "[Not Answered]"
    ) {
      lines.push(`- **Full Combined Text**: ${item.completeCombinedText}`);
    }
    return lines.join("\n");
  });

  return header.concat(qaLines).join("\n") + "\n";
}

function renderGeminiResultCard() {
  const evaluation = state.aiEvaluation;
  if (!evaluation) {
    elements.geminiResultContainer.classList.add("hidden");
    elements.geminiResultContainer.replaceChildren();
    elements.analyzeGeminiButton.textContent = "✦ Analyze My Responses with Gemini AI";
    return;
  }

  elements.analyzeGeminiButton.textContent = "↻ Re-Analyze with Gemini AI";
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
        <p class="review-user-ans"><strong>Your Response:</strong> ${escapeHtml(rev.candidateAnswer)}</p>
        <p class="review-analysis"><strong>Psychologist Feedback:</strong> ${escapeHtml(rev.psychologistFeedback)}</p>
        ${
          rev.betterSuggestedAnswer
            ? `<p class="review-better"><strong>Suggested Officer-Like Response:</strong> ${escapeHtml(rev.betterSuggestedAnswer)}</p>`
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
          <h4 class="assessment-headline">${escapeHtml(evaluation.headline || "Psychological Profile Summary")}</h4>
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
          <h5>⚠ Psychological Red Flags &amp; Improvements</h5>
          <ul>${weaknessesHtml || "<li>No major red flags detected.</li>"}</ul>
        </div>
      </div>

      ${
        critiquesHtml
          ? `<div class="question-critiques-section">
              <h5>Question-by-Question Psychologist Critique &amp; Better Answers</h5>
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
      "Please set your GEMINI_API_KEY at the top of ISSB/simulator.js first.";
    elements.geminiError.classList.remove("hidden");
    return;
  }

  const answeredCount = state.answers.filter(isAnswered).length;
  if (answeredCount === 0) {
    elements.geminiError.textContent =
      "Please answer at least 1 question before requesting a Gemini AI psychological assessment.";
    elements.geminiError.classList.remove("hidden");
    return;
  }

  const report = buildStructuredReportData();
  elements.geminiLoading.classList.remove("hidden");
  elements.analyzeGeminiButton.disabled = true;

  const systemPrompt = `You are a Senior ISSB Psychologist evaluating a candidate's ${report.testTitle}.
${report.aiAssessmentInstructions}
Analyze the candidate's exact Questions and Answers below and return a rigorous, constructive JSON assessment.`;

  const qaPayload = report.questionAndAnswers
    .filter((q) => q.candidateAnswer !== "[Not Answered]")
    .map(
      (q) =>
        `Q${q.number} [Time: ${q.timeSpentSeconds}s] | Prompt: "${q.question}" | Candidate Answer: "${q.candidateAnswer}"`
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
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/interactions?key=${encodeURIComponent(
      GEMINI_API_KEY.trim()
    )}`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Revision": "2026-05-20",
      },
      body: JSON.stringify({
        model: GEMINI_MODEL,
        system_instruction: systemPrompt,
        input: `Evaluate the following ${report.summary.answeredQuestions} answered items from ${report.testTitle}:\n\n${qaPayload}`,
        generation_config: {
          temperature: 0.3,
        },
        response_format: {
          type: "text",
          mime_type: "application/json",
          schema: responseSchema,
        },
      }),
    });

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
  elements.toggleReportButton.textContent = "← Resume Simulator";
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

  elements.reportTitle.textContent = `${config.title} — AI Evaluation Report`;
  elements.reportSummaryText.textContent = `${report.summary.answeredQuestions} of ${report.summary.totalQuestions} questions answered (${report.summary.completionPercentage}%). Analyze directly on-page with Gemini AI or export your Question & Answer report.`;

  elements.reportMetricsGrid.innerHTML = `
    <div class="metric-box">
      <span class="metric-label">Answered</span>
      <strong class="metric-value">${report.summary.answeredQuestions} / ${report.summary.totalQuestions}</strong>
    </div>
    <div class="metric-box">
      <span class="metric-label">Completion</span>
      <strong class="metric-value">${report.summary.completionPercentage}%</strong>
    </div>
    <div class="metric-box">
      <span class="metric-label">Total Time</span>
      <strong class="metric-value">${report.summary.totalTimeFormatted}</strong>
    </div>
    <div class="metric-box">
      <span class="metric-label">Avg Pace</span>
      <strong class="metric-value">${report.summary.averageSecondsPerAnswer}s / item</strong>
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
    const isAns = item.candidateAnswer !== "[Not Answered]";
    row.className = `qa-item ${isAns ? "qa-answered" : "qa-unanswered"}`;
    row.innerHTML = `
      <div class="qa-item-head">
        <span class="qa-number">Q${String(item.number).padStart(2, "0")}</span>
        <span class="qa-time">${item.timeSpentSeconds}s spent</span>
        <button class="qa-edit-btn" type="button" data-jump="${item.number - 1}">Edit answer</button>
      </div>
      <div class="qa-question">
        <span class="qa-field-label">Question / Prompt:</span>
        <p>${escapeHtml(item.question)}</p>
      </div>
      <div class="qa-answer">
        <span class="qa-field-label">Your Answer:</span>
        <p class="${isAns ? "answer-filled" : "answer-empty"}">${escapeHtml(item.candidateAnswer)}</p>
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
  if (!window.confirm(`Reset all saved answers and timer for ${config.title}?`)) return;
  localStorage.removeItem(getStorageKey());
  if (state.testKey === "opi") {
    localStorage.removeItem("issb-opi-practice-v1");
  }
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

elements.pauseButton.addEventListener("click", () => {
  state.paused = !state.paused;
  saveState();
  renderProgressHeader();
});

elements.resetButton.addEventListener("click", resetCurrentTest);

elements.mapToggleButton.addEventListener("click", () => {
  state.mapOpen = !state.mapOpen;
  renderQuestionMap();
});

elements.previousButton.addEventListener("click", previousItem);
elements.nextButton.addEventListener("click", () => nextItem(false));

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
    elements.copyAiButton.textContent = "✓ Copied AI Prompt & Q&A Report!";
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
    `issb-${state.testKey}-ai-report.md`,
    buildAiPromptMarkdown(),
    "text/markdown;charset=utf-8"
  );
});

elements.downloadTxtButton.addEventListener("click", () => {
  downloadFile(
    `issb-${state.testKey}-qa-report.txt`,
    buildAiPromptMarkdown(),
    "text/plain;charset=utf-8"
  );
});

elements.downloadJsonButton.addEventListener("click", () => {
  downloadFile(
    `issb-${state.testKey}-report.json`,
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
    nextItem(false);
  }
});

setInterval(tick, 1000);
loadTest(state.testKey);
