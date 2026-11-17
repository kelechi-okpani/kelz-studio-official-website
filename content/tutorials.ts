export interface Tutorial { slug: string; title: string; category: string; intro: string; level: "Beginner" | "Intermediate"; minutes: number; steps: { text: string; shot?: string }[]; notes?: string[]; verified: boolean; }
// Steps are limited to what is visible in supplied screenshots. Add tutorials here; pages are generated.
export const tutorials: Tutorial[] = [
  { slug: "interface-tour", title: "Understanding the interface", category: "Getting Started", level: "Beginner", minutes: 3, verified: true,
    intro: "KelzStudio is organised into a Schedule, Preview and Live area, with your libraries along the bottom.",
    steps: [
      { text: "The toolbar holds New, Open, Save, Store, Web and Remote on the left, and Go Live, Alert, Logo, Black, Clear and Live on the right.", shot: "/shots/songs.png" },
      { text: "The Schedule on the left lists the items for your service or event." },
      { text: "Preview shows what you have selected. Live shows what the audience sees." },
      { text: "Songs, Scriptures, Media, Presentations and Themes tabs open your libraries." } ] },
  { slug: "song-to-live", title: "Finding a song and sending it live", category: "Managing Content", level: "Beginner", minutes: 3, verified: true,
    intro: "The Songs library lists your songs and presents each one as separate slides.",
    steps: [
      { text: "Open the Songs tab. The library lists songs by Title, Author and Copyright.", shot: "/shots/songs.png" },
      { text: "Type in the search box to find a song. The field selector is set to All fields by default." },
      { text: "Add the song to your schedule. It appears as slides labelled Chorus and Verse in Preview and Live." },
      { text: "Use the arrows under Live Output to move between slides." } ],
    notes: ["Show or hide section labels in Options > Main Output > Song."] },
  { slug: "scripture-to-live", title: "Sending a scripture live", category: "Presenting", level: "Beginner", minutes: 2, verified: true,
    intro: "Use the Scriptures library to find a passage by reference.",
    steps: [
      { text: "Open the Scriptures tab and type a reference such as Proverbs 1.", shot: "/shots/scriptures.png" },
      { text: "Press Space after the book and chapter to advance. Results update as you type." },
      { text: "Press Enter, or choose Go Live, to send the selected reference live." } ],
    notes: ["Install more translations with Import Bible(s) or Install selected."] },
  { slug: "import-media", title: "Importing and using media", category: "Managing Content", level: "Beginner", minutes: 3, verified: true,
    intro: "The Media library keeps your videos, images, feeds and audio together.",
    steps: [
      { text: "Open the Media tab and choose Videos, Images, Feeds, Audio or All Media.", shot: "/shots/media.png" },
      { text: "Choose Import files and select your media." },
      { text: "Switch between grid and list view. The list shows Title, File name and Type." },
      { text: "Select an item to preview it, then choose Add to Schedule or Go Live. You can also double-click any row to send it live." } ] },
  { slug: "import-presentation", title: "Importing a presentation", category: "Managing Content", level: "Beginner", minutes: 3, verified: true,
    intro: "The Presentations library holds Word and PowerPoint presentations alongside your other content.",
    steps: [
      { text: "Open the Presentations tab. Each presentation shows its type and slide count.", shot: "/shots/presentations.png" },
      { text: "Use New Presentation, Import Presentation or Import PowerPoint at the bottom of the library." },
      { text: "Select a presentation, then choose Preview, Go Live or Schedule." },
      { text: "Choose Left, Center or Right text alignment at the top of the library." } ],
    notes: ["Search by title or file name."] },
  { slug: "edit-theme", title: "Editing a theme", category: "Managing Content", level: "Intermediate", minutes: 4, verified: true,
    intro: "The Theme Editor lets you design how slides look.",
    steps: [
      { text: "The editor shows your slide on a canvas, with the Slides panel on the left and the Inspector on the right.", shot: "/shots/themes.png" },
      { text: "The toolbar offers Text, Edit Text, Duplicate, Delete, Scripture, Shape and Media elements, plus Undo, Redo and Arrange." },
      { text: "In the Inspector, set the theme name, background style, an image or video background, canvas size and layout." },
      { text: "Select an element to set its font family, size, colour and alignment." },
      { text: "Choose whether to apply changes to items in the schedule, then select Apply or OK." } ] },
  { slug: "output-options", title: "Configuring outputs", category: "Presenting", level: "Intermediate", minutes: 4, verified: true,
    intro: "Open Options to manage outputs, presentation style and service behaviour.",
    steps: [
      { text: "In Options, choose Main Output, then a tab: General, Song, Scripture, Presentation, Transitions or Alerts.", shot: "/shots/options.png" },
      { text: "Under Song, use the formatting buttons for font, outline, shadow, margins and format, and turn verse/chorus labels on or off." },
      { text: "Choose Alternate Output, tick Enable support for display Alternate Output, then select an output monitor.", shot: "/shots/alternate.png" },
      { text: "Set Alpha Channel, output position (Left, Top, Width, Height) and screen margins. Margins are percentages of the screen edge." },
      { text: "Choose Foldback for stage display options, then select Apply and OK." } ] },
];
export const installNote = "Installation guides for Windows and macOS will be added once installer details are confirmed.";
