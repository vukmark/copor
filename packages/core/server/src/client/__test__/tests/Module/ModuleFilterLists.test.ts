import {
	clearModuleFilterLists,
	getModuleFilterListProvider,
	registerModuleFilterLists
} from '@copor/core/client/Core/Module/ModuleFilterLists';
import {FilterablePages} from '@copor/core/domain/Core/enum/FilterablePages';
import {FilterType} from '@copor/core/domain/Core/enum/FilterType';
import {SetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/SetFilterDTO';

describe('ModuleFilterLists', () => {
	const filterList: SetFilterDTO[] = [{
		name: {value: 'SEARCH', translation: 'Search'},
		type: FilterType.SEARCH
	}];

	afterEach(() => clearModuleFilterLists());

	it('returns no provider for a page nobody registered', () => {
		expect(getModuleFilterListProvider('UNKNOWN')).toBeUndefined();
	});

	it('returns the provider a module registered for its page', async () => {
		registerModuleFilterLists('example', {EXAMPLE: async () => filterList});

		await expect(getModuleFilterListProvider('EXAMPLE')!('actor-1')).resolves.toEqual(filterList);
	});

	it('passes the actor to the provider', async () => {
		const provider = jest.fn().mockResolvedValue(filterList);

		registerModuleFilterLists('example', {EXAMPLE: provider});
		await getModuleFilterListProvider('EXAMPLE')!('actor-1');

		expect(provider).toHaveBeenCalledWith('actor-1');
	});

	it('rejects a page that core already serves', () => {
		expect(() => registerModuleFilterLists('example', {[FilterablePages.ROLE]: async () => filterList}))
			.toThrow('Filter list "ROLE" of module "example" is already registered.');
	});

	it('rejects a page another module registered, keeping nothing of the failed module', () => {
		registerModuleFilterLists('first', {EXAMPLE: async () => filterList});

		expect(() => registerModuleFilterLists('second', {OTHER: async () => [], EXAMPLE: async () => []}))
			.toThrow('Filter list "EXAMPLE" of module "second" is already registered.');
		expect(getModuleFilterListProvider('OTHER')).toBeUndefined();
	});
});
