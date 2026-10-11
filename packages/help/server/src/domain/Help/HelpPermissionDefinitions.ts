import {PermissionDefinitionDTO} from '@copor/core/domain/Core/Permission/PermissionDefinitionDTO';
import {HelpFeature} from '@copor/help/domain/Help/HelpFeature';
import {HelpPermission} from '@copor/help/domain/Help/HelpPermission';

export const helpPermissionDefinitions: PermissionDefinitionDTO[] = [
	{
		key: HelpPermission.canViewHelpFeature,
		feature: HelpFeature.HELP
	},
	{
		key: HelpPermission.canViewAboutFeature,
		feature: HelpFeature.ABOUT
	},
	{
		key: HelpPermission.canViewToolsFeature,
		feature: HelpFeature.TOOLS
	}
];
