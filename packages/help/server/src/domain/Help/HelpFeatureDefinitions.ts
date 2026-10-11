import {FeatureDefinitionDTO} from '@copor/core/domain/FeatureList/FeatureDefinitionDTO';
import {HelpFeature} from '@copor/help/domain/Help/HelpFeature';
import {HelpPermission} from '@copor/help/domain/Help/HelpPermission';

export const helpFeatureDefinitions: FeatureDefinitionDTO[] = [
	{
		key: HelpFeature.HELP,
		viewPermission: HelpPermission.canViewHelpFeature
	},
	{
		key: HelpFeature.ABOUT,
		viewPermission: HelpPermission.canViewAboutFeature
	},
	{
		key: HelpFeature.TOOLS,
		viewPermission: HelpPermission.canViewToolsFeature,
		menuItem: {icon: 'tools', labelKey: 'TOOLS', order: 50}
	}
];
