import path from 'path';
import {CoporModule} from '@copor/core/client/Core/Module/CoporModule';
import {contractPermissionDefinitions} from '@copor/core/domain/Contract/ContractPermissionDefinitions';
import {contractFeatureDefinitions} from '@copor/core/domain/Contract/ContractFeatureDefinitions';
import {ContractRouter} from '@copor/core/client/Contract/router/ContractRouter';
import {ContractTypeRouter} from '@copor/core/client/Components/ContractType/router/ContractTypeRouter';
import {
	ContractTypeFilterListHelper
} from '@copor/core/client/Components/ContractType/repositoryHelper/ContractTypeFilterListHelper';

export const contractModule: CoporModule = {
	name: 'contract',
	localesFolder: path.join(__dirname, 'locales'),
	migrationsFolder: path.join(__dirname, 'migrations'),
	permissions: contractPermissionDefinitions,
	features: contractFeatureDefinitions,
	filterLists: {
		CONTRACT_TYPE: async () => ContractTypeFilterListHelper.getContractTypeFilterList()
	},
	routes: [
		{path: '/contract', router: ContractRouter},
		{path: '/contract-type', router: ContractTypeRouter}
	]
};
