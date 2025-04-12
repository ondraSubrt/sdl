const fs = require("fs");
const path = require("path");

// Paths
const BASE_DIR = __dirname;
const EVENTS_DIR = path.join(BASE_DIR, "events");
const ROOT_DIR = path.join(BASE_DIR, "root");
const EVENTS_OUT = path.join(BASE_DIR, "_events.md");
const ROOT_OUT = path.join(BASE_DIR, "_root_properties.md");

function extractName(filePath) {
  return path.basename(filePath, ".md");
}

function generateIndexEntry(folder, filePath) {
  const name = extractName(filePath);
  return `- [${name}](./${folder}/${name}.md)`;
}

function generateIndex(dir, outFile, title) {
  if (!fs.existsSync(dir)) {
    console.error(`❌ Folder not found: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir).filter(file => file.endsWith(".md"));
  const lines = [
    `# ${title}`,
    "",
    "This file is auto-generated. Do not edit manually.",
    ""
  ];

  files.sort().forEach(file => {
    const entry = generateIndexEntry(path.basename(dir), file);
    lines.push(entry);
  });

  fs.writeFileSync(outFile, lines.join("\n"));
  console.log(`✅ Updated ${outFile} with ${files.length} entries.`);
}

// Run both
generateIndex(EVENTS_DIR, EVENTS_OUT, "📦 List of SDL Events");
generateIndex(ROOT_DIR, ROOT_OUT, "📌 Root Properties");
