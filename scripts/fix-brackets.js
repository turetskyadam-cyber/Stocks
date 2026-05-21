// After next build, rename [lesson] chunk dir and update all references.
// dplooy (and some other hosts) reject zips containing [] in file paths.
const fs = require('fs')
const path = require('path')

const outDir = path.join(__dirname, '../out')

// 1. Rename the bracket directory
const from = path.join(outDir, '_next/static/chunks/app/course/[lesson]')
const to   = path.join(outDir, '_next/static/chunks/app/course/lesson')
if (fs.existsSync(from)) {
  fs.renameSync(from, to)
  console.log('✓ Renamed [lesson] → lesson')
}

// 2. Fix all references in every .html and .js file
let fixed = 0
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) { walk(full); continue }
    if (!entry.name.endsWith('.html') && !entry.name.endsWith('.js')) continue
    const src = fs.readFileSync(full, 'utf8')
    const out = src.replace(/%5Blesson%5D/g, 'lesson').replace(/\[lesson\]/g, 'lesson')
    if (out !== src) { fs.writeFileSync(full, out); fixed++ }
  }
}
walk(outDir)
console.log(`✓ Updated ${fixed} file(s)`)
