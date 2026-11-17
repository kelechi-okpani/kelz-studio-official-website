import type { shots } from "@/config/site";
export interface Feature { id: string; title: string; summary: string; points: string[]; shot?: keyof typeof shots; }
// Every claim is taken from supplied KelzStudio screenshots.
export const libraries: Feature[] = [
  { id: "songs", title: "Songs", summary: "A searchable song library that turns songs into chorus and verse slides.",
    points: ["Browse by Title, Author and Copyright, and search all fields", "Songs appear as labelled Chorus and Verse slides in Preview and Live", "Online song source and your own collections", "Song formatting and optional verse/chorus labels in Options"], shot: "songs" },
  { id: "scriptures", title: "Scriptures", summary: "Find a passage by typing its reference and send it live.",
    points: ["Reference search that updates as you type", "Book and chapter picker", "Install and import Bible translations, with your own collections"], shot: "scriptures" },
  { id: "media", title: "Media", summary: "One library for the video, images, feeds and audio you present.",
    points: ["Videos, Images, Feeds, Audio and All Media views", "Grid or list view with Title, File name and Type", "Import files, preview, then Add to Schedule or Go Live"], shot: "media" },
  { id: "presentations", title: "Presentations", summary: "Bring Word and PowerPoint presentations into your schedule.",
    points: ["Create a New Presentation, or use Import Presentation and Import PowerPoint", "The library shows each file’s type and slide count", "Preview, Go Live or add to Schedule from each presentation", "Left, Center or Right text alignment"], shot: "presentations" },
  { id: "themes", title: "Themes", summary: "Design how your slides look in the Theme Editor.",
    points: ["Add Text, Scripture, Shape and Media elements to a slide", "Inspector: background style, image or video background, canvas size and layout", "Font family, size, colour and alignment for each element", "Apply changes to items already in the schedule"], shot: "themes" },
];
export const controls = [
  { title: "Schedule", text: "Build an ordered list of items, add notes, select and remove, and save or reopen it." },
  { title: "Preview and Live", text: "Check content in Preview, then send it to Live. Step through slides with the arrows under each output." },
  { title: "Go Live, Logo, Black, Clear", text: "Dedicated toolbar controls for the live output." },
  { title: "Alerts and Transitions", text: "Separate settings tabs for alerts and transitions on the Main Output." },
];
export const outputs = [
  { id: "main", title: "Main Output", text: "Your primary audience display. Options cover screen, safe area and preview, plus General, Song, Scripture, Presentation, Transitions and Alerts settings." },
  { id: "alternate", title: "Alternate Output", text: "Enable a second output, choose its monitor, and set alpha channel, output position and screen margins." },
  { id: "foldback", title: "Foldback / Stage Display", text: "Stage display options for the people presenting." },
];
