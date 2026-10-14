// ============================================================
// Single source of truth for the site's content.
// Khmer strings are marked "km". Please have a native speaker check them.
// ============================================================

export const artist = {
  name:      "Meng Heng",
  km:        "ម៉េង ហេង",
  role:      "Backend developer",
  album:     "Building the Quiet Parts of the Web",
  catalog:   "MH-2026 · LP 001",
  location:  "Phnom Penh",
  school:    "Cambodia Academy of Digital Technology (CADT)",
  workplace: "BongKert Solutions",
  email:     "mheng770@gmail.com",
  github:    "https://github.com/hengputh52",
  linkedin:  "", // add your LinkedIn URL and it shows up on the Fan Mail card
  telephone: "+855 90979874",
};

export const linerNotes = [
  "Meng Heng grew up in the provinces and came to Phnom Penh to study at the Cambodia Academy of Digital Technology. Somewhere between lectures and late nights, the backend became his instrument.",
  "He works at BongKert Solutions, where most of what he builds is never seen: the API behind the button, the schema under the screen, the job that runs at 3 a.m. and finishes before anyone wakes.",
  "He treats that work the way the old Phnom Penh studio engineers treated a session. Set the levels carefully, keep the signal clean, and press record only when it is ready to last.",
];

export const credits = [
  { role: "Engineered by", value: "Meng Heng" },
  { role: "Recorded at", value: "CADT, Phnom Penh" },
  { role: "Released on", value: "BongKert Solutions" },
  { role: "Previously", value: "EdTech Cambodia, UX/UI & web" },
  { role: "Sung in", value: "Khmer & English" },
];

// ============================================================
// TRACKLIST — side A = backend singles, side B = the rest.
// "runtime" is a playful label; change it to whatever you like.
// ============================================================
export interface Track {
  id:          string;
  side:        "A" | "B";
  title:       string;
  year:        string;
  runtime:     string;
  instruments: string[];
  description: string;
  imageSrc:    string;
  source:      string;
  demo?:       string;
}

export const tracks: Track[] = [
  {
    id:          "das-tern",
    side:        "A",
    title:       "Das Tern",
    year:        "2026",
    runtime:     "4:12",
    instruments: ["NestJS", "PostgreSQL", "Docker", "Flutter"],
    description: "Turns a photo of a paper prescription into a medicine schedule. A NestJS API runs the image through local OCR, an AI step turns the text into structured doses, and PostgreSQL keeps the schedule.",
    imageSrc:    "/img/das-tern.jpg",
    source:      "https://github.com/Choeng-Rayu/das-tern.git",
  },
  {
    id:          "psa-book",
    side:        "A",
    title:       "PSA Book",
    year:        "2025",
    runtime:     "3:48",
    instruments: ["Node.js", "MySQL", "React"],
    description: "A marketplace for second-hand books. A Node.js API over MySQL handles accounts and listings, so books keep moving between readers in the local community.",
    imageSrc:    "/img/psa_book.jpg",
    source:      "https://github.com/hengputh52/PSABook.git",
  },
  {
    id:          "angkor-guide",
    side:        "B",
    title:       "Angkor Guide",
    year:        "2026",
    runtime:     "3:05",
    instruments: ["Flutter"],
    description: "An offline tour guide for visitors to the Angkor temples. Everything ships on the device, so it works where the signal doesn't.",
    imageSrc:    "/img/angkor_guide_1.jpg",
    source:      "https://github.com/hengputh52/Angkor_Guide.git",
  },
  {
    id:          "th-movie",
    side:        "B",
    title:       "TH Movie",
    year:        "2025",
    runtime:     "2:31",
    instruments: ["HTML", "CSS"],
    description: "A landing site for a movie streaming product. Plain HTML and CSS, live on Netlify.",
    imageSrc:    "/img/th-movie.jpg",
    source:      "https://github.com/hengputh52/steaming-website.git",
    demo:        "https://thmovie.netlify.app/",
  },
  {
    id:          "delivery-guy",
    side:        "B",
    title:       "Delivery Guy",
    year:        "2025",
    runtime:     "2:57",
    instruments: ["Unity"],
    description: "A time-challenge game: deliver food across a busy city before the clock runs out, without getting caught in traffic.",
    imageSrc:    "/img/delivery_guy.jpg",
    source:      "https://github.com/hengputh52/Delivery-Guy.git",
  },
];

// ============================================================
// STUDIO GEAR — each tool is a piece of equipment.
// "art" picks the illustration in components/gear/GearArt.tsx.
// ============================================================
export type GearArt =
  | "reel" | "amp" | "console" | "mic" | "case" | "cassette" | "radio" | "guitar" | "crate";

export interface Gear {
  tool:    string;
  model:   string;
  caption: string;
  art:     GearArt;
}

export const gear: Gear[] = [
  { tool: "PostgreSQL",         model: "Master tape deck",  caption: "Where every take is kept for good. My first choice for data.", art: "reel" },
  { tool: "Node.js",            model: "Tube amplifier",    caption: "Warm, always on, and it drives everything downstream.",         art: "amp" },
  { tool: "NestJS",             model: "Mixing console",    caption: "Every channel in its place: modules, routes, guards.",         art: "console" },
  { tool: "TypeScript",         model: "Ribbon microphone", caption: "Picks up mistakes before they reach the tape.",                art: "mic" },
  { tool: "Docker",             model: "Road case",         caption: "Packs the whole rig so it plays the same in every room.",      art: "case" },
  { tool: "Git & GitHub",       model: "Cassette dubs",     caption: "Every take saved, and nothing lost to a bad edit.",            art: "cassette" },
  { tool: "Flutter",            model: "Transistor radio",  caption: "Takes the signal out of the studio and into people's hands.",  art: "radio" },
  { tool: "React & Next.js",    model: "Electric guitar",   caption: "The front of the stage, the part the audience sees.",          art: "guitar" },
  { tool: "MySQL & MongoDB",    model: "Record crate",      caption: "More places to keep the catalogue, for the right job.",        art: "crate" },
];

// ============================================================
// ARCHIVE — session photos (volunteer media work)
// ============================================================
export const sessions = [
  { id: "s1", date: "Dec 2025",     where: "Digital Government Forum", what: "Public relations, event video",           imageSrc: "/img/dgf_image.jpg" },
  { id: "s2", date: "Nov 2025",     where: "VBNK",                     what: "Youth digital storytelling workshop",     imageSrc: "/img/digital_story_image.jpg" },
  { id: "s3", date: "Nov 2025",     where: "SongxExpert",              what: "Video competition entry",                 imageSrc: "/img/sony_video_2.jpg" },
  { id: "s4", date: "Jan–Mar 2025", where: "Dream Girl Contest",       what: "Media team: shooting, editing, cameras", imageSrc: "/img/dgf_gor.jpg" },
];

// Khmer section labels (km)
export const km = {
  sideA:    "ចំហៀង ក",
  sideB:    "ចំហៀង ខ",
  about:    "អំពីខ្ញុំ",
  tracks:   "បញ្ជីបទចម្រៀង",
  gear:     "ឧបករណ៍ស្ទូឌីយោ",
  archive:  "បណ្ណសារ",
  fanMail:  "សំបុត្រពីអ្នកគាំទ្រ",
  city:     "ភ្នំពេញ",
};
