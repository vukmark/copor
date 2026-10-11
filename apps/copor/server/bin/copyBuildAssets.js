// tsc compiles only .ts; the server also reads files next to its code at
// runtime (each module's `locales/`, found through __dirname). Copy every
// non-TypeScript file under the packages' src/ into dist/ at the same relative
// path, skipping tests. Run after tsc (`npm run build`).
const fs = require('fs');
const path = require('path');

const repo = path.resolve(__dirname, '../../../..');
const dist = path.resolve(__dirname, '../dist');
const skipDirs = new Set(['__tests__', '__test__', 'node_modules']);
let copied = 0;

function copyAssets(dir) {
	for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
		const source = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			if (!skipDirs.has(entry.name)) copyAssets(source);
		} else if (!entry.name.endsWith('.ts') && !entry.name.endsWith('.md')) {
			const target = path.join(dist, path.relative(repo, source));
			fs.mkdirSync(path.dirname(target), {recursive: true});
			fs.copyFileSync(source, target);
			copied++;
		}
	}
}

for (const pkg of fs.readdirSync(path.join(repo, 'packages'))) {
	const src = path.join(repo, 'packages', pkg, 'server', 'src');
	if (fs.existsSync(src)) copyAssets(src);
}
console.log(`copyBuildAssets: ${copied} files copied into dist/`);
