import {PermissionDefinitionDTO} from '@copor/core/domain/Core/Permission/PermissionDefinitionDTO';
import {CoreFeature} from '@copor/core/domain/FeatureList/enum/CoreFeature';
import {ContractFeature} from '@copor/core/domain/Contract/ContractFeature';
import {ContractPermission} from '@copor/core/domain/Contract/ContractPermission';

export const contractPermissionDefinitions: PermissionDefinitionDTO[] = [
	{
		key: ContractPermission.canUpdateContractType,
		feature: ContractFeature.ADMINISTRATION_CONTRACT_TYPE,
		dependsOn: [ContractPermission.canGetContractTypeList, ContractPermission.canGetContractType]
	},
	{
		key: ContractPermission.canGetContractTypeList,
		feature: ContractFeature.ADMINISTRATION_CONTRACT_TYPE,
		dependsOn: [ContractPermission.canViewAdministrationContractTypeFeature]
	},
	{
		key: ContractPermission.canGetContractType,
		feature: ContractFeature.ADMINISTRATION_CONTRACT_TYPE,
		dependsOn: [ContractPermission.canGetContractTypeList]
	},
	{
		key: ContractPermission.canDeleteContractType,
		feature: ContractFeature.ADMINISTRATION_CONTRACT_TYPE,
		dependsOn: [ContractPermission.canGetContractTypeList, ContractPermission.canGetContractType]
	},
	{
		key: ContractPermission.canCreateContractType,
		feature: ContractFeature.ADMINISTRATION_CONTRACT_TYPE,
		dependsOn: [ContractPermission.canGetContractTypeList]
	},
	{
		key: ContractPermission.canSignContract,
		feature: CoreFeature.CORE,
		requiresScope: true
	},
	{
		key: ContractPermission.canViewAdministrationContractTypeFeature,
		feature: ContractFeature.ADMINISTRATION_CONTRACT_TYPE
	}
];
