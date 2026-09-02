// ==========================================================================
// THE TIME-TRAVEL BROWSER - CONTROLLER (100% VECTOR PICTURES & DYNAMIC ERA ANIMATIONS)
// ==========================================================================

let currentEra = 0;
let isWarping = false;
let chiselHits = 0;
let handprintCount = 12;
let autoLoopTimer = null;
let isAutoLoop = false;
let isDarkMode = false;
let morsePressStartTime = 0;

// SVG Picture Definitions for Relics
const relicSvgIcons = [
    // 0: Fire Flint
    `<svg class="img-pic icon-med" viewBox="0 0 24 24" fill="#f59e0b"><polygon points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9"/></svg>`,
    // 1: Royal Crown Signet
    `<svg class="img-pic icon-med" viewBox="0 0 24 24" fill="#eab308"><polygon points="3,18 21,18 20,8 14,13 12,5 10,13 4,8"/><circle cx="4" cy="7" r="1.5"/><circle cx="12" cy="4" r="1.5"/><circle cx="20" cy="7" r="1.5"/></svg>`,
    // 2: Chrono-Gear
    `<svg class="img-pic icon-med" viewBox="0 0 24 24" fill="#fbbf24"><circle cx="12" cy="12" r="4"/><path d="M12 2v3 M12 19v3 M2 12h3 M19 12h3 M4.93 4.93l2.12 2.12 M16.95 16.95l2.12 2.12 M4.93 19.07l2.12-2.12 M16.95 7.05l2.12-2.12"/></svg>`,
    // 3: Silicon Microchip
    `<svg class="img-pic icon-med" viewBox="0 0 24 24" fill="#38bdf8"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" fill="#0f172a"/><path d="M8 1v3 M12 1v3 M16 1v3 M8 20v3 M12 20v3 M16 20v3 M1 8h3 M1 12h3 M1 16h3 M20 8h3 M20 12h3 M20 16h3"/></svg>`,
    // 4: Tachyon Core Crystal
    `<svg class="img-pic icon-med" viewBox="0 0 24 24" fill="#00f0ff"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg>`
];

// Era Transition Vector Pictures
const eraTransitionSvgs = [
    // 0: Stone Age Tablet
    `<svg class="warp-era-pic" viewBox="0 0 64 64" fill="#f59e0b"><polygon points="10,8 54,8 60,24 52,56 12,56 4,24" stroke="#78350f" stroke-width="3"/><line x1="18" y1="20" x2="46" y2="20" stroke="#78350f" stroke-width="3"/><line x1="18" y1="32" x2="46" y2="32" stroke="#78350f" stroke-width="3"/></svg>`,
    // 1: Medieval Castle
    `<svg class="warp-era-pic" viewBox="0 0 64 64" fill="#eab308"><rect x="12" y="24" width="40" height="32"/><polygon points="8,24 16,10 24,24"/><polygon points="40,24 48,10 56,24"/><path d="M26 56 A6 6 0 0 1 38 56 Z" fill="#78350f"/></svg>`,
    // 2: Industrial Pocket Clock / Gear
    `<svg class="warp-era-pic" viewBox="0 0 64 64" fill="#fbbf24"><circle cx="32" cy="34" r="24" stroke="#1f1811" stroke-width="4"/><path d="M32 18v16l8 8" stroke="#1f1811" stroke-width="4"/><circle cx="32" cy="6" r="4" fill="#1f1811"/></svg>`,
    // 3: Modern Laptop / Web
    `<svg class="warp-era-pic" viewBox="0 0 64 64" fill="#38bdf8"><rect x="10" y="14" width="44" height="28" rx="3" stroke="#0284c7" stroke-width="3"/><path d="M6 46h52 M24 46v4h16v-4" stroke="#0284c7" stroke-width="4"/></svg>`,
    // 4: Quantum Hyper Star
    `<svg class="warp-era-pic" viewBox="0 0 64 64" fill="#00f0ff"><polygon points="32,4 40,24 60,32 40,40 32,60 24,40 4,32 24,24"/></svg>`
];

// Chrono-Relic Collection State
const relics = [
    { id: 0, name: "Fire Flint", era: "Stone Age", found: false },
    { id: 1, name: "Royal Signet", era: "Medieval", found: false },
    { id: 2, name: "Chrono-Gear", era: "Industrial", found: false },
    { id: 3, name: "Microchip", era: "Present Day", found: false },
    { id: 4, name: "Tachyon Core", era: "Future", found: false }
];

const eraNames = [
    "STONE AGE",
    "MEDIEVAL AGE",
    "OLD AGE",
    "PRESENT DAY",
    "FUTURE"
];

// Start journey from landing
function startJourney() {
    audio.init();
    audio.playWarpSound();
    document.getElementById("landing").classList.add("hidden");
    document.getElementById("browser").classList.remove("hidden");
    renderRelicMuseum();
    loadEra(0);
}

// Jump directly to an era from the landing page preview cards
function jumpToEraFromLanding(eraIndex) {
    audio.init();
    audio.playWarpSound();
    document.getElementById("landing").classList.add("hidden");
    document.getElementById("browser").classList.remove("hidden");
    renderRelicMuseum();
    loadEra(eraIndex);
}

// Return to landing
const eraCursorClasses = [
    "cursor-stone",
    "cursor-medieval",
    "cursor-old",
    "cursor-present",
    "cursor-future"
];

function updateEraCursor(era) {
    document.body.classList.remove("cursor-stone", "cursor-medieval", "cursor-old", "cursor-present", "cursor-future");
    if (era >= 0 && era < eraCursorClasses.length) {
        document.body.classList.add(eraCursorClasses[era]);
    }
}

// Return to landing
function goToLanding() {
    audio.playClick();
    document.getElementById("browser").classList.add("hidden");
    document.getElementById("landing").classList.remove("hidden");
    document.body.classList.remove("cursor-stone", "cursor-medieval", "cursor-old", "cursor-present", "cursor-future");
    if (isAutoLoop) toggleAutoLoop();
}

// Hide all era sections
function hideAll() {
    document.querySelectorAll(".era").forEach(function(era) {
        era.style.display = "none";
    });
}

// Update Timeline dots in header
function updateTimelineHeader(era) {
    const steps = document.querySelectorAll(".timeline-step");
    steps.forEach((step, idx) => {
        if (idx === era) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }
    });
}

// Load a specific era
function loadEra(era) {
    if (isWarping) return;
    hideAll();
    currentEra = era;

    document.getElementById("eraName").textContent = eraNames[era];
    document.getElementById("eraProgress").textContent = "ERA " + (era + 1) + " / 5";

    updateTimelineHeader(era);
    updateEraCursor(era);

    if (era === 0) {
        document.getElementById("stoneInterface").style.display = "block";
        setupRock();
    }

    if (era === 1) {
        document.getElementById("medievalInterface").style.display = "block";
        setupParchment();
    }

    if (era === 2) {
        document.getElementById("oldInterface").style.display = "block";
        setupDial();
    }

    if (era === 3) {
        document.getElementById("presentInterface").style.display = "block";
    }

    if (era === 4) {
        document.getElementById("futureInterface").style.display = "block";
    }
}

// Time travel to next era with cinematic warp transition
function travelNext() {
    if (isWarping) return;
    isWarping = true;

    currentEra = (currentEra + 1) % 5;

    const transition = document.getElementById("transition");
    const iconWrap = document.getElementById("transitionIconWrap");
    if (iconWrap) {
        iconWrap.innerHTML = eraTransitionSvgs[currentEra];
    }
    
    document.getElementById("transitionTitle").textContent = "TRAVELING TO " + eraNames[currentEra];

    audio.playWarpSound();
    transition.style.display = "grid";

    setTimeout(function() {
        transition.style.display = "none";
        isWarping = false;
        loadEra(currentEra);
    }, 1200);
}

// Auto-cycle loop toggle
function toggleAutoLoop() {
    audio.playClick();
    isAutoLoop = !isAutoLoop;
    const btn = document.getElementById("autoLoopBtn");
    const txt = document.getElementById("autoLoopText");

    if (isAutoLoop) {
        btn.classList.add("active");
        txt.textContent = "LOOP ON";
        showToast("Auto-Travel Loop Engaged! Cycling eras every 12 seconds.");
        autoLoopTimer = setInterval(() => {
            if (!isWarping) travelNext();
        }, 12000);
    } else {
        btn.classList.remove("active");
        txt.textContent = "LOOP OFF";
        if (autoLoopTimer) clearInterval(autoLoopTimer);
        showToast("Auto-Travel Loop Paused.");
    }
}

// Sound toggle
function toggleSound() {
    const enabled = audio.toggle();
    const soundText = document.querySelector(".sound-text");
    const iconSvg = document.getElementById("soundIconSvg");
    
    if (enabled) {
        if (soundText) soundText.textContent = "AUDIO ON";
        if (iconSvg) {
            iconSvg.innerHTML = `<polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M19.07 4.93a10 10 0 010 14.14 M15.54 8.46a5 5 0 010 7.07"/>`;
            iconSvg.style.stroke = "#38bdf8";
        }
        audio.playClick();
        showToast("Procedural Audio Enabled");
    } else {
        if (soundText) soundText.textContent = "MUTED";
        if (iconSvg) {
            iconSvg.innerHTML = `<polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>`;
            iconSvg.style.stroke = "#94a3b8";
        }
        showToast("Audio Muted");
    }
}

// Global Toast Display
function showToast(msg) {
    const toast = document.getElementById("globalToast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove("hidden");
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 3500);
}

/* ==========================================================================
   DYNAMIC ERA ACTION ANIMATIONS (WORLD-BUILDING EVENTS)
   ========================================================================== */

// 1. Stone Age: Mammoth Stampede & Hunter Smoke Signal
function triggerMammothStampede() {
    audio.playMammothRumble();
    const mammoth = document.getElementById("mammothStampede");
    if (mammoth) {
        mammoth.classList.remove("hidden");
        setTimeout(() => mammoth.classList.add("hidden"), 4200);
    }
    triggerHunterSmoke();
}

function triggerHunterSmoke() {
    const hunter = document.getElementById("hunterSmokeSignal");
    if (hunter) {
        hunter.classList.remove("hidden");
        setTimeout(() => hunter.classList.add("hidden"), 4800);
    }
}

// 2. Medieval Age: Charging Knight on Warhorse
function triggerKnightCharge() {
    audio.playKnightGallop();
    const knight = document.getElementById("knightCharge");
    if (knight) {
        knight.classList.remove("hidden");
        setTimeout(() => knight.classList.add("hidden"), 4000);
    }
}

// 3. Old Industrial Age: Steam Locomotive & Newsboy
function triggerSteamLocomotive() {
    audio.playTrainWhistle();
    const train = document.getElementById("steamLocomotive");
    if (train) {
        train.classList.remove("hidden");
        setTimeout(() => train.classList.add("hidden"), 4500);
    }
    triggerNewsboy();
}

function triggerNewsboy() {
    const newsboy = document.getElementById("newsboyShout");
    if (newsboy) {
        newsboy.classList.remove("hidden");
        setTimeout(() => newsboy.classList.add("hidden"), 4500);
    }
}

// 4. Present Day: High-Speed Prime Delivery Drone
function triggerDeliveryDrone() {
    audio.playDroneWhir();
    const drone = document.getElementById("primeDeliveryDrone");
    if (drone) {
        drone.classList.remove("hidden");
        setTimeout(() => drone.classList.add("hidden"), 4200);
    }
}

// 5. Quantum Future: Hyperspace Hovercar & 3D Hologram Avatar
function triggerHyperspaceHovercar() {
    audio.playHovercarFlyby();
    const hovercar = document.getElementById("hyperspaceHovercar");
    if (hovercar) {
        hovercar.classList.remove("hidden");
        setTimeout(() => hovercar.classList.add("hidden"), 3800);
    }
    triggerHoloCompanion();
}

function triggerHoloCompanion() {
    const avatar = document.getElementById("hologramAICompanion");
    if (avatar) {
        avatar.classList.remove("hidden");
        setTimeout(() => avatar.classList.add("hidden"), 4500);
    }
}

/* ==========================================================================
   CHRONO-RELIC MUSEUM SYSTEM
   ========================================================================== */

function unlockRelic(index) {
    if (relics[index].found) return;
    relics[index].found = true;
    audio.playRoyalChime();

    showToast(`CHRONO-RELIC ACQUIRED: ${relics[index].name}!`);
    updateRelicHeaderCount();
    renderRelicMuseum();

    // Check if all 5 unlocked
    if (relics.every(r => r.found)) {
        const badge = document.getElementById("masterStabilizerBadge");
        if (badge) badge.classList.remove("hidden");
        showToast("ALL 5 RELICS DISCOVERED! TIMELINE PARADOX STABILIZED!");
        audio.playFutureChord();
    }
}

function updateRelicHeaderCount() {
    const foundCount = relics.filter(r => r.found).length;
    const txt = document.getElementById("relicCountText");
    if (txt) txt.textContent = `RELICS: ${foundCount}/5`;
}

function renderRelicMuseum() {
    const grid = document.getElementById("relicGrid");
    if (!grid) return;

    grid.innerHTML = relics.map((r, i) => `
        <div class="relic-slot ${r.found ? 'unlocked' : ''}">
            <div class="relic-slot-icon-wrap">${relicSvgIcons[i]}</div>
            <div class="relic-slot-name">${r.found ? r.name : '??? Locked'}</div>
            <div class="relic-slot-era">${r.era}</div>
        </div>
    `).join("");

    updateRelicHeaderCount();
}

function toggleRelicModal() {
    audio.playClick();
    const modal = document.getElementById("relicModal");
    if (modal) modal.classList.toggle("hidden");
}

function closeRelicModal(e) {
    if (e.target.id === "relicModal") {
        document.getElementById("relicModal").classList.add("hidden");
        audio.playClick();
    }
}

/* ==========================================================================
   1. STONE AGE LOGIC
   ========================================================================== */

function setupRock() {
    const rock = document.getElementById("rock");
    if (!rock) return;

    let dragging = false;
    let startX = 0;

    rock.onpointerdown = function(e) {
        audio.init();
        dragging = true;
        startX = e.clientX;
        rock.setPointerCapture(e.pointerId);
        audio.playRockClack();
        e.preventDefault();
    };

    rock.onpointermove = function(e) {
        if (!dragging) return;

        let distance = e.clientX - startX;
        if (distance < 0) distance = 0;
        if (distance > 240) distance = 240;

        rock.style.transform = "translateX(" + distance + "px)";

        if (distance >= 210) {
            dragging = false;
            rock.style.transform = "translateX(0)";
            travelNext();
        }
    };

    rock.onpointerup = function() {
        dragging = false;
        rock.style.transform = "translateX(0)";
    };

    rock.onpointercancel = function() {
        dragging = false;
        rock.style.transform = "translateX(0)";
    };
}

function decodeGlyph(symbol, translation) {
    audio.playRockClack();
    showToast(`[${symbol}] ` + translation);
    if (symbol === 'Mammoth') {
        triggerMammothStampede();
    }
}

function chiselTablet(e) {
    chiselHits++;
    audio.playRockClack();
    audio.playSpark();

    const countElem = document.getElementById("chiselCount");
    if (countElem) countElem.textContent = chiselHits;

    const msgElem = document.getElementById("tabletMessage");
    if (chiselHits >= 5) {
        if (msgElem) {
            msgElem.textContent = "ANCIENT CHRONO-PROPHECY UNLOCKED: 'THE TIMELINE IS A CIRCLE!'";
            msgElem.style.color = "#fbbf24";
        }
        unlockRelic(0); // Unlock Fire Flint
        triggerHunterSmoke();
    }
}

function tradeFlint() {
    audio.playRockClack();
    showToast("Traded 3 sharp flints for 1 Mammoth Tusk with Chief Grog!");
    triggerMammothStampede(); // Mammoth runs & leather hunter sends smoke signal!
    unlockRelic(0);
}

function stampOchreHand(e) {
    handprintCount++;
    audio.playRockClack();
    document.getElementById("handprintCount").textContent = handprintCount;
    showToast("Red ochre handprint stamped on the cave wall!");
    triggerHunterSmoke();
}

/* ==========================================================================
   2. MEDIEVAL AGE LOGIC
   ========================================================================== */

function setupParchment() {
    const parchment = document.getElementById("parchment");
    if (!parchment) return;

    let dragging = false;
    let startY = 0;

    parchment.onpointerdown = function(e) {
        audio.init();
        dragging = true;
        startY = e.clientY;
        parchment.setPointerCapture(e.pointerId);
        audio.playParchmentPull();
        e.preventDefault();
    };

    parchment.onpointermove = function(e) {
        if (!dragging) return;

        let distance = e.clientY - startY;
        if (distance < 0) distance = 0;
        if (distance > 190) distance = 190;

        parchment.style.transform = "translateY(" + distance + "px)";

        if (distance >= 145) {
            dragging = false;
            parchment.style.transform = "translateY(0)";
            travelNext();
        }
    };

    parchment.onpointerup = function() {
        dragging = false;
        parchment.style.transform = "translateY(0)";
    };

    parchment.onpointercancel = function() {
        dragging = false;
        parchment.style.transform = "translateY(0)";
    };
}

function stampWaxSeal() {
    audio.playWaxCrack();
    audio.playRoyalChime();
    const seal = document.getElementById("royalSeal");
    seal.style.transform = "scale(1.25) rotate(20deg)";
    seal.style.background = "#991b1b";

    showToast("Royal Seal Authenticated by Order of the Crown!");
    triggerKnightCharge(); // Armored knight gallops across on warhorse!
    unlockRelic(1); // Unlock Royal Signet

    setTimeout(() => {
        seal.style.transform = "none";
    }, 2500);
}

function buyKnightArmor() {
    audio.playRoyalChime();
    showToast("Acquired Damascus Steel Knight Armor with 15 Gold Sovereigns!");
    triggerKnightCharge(); // Armored knight gallops across on warhorse!
    unlockRelic(1);
}

function dispatchPigeon() {
    audio.playParchmentPull();
    const pigeon = document.getElementById("carrierPigeon");
    if (pigeon) {
        pigeon.classList.remove("hidden");
        setTimeout(() => pigeon.classList.add("hidden"), 3600);
    }
    showToast("Carrier Pigeon dispatched across the kingdom with royal scroll!");
    unlockRelic(1);
}

/* ==========================================================================
   3. OLD INDUSTRIAL AGE LOGIC
   ========================================================================== */

function setupDial() {
    const dial = document.getElementById("dial");
    const degDisplay = document.getElementById("dialDegrees");
    if (!dial) return;

    let dragging = false;
    let startX = 0;
    let rotation = 0;

    dial.onpointerdown = function(e) {
        audio.init();
        dragging = true;
        startX = e.clientX;
        dial.setPointerCapture(e.pointerId);
        audio.playGearTick();
        e.preventDefault();
    };

    dial.onpointermove = function(e) {
        if (!dragging) return;

        const movement = e.clientX - startX;
        rotation += movement * 1.5;
        dial.style.transform = "rotate(" + rotation + "deg)";

        if (degDisplay) {
            degDisplay.textContent = Math.min(180, Math.abs(Math.round(rotation))) + "° / 180°";
        }

        if (Math.abs(movement) > 6) {
            audio.playGearTick();
        }

        startX = e.clientX;

        if (Math.abs(rotation) >= 180) {
            dragging = false;
            dial.style.transform = "rotate(0deg)";
            if (degDisplay) degDisplay.textContent = "0° / 180°";
            travelNext();
        }
    };

    dial.onpointerup = function() {
        dragging = false;
    };

    dial.onpointercancel = function() {
        dragging = false;
    };
}

function tapMorseKey() {
    audio.init();
    morsePressStartTime = Date.now();
    audio.playMorseBeep(120);
    const key = document.getElementById("morseKey");
    if (key) key.style.transform = "translateY(3px)";
}

function releaseMorseKey() {
    const duration = Date.now() - morsePressStartTime;
    const char = duration > 160 ? "—" : "•";
    const key = document.getElementById("morseKey");
    if (key) key.style.transform = "none";

    const tape = document.getElementById("morseTape");
    if (tape) {
        if (tape.textContent.includes("TAP TO TRANSMIT")) {
            tape.textContent = char;
        } else {
            tape.textContent += " " + char;
        }
    }
    unlockRelic(2); // Unlock Chrono-Gear
}

function ventBoilerSteam() {
    audio.playSteamHiss();
    const puff = document.getElementById("steamPuff");
    if (puff) {
        puff.classList.remove("hidden");
        setTimeout(() => puff.classList.add("hidden"), 1900);
    }
    showToast("Steam Valve Released! Boiler pressure regulated at 100 PSI.");
    triggerSteamLocomotive(); // Steam engine train chugs across!
    unlockRelic(2);
}

function readArticle(colIndex) {
    audio.playGearTick();
    const articles = {
        1: "TELEGRAPH DISPATCH: Mr. Nikola Tesla successfully sent wireless electrical harmonics across 5 miles of Manhattan!",
        2: "EXPOSITION REPORT: Steam computation machines capable of 1,000 punchcard calculations per minute exhibited in London!"
    };
    alert(articles[colIndex]);
    triggerNewsboy();
}

/* ==========================================================================
   4. PRESENT DAY LOGIC
   ========================================================================== */

const timeSearchDatabase = [
    { title: "Cave Network Petroglyphs", desc: "How early humans invented stone messaging", era: 0 },
    { title: "Royal Decree Archives (1342)", desc: "Imperial laws and dragon sightings in Camelot", era: 1 },
    { title: "Nikola Tesla Wireless Power (1894)", desc: "High-frequency resonance across New York", era: 2 },
    { title: "AI Autonomous Agents", desc: "Full-stack time traveling browser protocol v3.8", era: 3 },
    { title: "Year 3099 Spatial Holograms", desc: "No buttons, floating tactile portal energy", era: 4 }
];

function handleModernSearch(query) {
    const dropdown = document.getElementById("searchResults");
    if (!dropdown) return;

    if (!query || query.trim() === "") {
        dropdown.classList.add("hidden");
        return;
    }

    const filtered = timeSearchDatabase.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
        dropdown.innerHTML = `<div class="search-item"><span>No temporal results found for "${query}"</span></div>`;
    } else {
        dropdown.innerHTML = filtered.map(item => `
            <div class="search-item" onclick="jumpToSearchResult(${item.era})">
                <strong>${item.title}</strong>
                <span style="color:#64748b; font-size:11px;">${item.desc}</span>
            </div>
        `).join("");
    }

    dropdown.classList.remove("hidden");
}

function clearModernSearch() {
    const input = document.getElementById("modernSearchInput");
    if (input) input.value = "";
    const dropdown = document.getElementById("searchResults");
    if (dropdown) dropdown.classList.add("hidden");
    audio.playClick();
}

function jumpToSearchResult(eraIndex) {
    clearModernSearch();
    loadEra(eraIndex);
    audio.playWarpSound();
    unlockRelic(3); // Unlock Microchip
}

function toggleModernTheme() {
    audio.playClick();
    isDarkMode = !isDarkMode;
    const presentSection = document.getElementById("presentInterface");
    if (isDarkMode) {
        presentSection.classList.add("dark-mode");
        showToast("Dark Mode Activated");
    } else {
        presentSection.classList.remove("dark-mode");
        showToast("Light Mode Activated");
    }
}

function openModernModal(type) {
    audio.playModernPing();
    const messages = {
        search: "Search & Feed: 4.8 Billion historical timelines indexed in 0.002 seconds.",
        explore: "1-Click Store: Amazon Prime Cloud delivery arriving yesterday via tachyon wormhole.",
        connect: "Live Chat: Zero-latency quantum websocket connected. 893 time-travelers in room."
    };
    alert(messages[type]);
    if (type === 'explore') {
        triggerDeliveryDrone(); // Drone flies in and drops Prime box!
    }
    unlockRelic(3);
}

function dismissCookie(accepted) {
    audio.playModernPing();
    const notice = document.getElementById("cookieNotice");
    if (notice) notice.style.display = "none";
    showToast(accepted ? "428 Cookies Accepted across 5 dimensions!" : "Lie recorded: Cookies accepted anyway!");
    triggerDeliveryDrone();
    unlockRelic(3);
}

/* ==========================================================================
   5. FUTURE YEAR 3099 LOGIC
   ========================================================================== */

let holoTouchCount = 0;

function triggerHolo(name, message) {
    audio.playSciFiPulse(1100);
    holoTouchCount++;
    const feedback = document.getElementById("holoFeedback");
    if (!feedback) return;

    feedback.textContent = `[${name}]: ${message}`;
    feedback.classList.remove("hidden");

    triggerHyperspaceHovercar(); // Cyberpunk sky-speeder flyby!

    if (holoTouchCount >= 3) {
        unlockRelic(4); // Unlock Tachyon Core
    }

    setTimeout(() => {
        feedback.classList.add("hidden");
    }, 4500);
}

function setFutureTheme(theme) {
    audio.playSciFiPulse(800);
    const grid = document.getElementById("futureGrid");
    const dots = document.querySelectorAll(".phase-dot");

    dots.forEach(d => d.classList.remove("active"));
    const activeDot = document.querySelector(`.phase-dot.${theme}`);
    if (activeDot) activeDot.classList.add("active");

    const themes = {
        cyan: { grid: "#123a44" },
        magenta: { grid: "#44122d" },
        lime: { grid: "#124424" },
        gold: { grid: "#443a12" }
    };

    const sel = themes[theme] || themes.cyan;
    if (grid) {
        grid.style.background = `linear-gradient(${sel.grid} 1px, transparent 1px), linear-gradient(90deg, ${sel.grid} 1px, transparent 1px)`;
        grid.style.backgroundSize = "45px 45px";
    }
}

function speakNeuralOracle() {
    audio.playFutureChord();
    const prophecies = [
        "In year 3099, the internet has no buttons; thoughts navigate reality directly.",
        "Dyson Sphere 4 has successfully powered 4.2 billion simulated timelines.",
        "Warning from the Future: Never delete browser cache while traveling faster than light."
    ];
    const quote = prophecies[Math.floor(Math.random() * prophecies.length)];
    showToast(`NEURAL ORACLE: "${quote}"`);
    triggerHyperspaceHovercar();
    unlockRelic(4);

    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(quote);
        utterance.pitch = 1.3;
        utterance.rate = 1.05;
        window.speechSynthesis.speak(utterance);
    }
}
