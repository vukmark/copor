import {FeatureDefinitionDTO} from '@copor/core/domain/FeatureList/FeatureDefinitionDTO';
import {CoreFeature} from '@copor/core/domain/FeatureList/enum/CoreFeature';
import {DashboardCategory} from '@copor/core/domain/FeatureList/enum/DashboardCategory';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';

export const coreFeatureDefinitions: FeatureDefinitionDTO[] = [
	{
		key: CoreFeature.SEARCH
	},
	{
		key: CoreFeature.AI_ASSISTANCE,
		viewPermission: CorePermission.canViewAiAssistanceFeature,
		menuItem: {icon: 'robotAstromech', labelKey: 'AI_ASSISTANCE', order: 30}
	},
	{
		key: CoreFeature.MY_ACCOUNT,
		viewPermission: CorePermission.canViewMyAccountFeature
	},
	{
		key: CoreFeature.MY_ACCOUNT_DELETION_REQUESTS,
		viewPermission: CorePermission.canRequestAccountDeletion
	},
	{
		key: CoreFeature.ADMINISTRATION,
		viewPermission: CorePermission.canViewAdministrationFeature,
		menuItem: {icon: 'userShield', labelKey: 'ADMINISTRATION', order: 40}
	},
	{
		key: CoreFeature.PROFILE,
		viewPermission: CorePermission.canViewProfileFeature
	},
	{
		key: CoreFeature.ADMINISTRATION_USER_GROUP,
		viewPermission: CorePermission.canViewAdministrationUserGroupFeature,
		dashboardItem: {category: DashboardCategory.USERS, icon: 'shieldCheck', titleKey: 'ROLE', order: 10}
	},
	{
		key: CoreFeature.ADMINISTRATION_USER,
		viewPermission: CorePermission.canViewAdministrationUserFeature,
		dashboardItem: {category: DashboardCategory.USERS, icon: 'user', titleKey: 'USERS', order: 20}
	},
	{
		key: CoreFeature.ADMINISTRATION_TAG,
		viewPermission: CorePermission.canViewAdministrationTagFeature,
		dashboardItem: {category: DashboardCategory.EDUCATIONAL_CONTENTS, icon: 'tag', titleKey: 'TAGS', order: 10}
	},
	{
		key: CoreFeature.ADMINISTRATION_LOG,
		viewPermission: CorePermission.canViewAdministrationLogFeature,
		dashboardItem: {category: DashboardCategory.SYSTEM, icon: 'clockRotateLeft', titleKey: 'LOGS', order: 10}
	},
	{
		key: CoreFeature.ADMINISTRATION_COUNTRY,
		viewPermission: CorePermission.canViewAdministrationCountryFeature
	},
	{
		key: CoreFeature.ADMINISTRATION_REGION,
		viewPermission: CorePermission.canViewAdministrationRegionFeature
	},
	{
		key: CoreFeature.ADMINISTRATION_LANGUAGE,
		viewPermission: CorePermission.canViewAdministrationLanguageFeature,
		dashboardItem: {category: DashboardCategory.SYSTEM, icon: 'globe', titleKey: 'LANGUAGES', order: 40}
	},
	{
		key: CoreFeature.ADMINISTRATION_NATIVE_LANGUAGE,
		viewPermission: CorePermission.canViewAdministrationNativeLanguageFeature,
		dashboardItem: {category: DashboardCategory.SYSTEM, icon: 'globe', titleKey: 'NATIVE_LANGUAGES', order: 50}
	},
	{
		key: CoreFeature.ADMINISTRATION_TENANT,
		viewPermission: CorePermission.canViewAdministrationTenantFeature,
		dashboardItem: {category: DashboardCategory.SYSTEM, icon: 'book', titleKey: 'TENANTS', order: 60}
	},
	{
		key: CoreFeature.ADMINISTRATION_DELETION_REQUESTS,
		viewPermission: CorePermission.canViewUserDeletionRequestsFeature,
		dashboardItem: {category: DashboardCategory.SYSTEM, icon: 'trash', titleKey: 'DELETION_REQUESTS', order: 70}
	},
	{
		key: CoreFeature.ADMINISTRATION_PERMISSIONS,
		viewPermission: CorePermission.canViewAdministrationPermissionsFeature,
		dashboardItem: {category: DashboardCategory.SYSTEM, icon: 'shieldKeyhole', titleKey: 'PERMISSIONS', order: 80}
	},
	{
		key: CoreFeature.ADMINISTRATION_SYSTEM_SETTINGS,
		viewPermission: CorePermission.canViewAdministrationSystemSettingsFeature,
		dashboardItem: {category: DashboardCategory.SYSTEM, icon: 'gear', titleKey: 'SYSTEM_SETTINGS', order: 90}
	},
	{
		key: CoreFeature.ADMINISTRATION_REGION_CITY,
		viewPermission: CorePermission.canViewAdministrationRegionCityFeature,
		dashboardItem: {category: DashboardCategory.SYSTEM, icon: 'city', titleKey: 'REGION_CITIES', order: 30}
	},
	{
		key: CoreFeature.ADMINISTRATION_USER_GROUPS,
		viewPermission: CorePermission.canViewAdministrationUserGroupsFeature,
		dashboardItem: {category: DashboardCategory.USERS, icon: 'userGroup', titleKey: 'USER_GROUPS', order: 30}
	},
	{
		key: CoreFeature.CORE
	},
	{
		key: CoreFeature.ADMINISTRATION_STATE,
		viewPermission: CorePermission.canViewAdministrationStateFeature,
		dashboardItem: {category: DashboardCategory.SYSTEM, icon: 'map', titleKey: 'STATE', order: 20}
	}
];
