import fs from 'node:fs';
import path from 'node:path';
import {allModules} from '../../../src/modules';

// Every server package (packages/<name>/server) may import only itself, core
// and the @copor packages its package.json lists; core imports only core.
// Relative imports stay inside the package. A descriptor's `dependsOn` must
// be among its package's dependencies, so installing a module brings what it
// needs. Otherwise leaving a module out of src/modules.ts breaks the build.

const REPO = path.resolve(__dirname, '../../../../../..');
const PACKAGES = path.join(REPO, 'packages');

interface ServerPackage {
	name: string;
	src: string;
	allowed: Set<string>;
}

function readPackages(): ServerPackage[] {
	return fs.readdirSync(PACKAGES)
		.filter((name) => fs.existsSync(path.join(PACKAGES, name, 'server', 'package.json')))
		.map((name) => {
			const manifest = JSON.parse(fs.readFileSync(path.join(PACKAGES, name, 'server', 'package.json'), 'utf-8')) as
				{dependencies?: Record<string, string>};
			const dependencies = Object.keys(manifest.dependencies ?? {})
				.filter((dependency) => dependency.startsWith('@copor/'))
				.map((dependency) => dependency.slice('@copor/'.length));

			return {name, src: path.join(PACKAGES, name, 'server', 'src'), allowed: new Set([name, 'core', ... dependencies])};
		});
}

function listTsFiles(directory: string): string[] {
	return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
		const entryPath = path.join(directory, entry.name);

		if (entry.isDirectory())
			return entry.name === 'node_modules' ? [] : listTsFiles(entryPath);
		return entry.name.endsWith('.ts') ? [entryPath] : [];
	});
}

const IMPORT_REGEX = /(?:\bfrom\s+|\bimport\s*\(\s*|\brequire\s*\(\s*|\bjest\.mock\(\s*|\bdeclare module\s+)['"]([^'"]+)['"]/g;

function findViolations(): string[] {
	const violations: string[] = [];

	for (const serverPackage of readPackages()) {
		for (const file of listTsFiles(serverPackage.src)) {
			const where = path.relative(REPO, file);
			const text = fs.readFileSync(file, 'utf-8').replace(/\/\*[\s\S]*?\*\//g, '');

			for (const match of text.matchAll(IMPORT_REGEX)) {
				const specifier = match[1];

				if (specifier.startsWith('@copor/')) {
					const target = specifier.split('/')[1];

					if (!serverPackage.allowed.has(target))
						violations.push(`${serverPackage.name} → ${target} (not a dependency): ${where} imports ${specifier}`);
				} else if (specifier.startsWith('.')) {
					const resolved = path.resolve(path.dirname(file), specifier);

					if (!resolved.startsWith(serverPackage.src + path.sep))
						violations.push(`${serverPackage.name}: relative import leaves the package: ${where} imports ${specifier}`);
				}
			}
		}
	}
	return violations;
}

describe('package boundaries', () => {
	it('every package imports only itself, core and its declared @copor dependencies', () => {
		expect(findViolations()).toEqual([]);
	});

	it('core depends on no other package', () => {
		expect(readPackages().find((serverPackage) => serverPackage.name === 'core')?.allowed).toEqual(new Set(['core']));
	});

	it('every descriptor\'s dependsOn is among its package\'s dependencies', () => {
		const packages = new Map(readPackages().map((serverPackage) => [serverPackage.name, serverPackage]));
		const missing = allModules.flatMap((module) => (module.dependsOn ?? [])
			.filter((dependency) => !packages.get(module.name)?.allowed.has(dependency))
			.map((dependency) => `${module.name} → ${dependency}`));

		expect(missing).toEqual([]);
	});
});
