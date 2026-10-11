import {FeatureDefinitionDTO} from '@copor/core/domain/FeatureList/FeatureDefinitionDTO';
import {ContractFeature} from '@copor/core/domain/Contract/ContractFeature';
import {DashboardCategory} from '@copor/core/domain/FeatureList/enum/DashboardCategory';
import {ContractPermission} from '@copor/core/domain/Contract/ContractPermission';

export const contractFeatureDefinitions: FeatureDefinitionDTO[] = [
	{
		key: ContractFeature.ADMINISTRATION_CONTRACT_TYPE,
		viewPermission: ContractPermission.canViewAdministrationContractTypeFeature,
		dashboardItem: {category: DashboardCategory.ADMINISTRATION, icon: 'fileLines', titleKey: 'CONTRACT_TYPES', order: 10}
	}
];
