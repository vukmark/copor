// Makes dist/ a self-contained, installable bundle: writes dist/package.json
// with the runtime dependencies of this app and of every @copor/* package it
// includes, each pinned to the version installed in the workspace (resolved
// from the package that declares it, so nested versions are kept). The
// compiled code under dist/ then resolves everything from dist/node_modules
// (`npm ci --omit=dev` there), independent of how npm hoisted the workspace.
// Run after tsc (`npm run build`); writes the lock with `npm install
// --package-lock-only`.
const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const app = path.resolve(__dirname, '..');
const repo = path.resolve(app, '../../..');
const dist = path.join(app, 'dist');
const appPackage = require(path.join(app, 'package.json'));

function packageDirOf(name) {
	return path.join(repo, 'packages', name.replace('@copor/', ''), 'server');
}

// The version Node would load for `dep` from `fromDir` (walks up the
// node_modules folders; not require.resolve, which honours "exports").
function installedVersion(dep, fromDir) {
	for (let dir = fromDir; ; dir = path.dirname(dir)) {
		const manifest = path.join(dir, 'node_modules', dep, 'package.json');
		if (fs.existsSync(manifest)) return JSON.parse(fs.readFileSync(manifest, 'utf8')).version;
		if (dir === path.dirname(dir)) throw new Error(`${dep} is not installed (needed by ${path.relative(repo, fromDir)})`);
	}
}

const sources = [app, ...Object.keys(appPackage.dependencies).filter((dep) => dep.startsWith('@copor/')).map(packageDirOf)];
const dependencies = {};
const declaredBy = {};
for (const dir of sources) {
	const manifest = require(path.join(dir, 'package.json'));
	for (const dep of Object.keys(manifest.dependencies || {})) {
		if (dep.startsWith('@copor/') || dep.startsWith('@types/')) continue;
		const version = installedVersion(dep, dir);
		if (dependencies[dep] && dependencies[dep] !== version) {
			throw new Error(`${dep}: ${declaredBy[dep]} uses ${dependencies[dep]}, ${path.relative(repo, dir)} uses ${version}`);
		}
		dependencies[dep] = version;
		declaredBy[dep] = path.relative(repo, dir);
	}
}

const sorted = Object.fromEntries(Object.entries(dependencies).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(path.join(dist, 'package.json'), JSON.stringify({
	name: `${appPackage.name}-dist`,
	version: appPackage.version,
	private: true,
	description: 'Built server bundle: npm ci --omit=dev here, run from the app folder (see tools/helpers/deploy_server.sh)',
	dependencies: sorted,
}, null, '\t') + '\n');
execSync('npm install --package-lock-only --ignore-scripts --no-audit --no-fund --no-workspaces', {cwd: dist, stdio: 'inherit'});
console.log(`writeDistPackage: ${Object.keys(sorted).length} dependencies pinned in dist/package.json`);
