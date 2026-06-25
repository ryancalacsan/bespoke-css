// Sanity-checks the library build output so a broken/incomplete package can
// never be published silently. Run at the end of `build:lib`.
import { readFileSync, existsSync } from 'node:fs';

const errors = [];

function mustExist(path) {
  if (!existsSync(path)) errors.push(`missing: ${path}`);
}

function mustContain(path, needle, label) {
  if (!existsSync(path)) {
    errors.push(`missing: ${path}`);
    return;
  }
  const text = readFileSync(path, 'utf8');
  if (!text.includes(needle)) errors.push(`${path} is missing ${label}`);
}

// Entry, types, and both stylesheet entries from package.json "exports".
mustExist('lib/index.js');
mustExist('lib/index.d.ts');
mustExist('lib/caliper.css');
mustExist('lib/tokens.css');

// The bundled stylesheet must actually carry the fonts (inlined) and the
// tokens + component styles, not just fall back to system fonts.
mustContain('lib/caliper.css', '@font-face', 'the @font-face rules');
mustContain('lib/caliper.css', 'data:font', 'inlined font data');
mustContain('lib/caliper.css', '--color-text', 'the design tokens');
mustContain('lib/caliper.css', '.button', 'the component styles');
mustContain('lib/tokens.css', '--color-text', 'the design tokens');

// The JS entry must not inject CSS at runtime (RSC-safe; CSS is a separate
// import). It should re-export the components.
mustContain('lib/index.js', 'export', 'component re-exports');

if (errors.length) {
  console.error('Library build check FAILED:');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('Library build check passed.');
