const fs = require('fs');
const path = require('path');

const docsDir = path.join(process.cwd(), 'docs');
fs.mkdirSync(docsDir, { recursive: true });

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const files = [
  'assembly/index.ts',
  'assembly/utils/index.ts',
  'assembly/panoptic/index.ts',
  'assembly/panoptic/methods.ts',
  'assembly/panoptic/types.ts',
  'assembly/panoptic/host.ts',
].filter((file) => fs.existsSync(file));

const methodFile = 'assembly/panoptic/methods.ts';
const methods = fs.existsSync(methodFile)
  ? Array.from(fs.readFileSync(methodFile, 'utf8').matchAll(/export const ([A-Z0-9_]+) = \"([^\"]+)\";/g)).map((match) => ({
      name: match[1],
      method: match[2],
    }))
  : [];

const escapeHtml = (value) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/\"/g, '&quot;');

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(packageJson.name)} ${escapeHtml(packageJson.version)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 2rem; line-height: 1.5; color: #1f2937; }
    main { max-width: 960px; }
    code { background: #f3f4f6; padding: 0.125rem 0.25rem; border-radius: 4px; }
    table { border-collapse: collapse; width: 100%; margin-top: 1rem; }
    th, td { border: 1px solid #d1d5db; padding: 0.5rem; text-align: left; }
    th { background: #f9fafb; }
  </style>
</head>
<body>
  <main>
    <h1>${escapeHtml(packageJson.name)} ${escapeHtml(packageJson.version)}</h1>
    <p>AssemblyScript source package for Steer strategy utilities.</p>
    <h2>Import</h2>
    <pre><code>import { PanopticMethods, erc20ApproveFragment } from "@steerprotocol/strategy-utils/assembly";</code></pre>
    <h2>Entrypoints</h2>
    <ul>
      ${files.map((file) => `<li><code>${escapeHtml(file)}</code></li>`).join('\n      ')}
    </ul>
    <h2>Panoptic RuntimeAdapter Methods</h2>
    <table>
      <thead><tr><th>Constant</th><th>Method</th></tr></thead>
      <tbody>
        ${methods.map(({ name, method }) => `<tr><td><code>${escapeHtml(name)}</code></td><td><code>${escapeHtml(method)}</code></td></tr>`).join('\n        ')}
      </tbody>
    </table>
  </main>
</body>
</html>
`;

fs.writeFileSync(path.join(docsDir, 'index.html'), html);
