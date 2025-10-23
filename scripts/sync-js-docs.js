import fs from "fs";
import path from "path";

const DOCS_DIR = path.resolve(
  "/Users/home/Sites/docs/js/js-docs/files/en-us/web/javascript"
);
const OUTPUT_FILE = path.resolve(
  "/Users/home/Sites/docs/js/js-docs/scripts/compiled-js-docs.txt"
);

function crawl(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let output = "";

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      output += crawl(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      const content = fs.readFileSync(fullPath, "utf8");
      output += `\n\n---\n# ${entry.name}\n\n${content}\n`;
    }
  }

  return output;
}

console.log("🧠 Compiling JS docs...");
if (!fs.existsSync(DOCS_DIR)) {
  console.error(`❌ Docs folder not found: ${DOCS_DIR}`);
  process.exit(1);
}

const compiled = crawl(DOCS_DIR);
fs.writeFileSync(OUTPUT_FILE, compiled);
console.log(`✅ Compilation complete. Output saved to: ${OUTPUT_FILE}`);
