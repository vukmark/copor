import {getFeatureDefinitions, validateFeatureReferences} from '@copor/core/domain/FeatureList/FeatureRegistry';
import {allModules} from '../../../src/modules';

describe('FeatureRegistry', () => {
	it('every view permission and every permission\'s feature is registered', () => {
		expect(() => validateFeatureReferences()).not.toThrow();
	});

	it('unlocks each feature through the same view permission as before the registry', () => {
		const pairs = getFeatureDefinitions()
			.filter((definition) => definition.viewPermission)
			.map((definition) => [definition.viewPermission, definition.key])
			.sort((a, b) => a[0]!.localeCompare(b[0]!));

		// The pairs of this app's modules (each permission key starts with its module's name).
		const included = new Set(['core', ... allModules.map((module) => module.name)]);

		expect(pairs).toEqual(([
			['ai_context_item.canViewAdministrationAiContextItemFeature', '/administration/ai-context-item'],
			['cloud.canViewCloudFeature', '/cloud'],
			['contacts.canViewContactsFeature', '/contacts'],
			['content_item.canViewAdministrationContentItemFeature', '/administration/content-item'],
			['contract.canViewAdministrationContractTypeFeature', '/administration/contract-type'],
			['core.canRequestAccountDeletion', '/my-account/deletion-requests'],
			['core.canViewAdministrationCountryFeature', '/administration/country'],
			['core.canViewAdministrationFeature', '/administration-dashboard'],
			['core.canViewAdministrationLanguageFeature', '/administration/language'],
			['core.canViewAdministrationLogFeature', '/administration/log'],
			['core.canViewAdministrationNativeLanguageFeature', '/administration/native-language'],
			['core.canViewAdministrationPermissionsFeature', '/administration/permissions'],
			['core.canViewAdministrationRegionCityFeature', '/administration/region-city'],
			['core.canViewAdministrationRegionFeature', '/administration/region'],
			['core.canViewAdministrationStateFeature', '/administration/state'],
			['core.canViewAdministrationSystemSettingsFeature', '/administration/system-settings'],
			['core.canViewAdministrationTagFeature', '/administration/tag'],
			['core.canViewAdministrationTenantFeature', '/administration/tenant'],
			['core.canViewAdministrationUserFeature', '/administration/user'],
			['core.canViewAdministrationUserGroupFeature', '/administration/role'],
			['core.canViewAdministrationUserGroupsFeature', '/administration/user-groups'],
			['core.canViewAiAssistanceFeature', '/ai-assistance'],
			['core.canViewMyAccountFeature', '/my-account'],
			['core.canViewProfileFeature', '/profile'],
			['core.canViewUserDeletionRequestsFeature', '/administration/deletion-requests'],
			['help.canViewAboutFeature', '/about'],
			['help.canViewHelpFeature', '/help'],
			['help.canViewToolsFeature', '/tools'],
			['news.canViewNewsFeature', '/news'],
			['todo.canViewTodoFeature', '/todo'],
			['vu_meet.canViewVuMeetFeature', '/vu-meet']
		] as string[][]).filter(([permission]) => included.has(permission.split('.')[0])));
	});
});
