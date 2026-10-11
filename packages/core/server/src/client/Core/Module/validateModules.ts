import {CoporModule} from '@copor/core/client/Core/Module/CoporModule';

export function validateModules(modules: CoporModule[]): void {
	const names = new Set<string>();

	for (const module of modules) {
		if (names.has(module.name)) {
			throw new Error(`Module "${module.name}" is registered more than once.`);
		}
		names.add(module.name);
	}

	for (const module of modules) {
		const missing = (module.dependsOn ?? []).filter((dependency) => !names.has(dependency));

		if (missing.length > 0) {
			throw new Error(`Module "${module.name}" depends on missing module(s): ${missing.join(', ')}.`);
		}
	}
}
