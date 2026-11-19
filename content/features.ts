import type { shots } from "@/config/site";
export interface Feature { id: string; title: string; summary: string; points: string[]; shot?: keyof typeof shots; }
export interface Item { title: string; text: string; points?: string[] }
// Source: KelzStudio Complete Project Documentation (source review, 18 Nov 2026) and supplied screenshots.

export const libraries: Feature[] = [
  { id: "songs", title: "Songs", summary: "Store lyrics once, then present them as labelled verse and chorus slides.",
    points: ["Create and edit songs with title, lyrics, copyright and section structure", "Search by title or lyric content, then add to the Schedule", "Repeated verses and choruses are navigated as separate slides", "Song collections, song-specific fonts and labels, and a theme per song"], shot: "songs" },
  { id: "scriptures", title: "Scriptures", summary: "Look up a passage by reference or search the text, then send it live.",
    points: ["Reference lookup by book, chapter and verse, plus scripture text search", "Download translations from the built-in catalog (internet required) or import USFM, XML, JSON and SQLite Bible files", "Scripture-specific themes, typography, verse and reference styles"], shot: "scriptures" },
  { id: "media", title: "Media", summary: "One library for the images, videos, camera feeds and audio you present.",
    points: ["Images, Videos, Feeds, Audio and All Media views with grid or list layout", "Search, sort and thumbnail sizes; import files by copying into your library or referencing them in place", "Preview, add to the Schedule, send live, or use as a theme background"], shot: "media" },
  { id: "presentations", title: "Presentations", summary: "Build native presentations, bring in Office files, or show original PDF and Office pages.",
    points: ["Native presentation editor: create, edit and order slides; import and export KelzStudio presentation files", "Office compatibility import turns readable PowerPoint and Word text into editable slides", "Original Document Display shows PDF, .pptx, .ppt and .xlsx pages as they are rendered", "Search by title or slide text"], shot: "presentations" },
  { id: "themes", title: "Themes", summary: "Design how songs, scriptures and presentations look.",
    points: ["Theme Editor with text, shape and media layers, backgrounds, fonts, alignment and layout", "Song, Scripture and Presentation categories, each with a default theme", "Apply a theme to a Schedule item from its menu, or drag a matching theme onto it", "Create, duplicate, rename, delete, import and export themes"], shot: "themes" },
];

export const documents: Item[] = [
  { title: "Native presentations", text: "Editable KelzStudio slide collections with their own editor. Export and import uses KelzStudio’s presentation format, not PowerPoint." },
  { title: "Office compatibility import", text: "Extracts readable text from Office files and rebuilds it as editable KelzStudio slides. Layout, charts, transitions and animation are not carried over." },
  { title: "Original Document Display", text: "Keeps the source file and shows each page or slide as its own Schedule item.", points: ["PDF pages render directly", ".pptx, .ppt and .xlsx are converted to pages with LibreOffice, downloaded on first use and checked before it is used", ".xls is not supported here, and Office animations and transitions are not played"] },
];

export const workflow: Item[] = [
  { title: "Schedule", text: "An ordered show plan holding songs, scriptures, presentations, document pages and media. Add notes, reorder, expand items, pick a theme per item, and remove what you no longer need." },
  { title: "Preview before live", text: "Select an item and step through its slides without changing the audience screen. Preview and live navigation are separate, so you can prepare the next item while one is on air." },
  { title: "Save and reopen", text: "Save the Schedule as a versioned file and reopen it later. You are prompted before unsaved work is replaced." },
];

export const outputs = [
  { id: "main", title: "Main Output", text: "Your primary audience display. Slides, media, transitions and overlays render here. Options cover screen, safe area and margins, and typography for songs, scriptures, presentations, copyright and alerts." },
  { id: "alternate", title: "Alternate Output", text: "A second audience screen that follows live content with its own profile: separate typography, styling, transitions and alert options. Choose its monitor, alpha channel, position and margins." },
  { id: "foldback", title: "Foldback / Stage Display", text: "A stage-facing display showing the current slide, item title and slide count, with an optional next item, clock, and service-interval countdown, start time or overrun indicator." },
];

export const liveControls: Item[] = [
  { title: "Explicit Go Live", text: "Nothing reaches the audience until you publish it. Importing, selecting and previewing never change the live output." },
  { title: "Logo, Black and Clear", text: "Dedicated controls and shortcuts switch the output to your logo, a black screen or a cleared screen without touching the Schedule." },
  { title: "Transitions", text: "Blend, Cut, Fade, directional Wipe and Push, Zoom in and out, and Dissolve between slides." },
  { title: "Alerts and nursery alerts", text: "Show message alerts and a nursery queue over live content, with separate Live and Foldback controls. Message templates support child name, time, date, room and custom values." },
  { title: "Camera feeds", text: "Show a local camera or capture device from the Feeds library, subject to your computer’s camera permission." },
  { title: "Keyboard control", text: "Shortcuts for Go Live, stepping through slides, black, clear, logo, saving and searching songs." },
];

export const platform: Item[] = [
  { title: "Windows and macOS", text: "A Windows installer (64-bit) and macOS disk images for Intel and Apple Silicon." },
  { title: "Local-first", text: "Your libraries and imported files live on your computer. The Bible catalog download and first-time LibreOffice download are the main online steps." },
  { title: "Storage profiles", text: "Keep separate libraries and resource folders, with database status checks, validation and backups in Options." },
  { title: "Import and export", text: "Schedules, native presentations and themes are saved as versioned files you can move between computers." },
];
