const MP_STORAGE_KEY = "gto-military-planning-v2";
const INITIAL_SECONDS = 15 * 60;

const MILITARY_PLANS = [
  {
    id: "plan-1",
    number: 1,
    shortTitle: "Plan 01 · Railway Sabotage",
    title: "Railway Bridge Sabotage & Medical Evacuation",
    baseTime: "14:00 hrs",
    groupSize: "8 Members",
    scale: "1 cm = 1 km",
    deadline: "15:15 hrs",
    modelImage: "military-planning-model.jpg",
    intro:
      "You are a group of <strong>8 friends</strong> stationed at <strong>Base Post (Alpha)</strong>. It is currently <strong>14:00 hours</strong>. You simultaneously receive three urgent reports:",
    problems: [
      {
        label: "Problem 1 (Critical Sabotage):",
        text: "Suspected terrorists have planted an explosive device at the <strong>Railway Bridge (6 km East)</strong>. An express passenger train is scheduled to cross the bridge at <strong>14:45 hours</strong>.",
      },
      {
        label: "Problem 2 (Medical Emergency):",
        text: "A critically injured villager at <strong>Village Noorpur (3 km North-West)</strong> requires urgent evacuation to the <strong>District Hospital (10 km West)</strong> before <strong>15:00 hours</strong>.",
      },
      {
        label: "Problem 3 (Security Threat):",
        text: "Armed miscreants have been spotted near <strong>Hilltop Post (5 km South-East via rough track)</strong>. The <strong>Police Post (4 km North)</strong> must be alerted immediately for reinforcement.",
      },
    ],
    resources: [
      { name: "Jeep (×1)", detail: "40 km/h metalled road · Max 5 persons" },
      { name: "Motorcycle (×1)", detail: "30 km/h road / 20 km/h rough · Max 2 persons" },
      { name: "On Foot", detail: "Walking 5 km/h · Jogging 8 km/h" },
      { name: "Hard Deadline", detail: "All tasks resolved safely by 15:15 hrs" },
    ],
    sampleSolution: [
      {
        actions:
          "Group A (2 members) takes Motorcycle (30 km/h) to Police Post (4 km) to alert police about bridge sabotage & Hilltop miscreants, then rides straight to Railway Bridge.",
        time: "8 min + 14 min",
        runningTime: "14:00 – 14:22",
      },
      {
        actions:
          "Group B (4 members) takes Jeep (40 km/h) to Railway Bridge (6 km) with tool kit to locate/defuse device and flag down the 14:45 express train if needed.",
        time: "9 min",
        runningTime: "14:00 – 14:09",
      },
      {
        actions:
          "Group C (2 members) jogs/marches to Village Noorpur (3 km) to administer first aid and prepare the injured villager for evacuation.",
        time: "22 min",
        runningTime: "14:00 – 14:22",
      },
      {
        actions:
          "Jeep (leaving 2 members + police at bridge) returns to Village Noorpur, picks up injured villager + Group C, and evacuates to District Hospital (10 km).",
        time: "12 min + 15 min",
        runningTime: "14:22 – 14:49",
      },
      {
        actions:
          "Group A + Police proceed via Motorcycle/Police van to Hilltop Post (5 km) to cordon and neutralize miscreants. All teams regroup at Base Alpha.",
        time: "25 min",
        runningTime: "14:45 – 15:10",
      },
    ],
  },
  {
    id: "plan-2",
    number: 2,
    shortTitle: "Plan 02 · Barrage & Bus Crash",
    title: "Dam Floodgate Warning, Bus Crash & Kidnapping",
    baseTime: "09:00 hrs",
    groupSize: "8 Members",
    scale: "1 cm = 1.5 km",
    deadline: "10:30 hrs",
    modelImage: "military-planning-model-2.jpg",
    intro:
      "You are <strong>8 cadets</strong> camping at <strong>Camp Bravo</strong>. At <strong>09:00 hours</strong>, heavy monsoon rain triggers three simultaneous emergencies:",
    problems: [
      {
        label: "Problem 1 (Highway Bus Crash):",
        text: "A passenger bus has overturned at <strong>Highway Mile 6 (6 km NE)</strong>; 4 passengers are trapped with severe bleeding and need hospital care before <strong>10:15 hours</strong>.",
      },
      {
        label: "Problem 2 (Barrage Gate Jam):",
        text: "Rising water threatens to overflow <strong>River Barrage (8 km NW)</strong>. The barrage technician is injured; the floodgate must be manually opened before <strong>09:50 hours</strong> to save downstream villages.",
      },
      {
        label: "Problem 3 (Kidnapped Child):",
        text: "Two armed kidnappers were seen fleeing with a local child toward <strong>Forest Hideout (5 km SW via muddy track)</strong>.",
      },
    ],
    resources: [
      { name: "Pickup Van (×1)", detail: "40 km/h highway · Max 6 persons" },
      { name: "Bicycle (×2)", detail: "12 km/h road / 8 km/h rough · 1 person each" },
      { name: "First-Aid & Rope", detail: "Available at Camp Bravo" },
      { name: "Hard Deadline", detail: "All tasks resolved safely by 10:30 hrs" },
    ],
    sampleSolution: [
      {
        actions:
          "Group A (2 members) rides Bicycles (12 km/h) to River Barrage (8 km) with crowbars/tools to assist technician and open floodgates by 09:40.",
        time: "40 min",
        runningTime: "09:00 – 09:40",
      },
      {
        actions:
          "Group B (4 members) takes Pickup Van (40 km/h) with First-Aid kit to Highway Bus Crash (6 km) to extract and stabilize trapped passengers.",
        time: "9 min",
        runningTime: "09:00 – 09:09",
      },
      {
        actions:
          "Group C (2 members) jogs toward Forest Hideout (5 km SW) to track kidnappers' footprints without alerting them, marking route for backup.",
        time: "35 min",
        runningTime: "09:00 – 09:35",
      },
      {
        actions:
          "Pickup Van transports 4 injured passengers to City Hospital & HQ (12 km SE), informs Police HQ about Forest Hideout kidnappers, and returns.",
        time: "18 min + 18 min",
        runningTime: "09:20 – 09:56",
      },
      {
        actions:
          "Pickup Van + Police squad intercept Forest Hideout with Group C to rescue the child safely. All groups assemble at Camp Bravo by 10:25.",
        time: "25 min",
        runningTime: "09:56 – 10:21",
      },
    ],
  },
  {
    id: "plan-3",
    number: 3,
    shortTitle: "Plan 03 · Mountain Ambush",
    title: "Mountain Convoy Landslide & Wireless Relay",
    baseTime: "11:00 hrs",
    groupSize: "8 Members",
    scale: "1 cm = 1 km",
    deadline: "12:30 hrs",
    modelImage: "military-planning-model-3.jpg",
    intro:
      "You are a group of <strong>8 scouts</strong> at <strong>Base Ridge</strong> in hilly terrain. At <strong>11:00 hours</strong>, radio silence occurs and three crises emerge:",
    problems: [
      {
        label: "Problem 1 (Injured Patrol Soldier):",
        text: "A patrol soldier fell down a ravine at <strong>South Valley (3 km SW)</strong> with a fractured leg and needs evacuation to <strong>Army Helipad (8 km SE)</strong> before the chopper departs at <strong>12:15 hours</strong>.",
      },
      {
        label: "Problem 2 (Supply Convoy Blocked):",
        text: "A medical supply convoy is stuck behind boulders at <strong>Blocked Pass (5 km NW)</strong>; clearing it requires 4–5 strong hands.",
      },
      {
        label: "Problem 3 (Sabotaged Relay):",
        text: "The <strong>Wireless Relay Tower (4 km NE steep track)</strong> has stopped transmitting; HQ must be alerted about the ambush risk.",
      },
    ],
    resources: [
      { name: "4×4 Jeep (×1)", detail: "25 km/h mountain road · Max 5 persons" },
      { name: "Stretcher & Ropes", detail: "Available at Base Ridge" },
      { name: "On Foot (Steep)", detail: "4 km/h uphill · 6 km/h downhill" },
      { name: "Hard Deadline", detail: "Chopper evacuation by 12:15 hrs" },
    ],
    sampleSolution: [
      {
        actions:
          "Group A (2 members) climbs on foot (4 km/h) with radio repair kit to Wireless Relay (4 km NE) to restore communication and alert HQ.",
        time: "45 min",
        runningTime: "11:00 – 11:45",
      },
      {
        actions:
          "Group B (3 members) takes Stretcher & First-Aid on foot to Injured Patrol (3 km SW) to splint the leg and carry the soldier back toward Base Ridge.",
        time: "30 min + 35 min",
        runningTime: "11:00 – 12:05",
      },
      {
        actions:
          "Group C (3 members) drives 4×4 Jeep (25 km/h) with shovels/ropes to Blocked Pass (5 km NW), clears boulders with convoy drivers, and returns.",
        time: "12 min + 25 min + 12 min",
        runningTime: "11:00 – 11:49",
      },
      {
        actions:
          "4×4 Jeep meets Group B at Base Ridge, loads the injured soldier, and speeds to Army Helipad (8 km SE) before 12:15 takeoff.",
        time: "19 min",
        runningTime: "11:52 – 12:11",
      },
    ],
  },
  {
    id: "plan-4",
    number: 4,
    shortTitle: "Plan 04 · Chemical Fire",
    title: "Factory Fire, Water Tank Contamination & Robbery",
    baseTime: "16:00 hrs",
    groupSize: "8 Members",
    scale: "1 cm = 1 km",
    deadline: "17:20 hrs",
    modelImage: "military-planning-model-4.jpg",
    intro:
      "You are <strong>8 volunteers</strong> at <strong>Youth Hostel (Base)</strong>. At <strong>16:00 hours</strong>, three town emergencies break out simultaneously:",
    problems: [
      {
        label: "Problem 1 (Water Contamination):",
        text: "Miscreants are about to poison the <strong>Town Water Tank (4 km NE)</strong> before the evening municipal supply opens at <strong>16:30 hours</strong>.",
      },
      {
        label: "Problem 2 (Chemical Factory Fire):",
        text: "A fire has started in <strong>Chemical Factory (5 km NW)</strong>; 6 workers are trapped inside a locked wing.",
      },
      {
        label: "Problem 3 (Highway Robbery & Injury):",
        text: "Robbers attacked a cash van at <strong>Highway Point (6 km SW)</strong>, leaving the guard bleeding and fleeing on foot.",
      },
    ],
    resources: [
      { name: "SUV Car (×1)", detail: "45 km/h metalled road · Max 5 persons" },
      { name: "Motorcycle (×1)", detail: "30 km/h · Max 2 persons" },
      { name: "Fire Extinguishers", detail: "2 cylinders at Youth Hostel" },
      { name: "Hard Deadline", detail: "Water valve opens at 16:30 hrs" },
    ],
    sampleSolution: [
      {
        actions:
          "Group A (2 members) speeds on Motorcycle (30 km/h) to Town Water Tank (4 km NE) to stop miscreants and lock the main supply valve before 16:30.",
        time: "8 min",
        runningTime: "16:00 – 16:08",
      },
      {
        actions:
          "Group B (4 members) takes SUV Car (45 km/h) with extinguishers to Chemical Factory (5 km NW) to rescue the 6 trapped workers.",
        time: "7 min",
        runningTime: "16:00 – 16:07",
      },
      {
        actions:
          "Group C (2 members) jogs toward Fire & Police HQ (8 km SE) or intercepts passing highway traffic to summon Fire Brigade & Police.",
        time: "15 min",
        runningTime: "16:00 – 16:15",
      },
      {
        actions:
          "Group A leaves 1 member guarding Water Tank and rides Motorcycle to Fire & Police HQ (8 km SE) to dispatch fire tenders & ambulances immediately.",
        time: "14 min",
        runningTime: "16:10 – 16:24",
      },
      {
        actions:
          "SUV Car picks up injured guard at Highway Point (6 km SW) and evacuates him to Town Hospital, while Police cordon the escaping robbers.",
        time: "18 min",
        runningTime: "16:25 – 16:43",
      },
    ],
  },
  {
    id: "plan-5",
    number: 5,
    shortTitle: "Plan 05 · Canal & Train",
    title: "Canal Breach, Train Derailment & Dacoit Escape",
    baseTime: "07:30 hrs",
    groupSize: "8 Members",
    scale: "1 cm = 2 km",
    deadline: "09:00 hrs",
    modelImage: "military-planning-model-5.jpg",
    intro:
      "You are <strong>8 candidates</strong> at <strong>Rest House (Base)</strong>. At <strong>07:30 hours</strong>, three serious incidents are reported:",
    problems: [
      {
        label: "Problem 1 (Train Derailment):",
        text: "Two bogies of a local train derailed at <strong>Railway Sector (10 km NE)</strong>; several passengers need emergency first aid and evacuation.",
      },
      {
        label: "Problem 2 (Canal Embankment Breach):",
        text: "A 10-foot breach in the <strong>Main Canal (6 km NW)</strong> is flooding nearby crops and homes; sandbags at the site need urgent stacking.",
      },
      {
        label: "Problem 3 (Dacoits Fleeing by Boat):",
        text: "Armed dacoits robbed a village bank and are escaping downstream on a motorboat near <strong>Ghat Point (4 km SW)</strong>.",
      },
    ],
    resources: [
      { name: "Tractor Trolley (×1)", detail: "25 km/h · Carries 8 persons + sandbags" },
      { name: "Motorbike (×1)", detail: "40 km/h road · Max 2 persons" },
      { name: "First-Aid & Torch", detail: "Available at Rest House" },
      { name: "Hard Deadline", detail: "Contain all emergencies by 09:00 hrs" },
    ],
    sampleSolution: [
      {
        actions:
          "Group A (2 members) rides Motorbike (40 km/h) to Tehsil Police & Hospital (8 km SE) to mobilize ambulances & police boats, then heads straight to Train Derailment.",
        time: "12 min + 14 min",
        runningTime: "07:30 – 07:56",
      },
      {
        actions:
          "Group B (4 members) takes Tractor Trolley (25 km/h) to Canal Breach (6 km NW), organizes villagers to stack sandbags and seal the breach.",
        time: "15 min + 25 min",
        runningTime: "07:30 – 08:10",
      },
      {
        actions:
          "Group C (2 members) moves toward Ghat Point (4 km SW) to observe dacoits' boat direction and relay coordinates to Police Patrol.",
        time: "30 min",
        runningTime: "07:30 – 08:00",
      },
      {
        actions:
          "Group A + Ambulances reach Train Derailment (10 km NE), administer triage/first aid, and evacuate critical passengers to Tehsil Hospital.",
        time: "30 min",
        runningTime: "07:56 – 08:26",
      },
      {
        actions:
          "All groups coordinate with Police & Irrigation authorities and regroup at Rest House by 08:55.",
        time: "25 min",
        runningTime: "08:30 – 08:55",
      },
    ],
  },
];

const state = {
  activePlanId: MILITARY_PLANS[0].id,
  plansData: {},
};

const els = {
  topbarBadge: document.querySelector("#mp-topbar-badge"),
  modelVisual: document.querySelector("#mp-model-visual"),
  modelCaption: document.querySelector("#mp-model-caption"),
  modelHeading: document.querySelector("#mp-model-heading"),
  narrativeBox: document.querySelector("#mp-narrative-box"),
  paperStamp: document.querySelector("#mp-paper-stamp"),
  aimInput: document.querySelector("#mp-aim-input"),
  resourcesInput: document.querySelector("#mp-resources-input"),
  tableBody: document.querySelector("#mp-table-body"),
  addRowBtn: document.querySelector("#mp-add-row-btn"),
  saveStatus: document.querySelector("#mp-save-status"),
  copyBtn: document.querySelector("#mp-copy-btn"),
  printBtn: document.querySelector("#mp-print-btn"),
  resetBtn: document.querySelector("#mp-reset-btn"),
  sampleBtn: document.querySelector("#mp-sample-btn"),
  sampleBox: document.querySelector("#mp-sample-box"),
  sampleBody: document.querySelector("#mp-sample-body"),
  closeSampleBtn: document.querySelector("#mp-close-sample-btn"),
  toggleInstBtn: document.querySelector("#mp-toggle-inst-btn"),
  instBody: document.querySelector("#mp-instructions-body"),
  zoomBtn: document.querySelector("#mp-zoom-btn"),
  zoomModal: document.querySelector("#mp-zoom-modal"),
  modalVisual: document.querySelector("#mp-modal-visual"),
  zoomClose: document.querySelector("#mp-zoom-close"),
};

function getEmptyPlanEntry() {
  return {
    aim: "",
    resources: "",
    rows: Array.from({ length: 5 }, () => ({
      actions: "",
      time: "",
      runningTime: "",
    })),
  };
}

function getActivePlan() {
  return MILITARY_PLANS.find((p) => p.id === state.activePlanId) || MILITARY_PLANS[0];
}

function getActivePlanData() {
  if (!state.plansData[state.activePlanId]) {
    state.plansData[state.activePlanId] = getEmptyPlanEntry();
  }
  return state.plansData[state.activePlanId];
}

function formatTime(sec) {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

function playEndChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    [0, 0.24].forEach((offset) => {
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

function saveState() {
  try {
    localStorage.setItem(
      MP_STORAGE_KEY,
      JSON.stringify({
        activePlanId: state.activePlanId,
        plansData: state.plansData,
        savedAt: new Date().toISOString(),
      })
    );
    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (els.saveStatus) {
      els.saveStatus.textContent = `Saved ${timeStr}`;
    }
  } catch (_) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(MP_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      if (parsed.activePlanId && MILITARY_PLANS.some((p) => p.id === parsed.activePlanId)) {
        state.activePlanId = parsed.activePlanId;
      }
      if (parsed.plansData && typeof parsed.plansData === "object") {
        state.plansData = parsed.plansData;
      }
    }
  } catch (_) {}
}

function buildTacticalSvg(plan) {
  const cfg = plan.svgConfig;
  const bgMap = {
    river: "#eef5ec",
    mountain: "#f1efe9",
    industrial: "#f3f4f6",
    canal: "#eff6ee",
  };
  const bg = bgMap[cfg.terrain] || "#eef5ec";

  const roadsSvg = (cfg.roads || [])
    .map(
      ([x1, y1, x2, y2]) =>
        `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#475569" stroke-width="8" stroke-linecap="round" />` +
        `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#f8fafc" stroke-width="1.5" stroke-dasharray="10 8" />`
    )
    .join("");

  const tracksSvg = (cfg.tracks || [])
    .map(
      ([x1, y1, x2, y2]) =>
        `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#92400e" stroke-width="4" stroke-dasharray="8 6" stroke-linecap="round" />`
    )
    .join("");

  const riverSvg = cfg.riverPath
    ? `<path d="${cfg.riverPath}" fill="none" stroke="#38bdf8" stroke-width="18" stroke-linecap="round" opacity="0.7" />
       <path d="${cfg.riverPath}" fill="none" stroke="#0284c7" stroke-width="10" stroke-linecap="round" opacity="0.55" />`
    : "";

  const colorMap = {
    base: "#1d4ed8",
    alert: "#dc2626",
    medical: "#ea580c",
    threat: "#7c3aed",
    safe: "#15803d",
  };

  const nodesSvg = (cfg.nodes || [])
    .map((n) => {
      const fill = colorMap[n.type] || "#1e293b";
      const boxW = Math.max(150, n.label.length * 7.6 + 22);
      const boxX = Math.min(Math.max(n.x - boxW / 2, 16), 900 - boxW - 16);
      const boxY = n.y < 150 ? n.y + 18 : n.y - 44;
      return `
        <g>
          <circle cx="${n.x}" cy="${n.y}" r="11" fill="${fill}" stroke="#ffffff" stroke-width="3" />
          <rect x="${boxX}" y="${boxY}" width="${boxW}" height="28" rx="8" fill="#ffffff" stroke="${fill}" stroke-width="1.6" />
          <text x="${boxX + boxW / 2}" y="${boxY + 18}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="12" font-weight="700" fill="#0f172a">${n.label}</text>
        </g>
      `;
    })
    .join("");

  return `
    <svg viewBox="0 0 900 460" class="mp-svg-map" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${plan.title} Tactical Map">
      <rect width="900" height="460" fill="${bg}" />
      <g opacity="0.16" stroke="#64748b" stroke-width="1">
        <line x1="0" y1="115" x2="900" y2="115" />
        <line x1="0" y1="230" x2="900" y2="230" />
        <line x1="0" y1="345" x2="900" y2="345" />
        <line x1="225" y1="0" x2="225" y2="460" />
        <line x1="450" y1="0" x2="450" y2="460" />
        <line x1="675" y1="0" x2="675" y2="460" />
      </g>
      ${riverSvg}
      ${tracksSvg}
      ${roadsSvg}
      ${nodesSvg}
      <g transform="translate(835, 42)">
        <circle cx="0" cy="0" r="22" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
        <polygon points="0,-15 6,5 0,1 -6,5" fill="#dc2626" />
        <text x="0" y="16" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="800" fill="#0f172a">N</text>
      </g>
      <g transform="translate(24, 424)">
        <rect x="0" y="-8" width="160" height="24" rx="6" fill="#ffffff" opacity="0.92" stroke="#cbd5e1" />
        <text x="80" y="8" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="700" fill="#334155">Scale: ${plan.scale}</text>
      </g>
    </svg>
  `;
}

function renderModelAndBriefing() {
  const plan = getActivePlan();

  if (els.topbarBadge) {
    els.topbarBadge.textContent = plan.shortTitle;
  }
  document.title = `${plan.shortTitle} — GTO Military Planning`;
  els.modelHeading.textContent = `Plan ${String(plan.number).padStart(2, "0")}: ${plan.title}`;
  els.paperStamp.textContent = `ISSB CANDIDATE ANSWER SHEET · PLAN ${String(plan.number).padStart(2, "0")}`;

  if (plan.modelImage) {
    const imgHtml = `<img src="${plan.modelImage}" alt="${plan.title} Tactical Sand Model" class="mp-model-img" id="mp-model-img" />`;
    els.modelVisual.innerHTML = imgHtml;
    els.modalVisual.innerHTML = `<img src="${plan.modelImage}" alt="Enlarged ${plan.title}" class="mp-modal-img" />`;
    const imgEl = els.modelVisual.querySelector("#mp-model-img");
    if (imgEl) {
      imgEl.addEventListener("click", () => els.zoomModal.classList.remove("hidden"));
    }
  } else {
    const svgHtml = buildTacticalSvg(plan);
    els.modelVisual.innerHTML = svgHtml;
    els.modalVisual.innerHTML = svgHtml;
    const svgEl = els.modelVisual.querySelector("svg");
    if (svgEl) {
      svgEl.style.cursor = "zoom-in";
      svgEl.addEventListener("click", () => els.zoomModal.classList.remove("hidden"));
    }
  }

  els.modelCaption.innerHTML = `
    <span>Scale: <strong>${plan.scale}</strong></span>
    <span>Base Time: <strong>${plan.baseTime}</strong></span>
    <span>Group Strength: <strong>${plan.groupSize}</strong></span>
    <span>Deadline: <strong>${plan.deadline}</strong></span>
  `;

  els.narrativeBox.innerHTML = `
    <h3>Tactical Narrative (Read Carefully)</h3>
    <p>${plan.intro}</p>
    <ul class="mp-problem-list">
      ${plan.problems.map((p) => `<li><strong>${p.label}</strong> ${p.text}</li>`).join("")}
    </ul>
    <div class="mp-resources-grid">
      ${plan.resources
        .map(
          (r) => `
        <div class="mp-resource-chip">
          <strong>${r.name}</strong>
          <span>${r.detail}</span>
        </div>`
        )
        .join("")}
    </div>
  `;

  els.sampleBody.innerHTML = plan.sampleSolution
    .map(
      (s, idx) => `
      <tr>
        <td class="col-step">${idx + 1}</td>
        <td class="col-actions">${s.actions}</td>
        <td class="col-time">${s.time}</td>
        <td class="col-running">${s.runningTime}</td>
      </tr>`
    )
    .join("");
}

function autoResizeTextarea(ta) {
  ta.style.height = "auto";
  ta.style.height = `${Math.max(44, ta.scrollHeight)}px`;
}

function renderTable() {
  const data = getActivePlanData();
  els.aimInput.value = data.aim || "";
  els.resourcesInput.value = data.resources || "";
  els.tableBody.replaceChildren();

  data.rows.forEach((row, index) => {
    const tr = document.createElement("tr");

    const tdStep = document.createElement("td");
    tdStep.className = "col-step";
    tdStep.textContent = String(index + 1);

    const tdActions = document.createElement("td");
    tdActions.className = "col-actions";
    const actionTa = document.createElement("textarea");
    actionTa.className = "mp-cell-textarea";
    actionTa.rows = 1;
    actionTa.placeholder =
      index === 0
        ? "Describe sub-group, vehicle/route, and primary task…"
        : "Describe next action step…";
    actionTa.value = row.actions || "";
    actionTa.addEventListener("input", () => {
      data.rows[index].actions = actionTa.value;
      autoResizeTextarea(actionTa);
      saveState();
    });
    tdActions.append(actionTa);

    const tdTime = document.createElement("td");
    tdTime.className = "col-time";
    const timeInput = document.createElement("input");
    timeInput.type = "text";
    timeInput.className = "mp-cell-input";
    timeInput.placeholder = "10 min";
    timeInput.value = row.time || "";
    timeInput.addEventListener("input", () => {
      data.rows[index].time = timeInput.value;
      saveState();
    });
    tdTime.append(timeInput);

    const tdRunning = document.createElement("td");
    tdRunning.className = "col-running";
    const runInput = document.createElement("input");
    runInput.type = "text";
    runInput.className = "mp-cell-input";
    runInput.placeholder = "14:00 – 14:10";
    runInput.value = row.runningTime || "";
    runInput.addEventListener("input", () => {
      data.rows[index].runningTime = runInput.value;
      saveState();
    });
    tdRunning.append(runInput);

    const tdDel = document.createElement("td");
    tdDel.className = "col-del";
    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "mp-del-row-btn";
    delBtn.title = "Delete row";
    delBtn.textContent = "×";
    delBtn.disabled = data.rows.length <= 1;
    delBtn.addEventListener("click", () => {
      if (data.rows.length <= 1) return;
      data.rows.splice(index, 1);
      saveState();
      renderTable();
    });
    tdDel.append(delBtn);

    tr.append(tdStep, tdActions, tdTime, tdRunning, tdDel);
    els.tableBody.append(tr);
    requestAnimationFrame(() => autoResizeTextarea(actionTa));
  });
}

function renderAll() {
  renderModelAndBriefing();
  renderTable();
}

function buildCopyText() {
  const plan = getActivePlan();
  const data = getActivePlanData();
  const lines = [
    `ISSB GTO — ${plan.title.toUpperCase()}`,
    "==============================================",
    `Aim / Mission: ${data.aim || "(Not filled)"}`,
    `Resources: ${data.resources || "(Not filled)"}`,
    "",
    "EXECUTION TABLE:",
  ];
  data.rows.forEach((r, i) => {
    if (r.actions || r.time || r.runningTime) {
      lines.push(
        `${i + 1}. [${r.runningTime || "--:--"}] (${r.time || "--"}) — ${r.actions || ""}`
      );
    }
  });
  return lines.join("\n");
}

function init() {
  loadState();
  const requestedPlan = new URLSearchParams(window.location.search).get("plan");
  if (requestedPlan && MILITARY_PLANS.some((p) => p.id === requestedPlan)) {
    state.activePlanId = requestedPlan;
  }
  renderAll();

  els.aimInput.addEventListener("input", () => {
    getActivePlanData().aim = els.aimInput.value;
    saveState();
  });

  els.resourcesInput.addEventListener("input", () => {
    getActivePlanData().resources = els.resourcesInput.value;
    saveState();
  });

  els.addRowBtn.addEventListener("click", () => {
    getActivePlanData().rows.push({ actions: "", time: "", runningTime: "" });
    saveState();
    renderTable();
  });

  els.toggleInstBtn.addEventListener("click", () => {
    const hidden = els.instBody.classList.toggle("hidden");
    els.toggleInstBtn.textContent = hidden ? "Show Details" : "Hide Details";
  });

  els.sampleBtn.addEventListener("click", () => {
    els.sampleBox.classList.toggle("hidden");
    if (!els.sampleBox.classList.contains("hidden")) {
      els.sampleBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });

  els.closeSampleBtn.addEventListener("click", () => {
    els.sampleBox.classList.add("hidden");
  });

  els.copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(buildCopyText());
      const orig = els.copyBtn.textContent;
      els.copyBtn.textContent = "Copied ✓";
      setTimeout(() => {
        els.copyBtn.textContent = orig;
      }, 1800);
    } catch (_) {}
  });

  els.printBtn.addEventListener("click", () => {
    window.print();
  });

  els.resetBtn.addEventListener("click", () => {
    const plan = getActivePlan();
    if (!confirm(`Clear your written answer sheet for ${plan.shortTitle}?`)) return;
    state.plansData[state.activePlanId] = getEmptyPlanEntry();
    saveState();
    renderTable();
  });

  const openZoom = () => els.zoomModal.classList.remove("hidden");
  const closeZoom = () => els.zoomModal.classList.add("hidden");
  els.zoomBtn.addEventListener("click", openZoom);
  els.zoomClose.addEventListener("click", closeZoom);
  els.zoomModal.addEventListener("click", (e) => {
    if (e.target === els.zoomModal) closeZoom();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeZoom();
  });
}

init();
