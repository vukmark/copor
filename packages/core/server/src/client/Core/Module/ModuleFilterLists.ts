import {SetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/SetFilterDTO';
import {FilterablePages} from '@copor/core/domain/Core/enum/FilterablePages';

// Filter lists a module serves at `GET /filter/:page`, keyed by page. Core
// answers its own pages (FilterablePages) and asks this registry for the rest.
export type ModuleFilterListProvider = (actorId: string) => Promise<SetFilterDTO[]>;
export type ModuleFilterLists = Record<string, ModuleFilterListProvider>;

const providers = new Map<string, ModuleFilterListProvider>();
const corePages = new Set<string>(Object.values(FilterablePages));

export function registerModuleFilterLists(moduleName: string, filterLists: ModuleFilterLists): void {
	for (const page of Object.keys(filterLists)) {
		if (corePages.has(page) || providers.has(page)) {
			throw new Error(`Filter list "${page}" of module "${moduleName}" is already registered.`);
		}
	}

	for (const [page, provider] of Object.entries(filterLists)) {
		providers.set(page, provider);
	}
}

export function getModuleFilterListProvider(page: string): ModuleFilterListProvider | undefined {
	return providers.get(page);
}

// Tests only: forget every registered filter list.
export function clearModuleFilterLists(): void {
	providers.clear();
}
