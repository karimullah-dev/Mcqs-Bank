const STORAGE_KEY = "gto-public-speaking-v1";
const AUDIO_EXTENSIONS = [".mp3", ".m4a", ".wav", ".ogg"];

const FALLBACK_TOPICS = [
  {
    id: "united-we-stand",
    number: 1,
    title: "United we stand, divided we fall",
    audioBase: "Lecturate/united-we-stand",
  },
  {
    id: "occasions-bring-families-home",
    number: 2,
    title: "Occasions bring families home",
    audioBase: "Lecturate/occasions-bring-families-home",
  },
  {
    id: "ai-is-killing-creativity",
    number: 3,
    title: "AI is killing creativity",
    audioBase: "Lecturate/ai-is-killing-creativity",
  },
  {
    id: "people-join-army-secure-future",
    number: 4,
    title: "People join the army for a secure future",
    audioBase: "Lecturate/people-join-army-secure-future",
  },
  {
    id: "terrorism-in-pakistan",
    number: 5,
    title: "Terrorism in Pakistan",
    audioBase: "Lecturate/terrorism-in-pakistan",
  },
  {
    id: "love-or-arranged-marriage",
    number: 6,
    title: "Love marriage or arranged marriage",
    audioBase: "Lecturate/love-or-arranged-marriage",
  },
  {
    id: "cybercrimes",
    number: 7,
    title: "Cybercrimes",
    audioBase: "Lecturate/cybercrimes",
  },
];

const state = {
  topics: [],
  practiced: {},
  notes: {},
  timerMode: "prep", // "prep" (120s) | "speech" (180s)
  secondsLeft: 120,
  timerRunning: false,
  timerId: null,
};

const els = {
  topicList: document.querySelector("#gto-topic-list"),
  progressLabel: document.querySelector("#gto-progress-label"),
  progressFill: document.querySelector("#gto-progress-fill"),
  resetBtn: document.querySelector("#gto-reset-button"),
  timerMode: document.querySelector("#speech-timer-mode"),
  timerDisplay: document.querySelector("#speech-timer-display"),
  timerToggleBtn: document.querySelector("#timer-toggle-btn"),
  timerSwitchBtn: document.querySelector("#timer-switch-btn"),
  timerResetBtn: document.querySelector("#timer-reset-btn"),
  timerPill: document.querySelector("#speech-timer-pill"),
};

function formatTime(sec) {
  const s = Math.max(0, Math.floor(sec));
  const mins = Math.floor(s / 60);
  const rem = s % 60;
  return `${String(mins).padStart(2, "0")}:${String(rem).padStart(2, "0")}`;
}

function playEndChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    [0, 0.22].forEach((offset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now + offset);
      gain.gain.setValueAtTime(0.001, now + offset);
      gain.gain.linearRampToValueAtTime(0.25, now + offset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.19);
    });
  } catch (_) {}
}

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      state.practiced = parsed.practiced || {};
      state.notes = parsed.notes || {};
    }
  } catch (_) {}
}

function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        practiced: state.practiced,
        notes: state.notes,
        totalTopics: state.topics.length,
        savedAt: new Date().toISOString(),
      })
    );
  } catch (_) {}
}

function updateProgressUI() {
  const total = state.topics.length || 7;
  const doneCount = state.topics.filter((t) => Boolean(state.practiced[t.id])).length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  els.progressLabel.textContent = `${doneCount} of ${total} topics practiced`;
  els.progressFill.style.width = `${pct}%`;
}

function updateTimerUI() {
  const isPrep = state.timerMode === "prep";
  els.timerMode.textContent = isPrep ? "Prep (2:00)" : "Speech (3:00)";
  els.timerDisplay.textContent = formatTime(state.secondsLeft);
  els.timerSwitchBtn.textContent = isPrep ? "Switch to 3m Speech" : "Switch to 2m Prep";

  if (state.timerRunning) {
    els.timerToggleBtn.textContent = "Pause";
  } else {
    els.timerToggleBtn.textContent = isPrep ? "Start Prep" : "Start Speech";
  }

  els.timerPill.classList.toggle("urgent", state.secondsLeft <= 15 && state.secondsLeft > 0);
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
  state.timerRunning = false;
  updateTimerUI();
}

function toggleTimer() {
  if (state.timerRunning) {
    stopTimer();
    return;
  }
  if (state.secondsLeft <= 0) {
    state.secondsLeft = state.timerMode === "prep" ? 120 : 180;
  }
  state.timerRunning = true;
  updateTimerUI();

  state.timerId = setInterval(() => {
    state.secondsLeft -= 1;
    if (state.secondsLeft <= 0) {
      state.secondsLeft = 0;
      stopTimer();
      playEndChime();
      return;
    }
    updateTimerUI();
  }, 1000);
}

function switchTimerMode() {
  stopTimer();
  state.timerMode = state.timerMode === "prep" ? "speech" : "prep";
  state.secondsLeft = state.timerMode === "prep" ? 120 : 180;
  updateTimerUI();
}

function resetTimer() {
  stopTimer();
  state.secondsLeft = state.timerMode === "prep" ? 120 : 180;
  updateTimerUI();
}

function attachAudioWithFallback(audioEl, statusEl, audioBase) {
  let extIndex = 0;
  const fileNameBase = audioBase.split("/").pop();

  function tryNext() {
    if (extIndex >= AUDIO_EXTENSIONS.length) {
      audioEl.classList.add("hidden");
      statusEl.classList.remove("hidden");
      statusEl.innerHTML = `Audio not added yet — place <code>${fileNameBase}.mp3</code> (or <code>.m4a</code> / <code>.wav</code>) inside <code>ISSB/Lecturate/</code>`;
      return;
    }
    const src = `${audioBase}${AUDIO_EXTENSIONS[extIndex]}`;
    extIndex += 1;
    audioEl.src = src;
  }

  audioEl.addEventListener("loadedmetadata", () => {
    audioEl.classList.remove("hidden");
    statusEl.classList.add("hidden");
  });

  audioEl.addEventListener("error", () => {
    tryNext();
  });

  tryNext();
}

function renderTopics() {
  els.topicList.replaceChildren();

  state.topics.forEach((topic) => {
    const isPracticed = Boolean(state.practiced[topic.id]);
    const card = document.createElement("article");
    card.className = `gto-topic-card${isPracticed ? " is-practiced" : ""}`;

    const header = document.createElement("div");
    header.className = "gto-topic-header";

    const titleWrap = document.createElement("div");
    titleWrap.className = "gto-topic-title-wrap";
    titleWrap.innerHTML = `
      <span class="gto-topic-num">${String(topic.number).padStart(2, "0")}</span>
      <h2 class="gto-topic-title">${topic.title}</h2>
    `;

    const practiceBtn = document.createElement("button");
    practiceBtn.type = "button";
    practiceBtn.className = `gto-practice-btn${isPracticed ? " active" : ""}`;
    practiceBtn.textContent = isPracticed ? "✓ Practiced" : "Mark Practiced";
    practiceBtn.addEventListener("click", () => {
      state.practiced[topic.id] = !state.practiced[topic.id];
      saveState();
      updateProgressUI();
      const nowPracticed = Boolean(state.practiced[topic.id]);
      card.classList.toggle("is-practiced", nowPracticed);
      practiceBtn.classList.toggle("active", nowPracticed);
      practiceBtn.textContent = nowPracticed ? "✓ Practiced" : "Mark Practiced";
    });

    header.append(titleWrap, practiceBtn);

    const audioBox = document.createElement("div");
    audioBox.className = "gto-audio-box";

    const audioEl = document.createElement("audio");
    audioEl.controls = true;
    audioEl.preload = "metadata";
    audioEl.className = "gto-audio-player";

    const audioStatus = document.createElement("p");
    audioStatus.className = "gto-audio-status hidden";

    attachAudioWithFallback(audioEl, audioStatus, topic.audioBase);
    audioBox.append(audioEl, audioStatus);

    const notesWrap = document.createElement("div");
    notesWrap.className = "gto-notes-wrap";
    const notesArea = document.createElement("textarea");
    notesArea.className = "gto-notes-input";
    notesArea.rows = 2;
    notesArea.placeholder = "Write key bullet points (Introduction, 3 Arguments, Conclusion)…";
    notesArea.value = state.notes[topic.id] || "";
    notesArea.addEventListener("input", () => {
      state.notes[topic.id] = notesArea.value;
      saveState();
    });
    notesWrap.append(notesArea);

    card.append(header, audioBox, notesWrap);
    els.topicList.append(card);
  });
}

async function init() {
  loadSavedState();

  try {
    const res = await fetch("Lecturate/topics.json", { cache: "no-store" });
    if (res.ok) {
      state.topics = await res.json();
    } else {
      state.topics = FALLBACK_TOPICS;
    }
  } catch (_) {
    state.topics = FALLBACK_TOPICS;
  }

  renderTopics();
  updateProgressUI();
  updateTimerUI();

  els.timerToggleBtn.addEventListener("click", toggleTimer);
  els.timerSwitchBtn.addEventListener("click", switchTimerMode);
  els.timerResetBtn.addEventListener("click", resetTimer);

  els.resetBtn.addEventListener("click", () => {
    if (!confirm("Reset all GTO Public Speaking practice progress and notes?")) return;
    state.practiced = {};
    state.notes = {};
    saveState();
    renderTopics();
    updateProgressUI();
  });
}

init();
