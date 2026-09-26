// Builds dist/tpcl.css (full system) and dist/tokens.css (tokens only).
// Vite's library mode inlines every url() as base64 — ~200 kB of duplicated
// fonts and logos — so the stylesheet is assembled here instead: @imports are
// flattened, asset urls rewritten to ./assets/, and the real files copied.
import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const out = join(root, 'dist');
const assetsSrc = join(root, 'src/assets');

function flatten(file, seen = new Set()) {
  if (seen.has(file)) return '';
  seen.add(file);
  const css = readFileSync(file, 'utf8');
  return css
    .replace(/@import\s+'([^']+)';\n?/g, (_, p) => flatten(resolve(dirname(file), p), seen))
    .replace(/url\('([^']+)'\)/g, (m, p) => {
      if (/^(data:|https?:)/.test(p)) return m;
      const abs = resolve(dirname(file), p);
      return `url('./assets/${relative(assetsSrc, abs).split('\\').join('/')}')`;
    });
}

mkdirSync(out, { recursive: true });
const banner = '/* @tpcl/design-system v1.0 — Travis Paul Consulting Ltd */\n';
writeFileSync(join(out, 'tpcl.css'), banner + flatten(join(root, 'src/styles/index.css')));
copyFileSync(join(root, 'src/styles/tokens.css'), join(out, 'tokens.css'));
for (const dir of readdirSync(assetsSrc)) {
  mkdirSync(join(out, 'assets', dir), { recursive: true });
  for (const f of readdirSync(join(assetsSrc, dir))) copyFileSync(join(assetsSrc, dir, f), join(out, 'assets', dir, f));
}
console.log('dist/tpcl.css, dist/tokens.css and dist/assets written');
