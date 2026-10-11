import {FeatureDefinitionDTO} from '@copor/core/domain/FeatureList/FeatureDefinitionDTO';
import {AiContextItemFeature} from '@copor/ai_context_item/domain/AiContextItem/AiContextItemFeature';
import {DashboardCategory} from '@copor/core/domain/FeatureList/enum/DashboardCategory';
import {AiContextItemPermission} from '@copor/ai_context_item/domain/AiContextItem/AiContextItemPermission';

export const aiContextItemFeatureDefinitions: FeatureDefinitionDTO[] = [
	{
		key: AiContextItemFeature.ADMINISTRATION_AI_CONTEXT_ITEM,
		viewPermission: AiContextItemPermission.canViewAdministrationAiContextItemFeature,
		dashboardItem: {category: DashboardCategory.ADMINISTRATION, icon: 'robot', titleKey: 'AI_CONTEXT_ITEM', order: 30}
	}
];
