import {contractModule} from '@copor/core/client/Contract/ContractModule';

describe('ContractModule', () => {
	it('serves the CONTRACT_TYPE filter list', () => {
		expect(Object.keys(contractModule.filterLists ?? {})).toEqual(['CONTRACT_TYPE']);
	});
});
