export const ERAS = [
  {
    id: 'stone',
    name: 'Stone Age',
    period: 'c. 10,000 BCE',
    codename: 'Ogg-Net v0.1 (Limestone Edition)',
    url: 'glyph://cave-wall.tribe/mammoth-hunt',
    icon: '🪨',
    tagline: 'DRAG SLABS • STRIKE FLINT • CARVE SYMBOLS',
    description: 'The earliest known web. Browsing is heavy, pages are made of sedimentary rock, and likes are stamped in red ochre.',
    theme: {
      bg: 'cave-wall-bg',
      border: 'border-amber-900/60',
      accent: '#d97706',
      text: '#fde68a',
    },
    quest: {
      title: 'Light the 3 Fire Torches',
      instruction: 'Tap/Click the 3 flint stones scattered on the cave wall to illuminate the ancient prophecy and charge the Chrono-Shard!',
      total: 3,
      successMsg: '🔥 The ancient temporal flame is ignited! Chrono-Shard energized!'
    },
    articles: [
      {
        id: 'mammoth',
        title: '🦣 HUGE MAMMOTH SPOTTED NEAR NORTH VALLEY',
        author: 'Chief Grog (Tribe Elder)',
        date: '3 Moons Ago',
        content: 'Big fur elephant walking slow. Bring many sharp sticks. Do NOT throw rock at face, it get angry. Group hunt starts at sunrise tomorrow.',
        reactions: 42,
        reactionType: '🖐️ Handprints',
        secretRevealed: 'Hidden drawing reveals: "Beware metal birds from sky in 12,000 suns"'
      },
      {
        id: 'fire',
        title: '🔥 FIRE 2.0: REVIEWS AND FEEDBACK',
        author: 'Ogg the Inventor',
        date: '5 Moons Ago',
        content: 'Users report fire is warm and makes meat soft. However, 2 cavemen burned beards. 4/5 stars. "Very bright, but bites when touched."',
        reactions: 128,
        reactionType: '🔥 Sparks',
        secretRevealed: 'Carved note: "Do not let smoke get into glowing temporal crystal"'
      },
      {
        id: 'wheel',
        title: '⭕ NEW ROUND STONE CONTROVERSY',
        author: 'Thag Flat-Rock',
        date: '10 Moons Ago',
        content: 'Why roll thing when carry on shoulder build strong character? Village elders declare circular rocks a dangerous fad for lazy youngsters.',
        reactions: 19,
        reactionType: '🪨 Boulders',
        secretRevealed: 'Hieroglyph of a gear and lightning bolt'
      }
    ]
  },
  {
    id: 'medieval',
    name: 'Medieval Age',
    period: 'Anno Domini 1342',
    codename: 'Ye Olde Royal Webe (Illuminated Manuscript)',
    url: 'scroll://ye-olde-scrolls.realm/royal-decrees',
    icon: '🏰',
    tagline: 'PULL THE SCROLL RIBBON • BREAK ROYAL SEALS • DIP QUILL',
    description: 'The browser of knights and kings. Navigation requires pulling physical vellum ribbons and stamping imperial wax signets.',
    theme: {
      bg: 'parchment-bg',
      border: 'border-amber-800',
      accent: '#92400e',
      text: '#451a03',
    },
    quest: {
      title: 'Stamp 3 Royal Wax Seals',
      instruction: 'Click each molten wax puddle to stamp the King’s Seal of Temporal Authenticity and unlock the realm’s secrets!',
      total: 3,
      successMsg: '👑 Royal Chrono-Pardon Granted! The Timeline shifts under his Majesty’s decree!'
    },
    articles: [
      {
        id: 'dragon',
        title: '🐉 SIGHTING OF WINGED BEAST OVER YORKSHIRE',
        author: 'Sir Lancelot the Astounded',
        date: 'Feast of St. Jude',
        content: 'A roaring lizard breathing emerald fire was seen fleeing a shining metallic portal in the clouds. The alchemists claim it is a paradox from another epoch.',
        seals: 3,
        parchmentNote: 'Sealed by the Order of the Grand Astrolabe'
      },
      {
        id: 'alchemy',
        title: '⚗️ LEAD TO GOLD: MASTER HERMES CLAIMS SUCCESS',
        author: 'Hermes the Alchemist',
        date: 'Full Moon of March',
        content: 'By mixing crushed temporal dust with brimstone and chanting in backwards Latin, our cauldron emitted a blue glow and a metallic square with glowing symbols.',
        seals: 1,
        parchmentNote: 'Warning: Cauldron emitted strange 60Hz hum'
      },
      {
        id: 'joust',
        title: '🛡️ GRAND JOUSTING TOURNAMENT AT CAMELOT',
        author: 'The Royal Herald',
        date: 'Yesterday Morrow',
        content: 'Sir Galahad triumphed after his lance was mysteriously coated in frictionless polymer from the 31st Century. Inquisitors are investigating witchcraft.',
        seals: 5,
        parchmentNote: 'Audience attendance: 4,000 peasants, 2 time travelers in trench coats'
      }
    ]
  },
  {
    id: 'industrial',
    name: 'Industrial Age',
    period: 'October 14, 1894',
    codename: 'The Daily Chronograph & Steam-Driven Gazette',
    url: 'telegraph://daily-chronograph.1894/dispatch',
    icon: '🕰️',
    tagline: 'CRANK STEAM LEVER • CLACK TYPEWRITER • TUNE TELEGRAPH',
    description: 'Brass, steam, and mechanical tickers. Pages are broadsheet columns stamped by iron presses and powered by coal furnaces.',
    theme: {
      bg: 'vintage-newsprint-bg',
      border: 'border-yellow-950/80',
      accent: '#854d0e',
      text: '#1c1917',
    },
    quest: {
      title: 'Build Boiler Steam to 100 PSI',
      instruction: 'Pump the iron crank lever to build steam pressure without venting the safety relief valve!',
      total: 100,
      successMsg: '⚙️ 100 PSI Reached! Steam Turbine engaged, temporal dynamo humming!'
    },
    articles: [
      {
        id: 'steam_car',
        title: '⚡ MR. NIKOLA TESLA DEMONSTRATES WIRELESS POWER & TIME RESONANCE',
        author: 'Staff Correspondent, New York',
        date: 'October 14, 1894',
        content: 'At his laboratory on South Fifth Avenue, Mr. Tesla illuminated vacuum tubes without wires and momentarily caused a pocket watch to tick backwards 47 minutes.',
        column: 'Left Broadsheet',
        telegraphCode: '.-. . ... --- -. .- -. -.-. .'
      },
      {
        id: 'press',
        title: '🚂 PACIFIC STEAM LOCOMOTIVE ATTAINS ASTONISHING 70 MPH',
        author: 'Industrial Gazette',
        date: 'October 12, 1894',
        content: 'Medical doctors caution that travelling at speeds exceeding sixty miles per hour may cause the human spirit to momentarily detach from the physical frame.',
        column: 'Center Broadsheet',
        telegraphCode: '... .--. . . -..'
      },
      {
        id: 'phrenology',
        title: '🎩 PATENT FILED FOR AUTOMATIC TELEGRAPHIC BROADCAST MACHINE',
        author: 'London Patent Office',
        date: 'October 08, 1894',
        content: 'An ingenious contraption comprising 400 brass valves capable of transmitting moving lithographs across copper telephone lines.',
        column: 'Right Broadsheet',
        telegraphCode: '... - . .- --'
      }
    ]
  },
  {
    id: 'present',
    name: 'Present Day',
    period: '2026 Modern Web',
    codename: 'OmniCloud Web 3.0 Platform',
    url: 'https://omnicloud.app/feed/trending',
    icon: '💻',
    tagline: 'CLICK BUTTONS • CLOSE 50 COOKIES • FILTER CARDS',
    description: 'The familiar modern web: slick SaaS cards, infinite scroll, dark mode switches, and 47 annoying cookie consent checkboxes.',
    theme: {
      bg: 'bg-neutral-900',
      border: 'border-neutral-700',
      accent: '#3b82f6',
      text: '#f8fafc',
    },
    quest: {
      title: 'Dismiss the Cookie Monster Popup',
      instruction: 'Navigate the labyrinth of modern GDPR consent toggles to achieve true cookie privacy!',
      total: 1,
      successMsg: '🛡️ Privacy Consented! 428 tracking pixels temporarily paused.'
    },
    articles: [
      {
        id: 'ai_news',
        title: '🤖 Autonomous AI Agents Discover Time Travel Protocol in Open Source Repo',
        author: 'TechChronicle / @chronodev',
        date: '2 hours ago • 4 min read',
        content: 'Engineers noticed a GitHub pull request submitted from the year 3088 containing quantum compression algorithms and a commit message reading "Fixed bug in yesterday".',
        likes: 14200,
        comments: 893,
        tag: 'Artificial Intelligence'
      },
      {
        id: 'crypto_time',
        title: '📈 ChronoCoin Jumps 840% After Ancient Romans Found Holding Ledger',
        author: 'Decentralized Daily',
        date: '5 hours ago • 2 min read',
        content: 'Archaeologists in Pompeii have unearthed a clay tablet containing 12 seed phrases and a staking yield contract expiring in the 31st Century.',
        likes: 8920,
        comments: 412,
        tag: 'Crypto & Markets'
      },
      {
        id: 'remote_work',
        title: '☕ "I Work Remotely from the 14th Century": A Digital Nomad’s Guide',
        author: 'Sarah Jenkins',
        date: '1 day ago • 6 min read',
        content: 'Cost of living is great (0.002 pence per month for a castle suite), though high-latency raven broadband and bubonic plague remain slight downsides.',
        likes: 24500,
        comments: 1530,
        tag: 'Lifestyle & Travel'
      }
    ]
  },
  {
    id: 'future',
    name: 'Quantum Future',
    period: 'Year 3088 (Neo-Solaris)',
    codename: 'NeuroNet HoloSphere v99.4',
    url: 'neuro://chronosphere.nexus.3088/holo-matrix',
    icon: '🚀',
    tagline: 'DRAG QUANTUM ORB • 3D TILT PANELS • TELEPATHIC AI',
    description: 'Physical buttons are obsolete. Interact with floating antigravity holograms, sub-atomic frequency modulators, and neural telepathy feeds.',
    theme: {
      bg: 'cyber-grid-bg',
      border: 'border-cyan-500/50',
      accent: '#06b6d4',
      text: '#cffafe',
    },
    quest: {
      title: 'Harmonize Quantum Wave Frequency',
      instruction: 'Drag the Tachyon Resonator slider to 432.8 THz to lock the holographic containment field!',
      total: 100,
      successMsg: '🌌 Tachyon Convergence Stabilized! Temporal paradox loop decrypted!'
    },
    articles: [
      {
        id: 'dyson',
        title: '🪐 DYSON SPHERE #4 REACHES 100% LUMINOSITY HARVEST',
        author: 'Solaris Collective AI',
        date: 'Cycle 998.44.2',
        content: 'The stellar swarm around Betelgeuse has begun feeding antimatter directly into the local spacetime continuum, powering 4.2 billion simulated universes simultaneously.',
        energyUnits: '9.84 YottaWatts',
        hologramStatus: 'ACTIVE_TELEMETRY'
      },
      {
        id: 'consciousness',
        title: '🧠 CONSCIOUSNESS CLOUD BACKUP 12.0: NOSTALGIA PATCH',
        author: 'NeuroSync Systems',
        date: 'Cycle 998.42.9',
        content: 'Users who downloaded memories of 21st-century "traffic jams" and "Wi-Fi buffering" report high emotional amusement. Free download for synthetic citizens.',
        energyUnits: '128 Terabytes/sec',
        hologramStatus: 'NEURAL_LINK_STABLE'
      },
      {
        id: 'chronoloop',
        title: '⏳ WARNING: TEMPORAL BROWSER DETECTED IN HISTORICAL SECTORS',
        author: 'Temporal Police Dept.',
        date: 'Cycle 998.40.1',
        content: 'An anomalous user is currently operating the experimental Paradox-9000 browser across primitive eras. Please do not leave modern pizza boxes in ancient caves.',
        energyUnits: 'CRITICAL_PARADOX_RISK',
        hologramStatus: 'ANOMALY_TRACKING'
      }
    ]
  }
];

export const PARADOX_EVENTS = [
  {
    title: '🦖 DINOSAUR IN THE VICTORIAN TEA ROOM',
    era: 'Industrial Age Anomaly',
    desc: 'A velociraptor wearing a tweed top hat and monocle was just spotted sipping Earl Grey at the Royal Academy!',
    sound: 'glitch'
  },
  {
    title: '🤖 CYBERPUNK DRONE IN THE STONE AGE',
    era: 'Stone Age Anomaly',
    desc: 'Cavemen have started worshiping a neon RGB quadcopter that fell through a wormhole!',
    sound: 'glitch'
  },
  {
    title: '🛡️ MEDIEVAL KNIGHT IN A ZOOM CALL',
    era: 'Present Day Anomaly',
    desc: 'A knight in full plate armor just interrupted the Q3 Marketing Sprint Standup demanding holy retribution!',
    sound: 'glitch'
  },
  {
    title: '🪨 MAMMOTH GRAZING ON MARS COLONY',
    era: 'Future Age Anomaly',
    desc: 'A woolly mammoth is cheerfully eating synthetic kelp inside the Neo-Tokyo Biodome on Mars!',
    sound: 'glitch'
  }
];
