import {PermissionDefinitionDTO} from '@copor/core/domain/Core/Permission/PermissionDefinitionDTO';
import {AiContextItemFeature} from '@copor/ai_context_item/domain/AiContextItem/AiContextItemFeature';
import {AiContextItemPermission} from '@copor/ai_context_item/domain/AiContextItem/AiContextItemPermission';

export const aiContextItemPermissionDefinitions: PermissionDefinitionDTO[] = [
	{
		key: AiContextItemPermission.canCreateAiContextItem,
		feature: AiContextItemFeature.ADMINISTRATION_AI_CONTEXT_ITEM,
		dependsOn: [AiContextItemPermission.canGetAiContextItemList]
	},
	{
		key: AiContextItemPermission.canDeleteAiContextItem,
		feature: AiContextItemFeature.ADMINISTRATION_AI_CONTEXT_ITEM,
		dependsOn: [AiContextItemPermission.canGetAiContextItemList, AiContextItemPermission.canGetAiContextItem]
	},
	{
		key: AiContextItemPermission.canUpdateAiContextItem,
		feature: AiContextItemFeature.ADMINISTRATION_AI_CONTEXT_ITEM,
		dependsOn: [AiContextItemPermission.canGetAiContextItemList, AiContextItemPermission.canGetAiContextItem]
	},
	{
		key: AiContextItemPermission.canGetAiContextItem,
		feature: AiContextItemFeature.ADMINISTRATION_AI_CONTEXT_ITEM,
		dependsOn: [AiContextItemPermission.canGetAiContextItemList]
	},
	{
		key: AiContextItemPermission.canGetAiContextItemList,
		feature: AiContextItemFeature.ADMINISTRATION_AI_CONTEXT_ITEM,
		dependsOn: [AiContextItemPermission.canViewAdministrationAiContextItemFeature]
	},
	{
		key: AiContextItemPermission.canViewAdministrationAiContextItemFeature,
		feature: AiContextItemFeature.ADMINISTRATION_AI_CONTEXT_ITEM
	}
];
