const fs = require("fs");
const path = require("path");

// ✅ Změna zde: events jsou uvnitř složky docs/events
const EVENTS_DIR = path.join(__dirname, 'events');
const OUTPUT_FILE = path.join(__dirname, 'events.md');

function extractEventName(filePath) {
  return path.basename(filePath, ".md");
}

function generateIndexEntry(filePath) {
  const eventName = extractEventName(filePath);
  return `- [${eventName}](events/${eventName}.md)`;
}

function generateEventIndex() {
  const files = fs.readdirSync(EVENTS_DIR);
  const mdFiles = files.filter(file => file.endsWith(".md"));

  const lines = [
    "# 📦 List of SDL Events",
    "",
    "Below is a list of documented `sdl` events with links to their definitions:",
    ""
  ];

  mdFiles.sort().forEach(file => {
    lines.push(generateIndexEntry(file));
  });

  fs.writeFileSync(OUTPUT_FILE, lines.join("\n"));
  console.log(`✅ Generated ${OUTPUT_FILE} with ${mdFiles.length} events.`);
}

generateEventIndex();
