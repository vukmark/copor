import fs from 'node:fs';
import path from 'node:path';
import {i18n} from 'i18next';
import {CoporModule} from '@copor/core/client/Core/Module/CoporModule';

interface ResourceTree {
	[key: string]: string | ResourceTree
}

export interface ModuleLocaleBundle {
	module: string,
	language: string,
	namespace: string,
	resources: ResourceTree,
}

// Every `<localesFolder>/<namespace>/<language>.json` of the given modules.
export function readModuleLocales(modules: CoporModule[]): ModuleLocaleBundle[] {
	const bundles: ModuleLocaleBundle[] = [];

	for (const module of modules) {
		if (!module.localesFolder)
			continue;

		for (const namespace of fs.readdirSync(module.localesFolder)) {
			const namespaceFolder = path.join(module.localesFolder, namespace);

			if (!fs.statSync(namespaceFolder).isDirectory())
				continue;

			for (const file of fs.readdirSync(namespaceFolder).filter((name) => name.endsWith('.json'))) {
				bundles.push({
					module: module.name,
					language: file.slice(0, -'.json'.length),
					namespace,
					resources: JSON.parse(fs.readFileSync(path.join(namespaceFolder, file), 'utf-8')) as ResourceTree
				});
			}
		}
	}
	return bundles;
}

// Merges the bundles into i18next's store, so `GET /locale/:ns` and the
// server's own `t()` see one namespace whatever module a key comes from. Call
// after core's namespaces are loaded (`i18nReady`): the file backend replaces
// a namespace's top-level keys when it loads, which would drop merged keys.
export function mergeModuleLocales(i18next: i18n, bundles: ModuleLocaleBundle[]): void {
	for (const bundle of bundles) {
		const duplicate = findExistingKey(i18next, bundle, bundle.resources, []);

		if (duplicate) {
			throw new Error(`Module "${bundle.module}" defines translation `
				+ `${bundle.namespace}:${duplicate} (${bundle.language}), which already exists`);
		}

		i18next.addResourceBundle(bundle.language, bundle.namespace, bundle.resources, true, false);
	}
}

function findExistingKey(i18next: i18n, bundle: ModuleLocaleBundle, tree: ResourceTree, keyPath: string[]): string | undefined {
	for (const [key, value] of Object.entries(tree)) {
		const currentPath = [... keyPath, key];

		if (typeof value === 'object') {
			const found = findExistingKey(i18next, bundle, value, currentPath);

			if (found)
				return found;
		} else if (i18next.getResource(bundle.language, bundle.namespace, currentPath.join('.')) !== undefined) {
			return currentPath.join('.');
		}
	}
	return undefined;
}
