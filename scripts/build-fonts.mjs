// Inlines the self-hosted webfonts into the published stylesheet.
//
// Vite's library mode drops the @fontsource @font-face rules (their relative
// url(./files/*.woff2) assets are pruned), so the JS build's lib/bespoke.css
// ships tokens + reset + component styles but no real typefaces. This script
// reads the @fontsource CSS, keeps the latin + latin-ext normal-weight faces
// (what the Spec Sheet uses), inlines each woff2 as a data URI, and prepends the
// result to lib/bespoke.css so the stylesheet is self-contained.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const PACKAGES = [
  'node_modules/@fontsource-variable/hanken-grotesk/index.css',
  'node_modules/@fontsource-variable/geist-mono/index.css',
];

// Only the Latin coverage, upright axis - the look is English text.
const KEEP = /-latin(-ext)?-wght-normal\.woff2$/;
const URL_RE = /url\((?:'|")?(\.\/files\/[^)'"]+\.woff2)(?:'|")?\)/;

function inlinePackage(cssPath) {
  if (!existsSync(cssPath)) {
    console.error(`build-fonts: not found: ${cssPath}`);
    process.exit(1);
  }
  const css = readFileSync(cssPath, 'utf8');
  const baseDir = dirname(cssPath);
  const blocks = css.match(/@font-face\s*{[^}]*}/g) ?? [];
  const kept = [];
  for (const block of blocks) {
    const match = block.match(URL_RE);
    if (!match || !KEEP.test(match[1])) continue;
    const fontPath = join(baseDir, match[1]);
    if (!existsSync(fontPath)) continue;
    const data = readFileSync(fontPath).toString('base64');
    kept.push(
      block.replace(match[0], `url(data:font/woff2;base64,${data})`),
    );
  }
  return kept;
}

const faces = PACKAGES.flatMap(inlinePackage);
if (faces.length === 0) {
  console.error('build-fonts: produced no @font-face rules');
  process.exit(1);
}

const target = 'lib/bespoke.css';
const existing = readFileSync(target, 'utf8');
writeFileSync(target, `${faces.join('\n')}\n${existing}`);
console.log(`build-fonts: inlined ${faces.length} font faces into ${target}`);
