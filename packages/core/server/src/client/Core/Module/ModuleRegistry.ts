import {CoporModule} from '@copor/core/client/Core/Module/CoporModule';

// The modules the app runs with (core's, then the app's), set once at startup
// by registerModules. Core reads them from here — it never imports the app's
// module list.
let modules: readonly CoporModule[] = [];

export function setRegisteredModules(list: readonly CoporModule[]): void {
	modules = list;
}

export function getRegisteredModules(): readonly CoporModule[] {
	return modules;
}
