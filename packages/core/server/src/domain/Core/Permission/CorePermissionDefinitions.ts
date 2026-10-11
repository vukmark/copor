import {PermissionDefinitionDTO} from '@copor/core/domain/Core/Permission/PermissionDefinitionDTO';
import {CoreFeature} from '@copor/core/domain/FeatureList/enum/CoreFeature';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';

export const corePermissionDefinitions: PermissionDefinitionDTO[] = [
	// TODO: remove — dead permission. Nothing validates against
	// CorePermission.canArchiveUser (no validator/interactor/controller
	// checks it); the real user activate/deactivate feature
	// (ToggleUserActiveStatus) is gated by canUpdateUser instead. Only other
	// reference is FakeGetRolePermissionListInteractorRepo's test fixture.
	{
		key: CorePermission.canArchiveUser,
		feature: CoreFeature.ADMINISTRATION_USER
	},
	{
		key: CorePermission.canUpdatePersonalProfileImage,
		feature: CoreFeature.MY_ACCOUNT,
		dependsOn: [CorePermission.canViewMyAccountFeature]
	},
	{
		key: CorePermission.canUpdateUserLoginInformation,
		feature: CoreFeature.MY_ACCOUNT,
		requiresScope: true,
		dependsOn: [CorePermission.canViewMyAccountFeature]
	},
	{
		key: CorePermission.canRequestAccountDeletion,
		feature: CoreFeature.MY_ACCOUNT
	},
	{
		key: CorePermission.canGetUserDeletionRequestsList,
		feature: CoreFeature.ADMINISTRATION,
		dependsOn: [CorePermission.canViewUserDeletionRequestsFeature]
	},
	{
		key: CorePermission.canViewUserDeletionRequestsFeature,
		feature: CoreFeature.ADMINISTRATION
	},
	{
		key: CorePermission.canGetLogList,
		feature: CoreFeature.ADMINISTRATION_LOG,
		dependsOn: [CorePermission.canViewAdministrationLogFeature]
	},
	{
		key: CorePermission.canGetAllTagsForUser,
		feature: CoreFeature.ADMINISTRATION_TAG,
		dependsOn: [CorePermission.canViewAdministrationTagFeature]
	},
	{
		key: CorePermission.canUpdateInactiveUser,
		feature: CoreFeature.ADMINISTRATION_USER,
		requiresScope: true,
		dependsOn: [CorePermission.canGetUserList]
	},
	{
		key: CorePermission.canUpdateTenantLogo,
		feature: CoreFeature.ADMINISTRATION_TENANT,
		dependsOn: [CorePermission.canGetTenantList, CorePermission.canGetTenant]
	},
	// Left without a dependsOn: this PermissionType is shared between this feature's system
	// settings screen AND src/ToDo/ToDoItem's per-user display settings (alarmExists/
	// displayedInCalendar) — a single dependency here would incorrectly gate one usage or the other.
	{
		key: CorePermission.canSetSettings,
		feature: CoreFeature.ADMINISTRATION_SYSTEM_SETTINGS
	},
	{
		key: CorePermission.canCreatePublicTag,
		feature: CoreFeature.ADMINISTRATION_TAG,
		dependsOn: [CorePermission.canGetPublicTagList]
	},
	{
		key: CorePermission.canDeleteTag,
		feature: CoreFeature.ADMINISTRATION_TAG,
		dependsOn: [CorePermission.canGetPublicTagList, CorePermission.canGetTag]
	},
	{
		key: CorePermission.canSearchTag,
		feature: CoreFeature.ADMINISTRATION_TAG,
		dependsOn: [CorePermission.canViewAdministrationTagFeature]
	},
	{
		key: CorePermission.canEditTag,
		feature: CoreFeature.ADMINISTRATION_TAG,
		requiresScope: true,
		dependsOn: [CorePermission.canGetPublicTagList, CorePermission.canGetTag]
	},
	{
		key: CorePermission.canDeleteRegion,
		feature: CoreFeature.ADMINISTRATION_REGION,
		dependsOn: [CorePermission.canGetRegionList, CorePermission.canGetRegion]
	},
	{
		key: CorePermission.canGetRegion,
		feature: CoreFeature.ADMINISTRATION_REGION,
		dependsOn: [CorePermission.canGetRegionList]
	},
	{
		key: CorePermission.canCreateRegion,
		feature: CoreFeature.ADMINISTRATION_REGION,
		dependsOn: [CorePermission.canGetRegionList]
	},
	{
		key: CorePermission.canDeleteCountry,
		feature: CoreFeature.ADMINISTRATION_COUNTRY,
		dependsOn: [CorePermission.canGetCountryList, CorePermission.canGetCountry]
	},
	{
		key: CorePermission.canUpdateRegion,
		feature: CoreFeature.ADMINISTRATION_REGION,
		dependsOn: [CorePermission.canGetRegionList, CorePermission.canGetRegion]
	},
	{
		key: CorePermission.canCreateCountry,
		feature: CoreFeature.ADMINISTRATION_COUNTRY,
		dependsOn: [CorePermission.canGetCountryList]
	},
	{
		key: CorePermission.canGetCountry,
		feature: CoreFeature.ADMINISTRATION_COUNTRY,
		dependsOn: [CorePermission.canGetCountryList]
	},
	{
		key: CorePermission.canUpdateCountry,
		feature: CoreFeature.ADMINISTRATION_COUNTRY,
		dependsOn: [CorePermission.canGetCountryList, CorePermission.canGetCountry]
	},
	{
		key: CorePermission.canCreateState,
		feature: CoreFeature.ADMINISTRATION_REGION,
		dependsOn: [CorePermission.canGetStateList, CorePermission.canGetCountryList]
	},
	{
		key: CorePermission.canGetCountryList,
		feature: CoreFeature.ADMINISTRATION_COUNTRY,
		dependsOn: [CorePermission.canViewAdministrationCountryFeature]
	},
	{
		key: CorePermission.canGetRegionList,
		feature: CoreFeature.ADMINISTRATION_REGION,
		dependsOn: [CorePermission.canViewAdministrationRegionFeature]
	},
	{
		key: CorePermission.canUpdateState,
		feature: CoreFeature.ADMINISTRATION_REGION,
		dependsOn: [CorePermission.canGetStateList, CorePermission.canGetState, CorePermission.canGetCountryList]
	},
	{
		key: CorePermission.canDeleteState,
		feature: CoreFeature.ADMINISTRATION_REGION,
		dependsOn: [CorePermission.canGetStateList, CorePermission.canGetState]
	},
	{
		key: CorePermission.canGetState,
		feature: CoreFeature.ADMINISTRATION_REGION,
		dependsOn: [CorePermission.canGetStateList]
	},
	// State is filed under CoreFeature.ADMINISTRATION_REGION, but SaveStateDTO references a
	// countryId (checked via ValidateCountry), not a regionId — its real foreign key is
	// ADMINISTRATION_COUNTRY, so canCreateState/canUpdateState depend on canGetCountryList.
	{
		key: CorePermission.canGetStateList,
		feature: CoreFeature.ADMINISTRATION_REGION,
		dependsOn: [CorePermission.canViewAdministrationRegionFeature]
	},
	{
		key: CorePermission.canGetRole,
		feature: CoreFeature.ADMINISTRATION_USER_GROUP,
		dependsOn: [CorePermission.canGetRoleList]
	},
	{
		key: CorePermission.canDeleteRole,
		feature: CoreFeature.ADMINISTRATION_USER_GROUP,
		dependsOn: [CorePermission.canGetRoleList, CorePermission.canGetRole]
	},
	{
		key: CorePermission.canGetRoleList,
		feature: CoreFeature.ADMINISTRATION_USER_GROUP,
		dependsOn: [CorePermission.canViewAdministrationUserGroupFeature]
	},
	{
		key: CorePermission.canCreateRole,
		feature: CoreFeature.ADMINISTRATION_USER_GROUP,
		dependsOn: [CorePermission.canGetRoleList]
	},
	{
		key: CorePermission.canUpdateRole,
		feature: CoreFeature.ADMINISTRATION_USER_GROUP,
		dependsOn: [CorePermission.canGetRoleList, CorePermission.canGetRole]
	},
	{
		key: CorePermission.canCreateLanguage,
		feature: CoreFeature.ADMINISTRATION_LANGUAGE,
		dependsOn: [CorePermission.canGetLanguageList]
	},
	{
		key: CorePermission.canUpdateLanguage,
		feature: CoreFeature.ADMINISTRATION_LANGUAGE,
		dependsOn: [CorePermission.canGetLanguageList, CorePermission.canGetLanguage]
	},
	{
		key: CorePermission.canDeleteLanguage,
		feature: CoreFeature.ADMINISTRATION_LANGUAGE,
		dependsOn: [CorePermission.canGetLanguageList, CorePermission.canGetLanguage]
	},
	{
		key: CorePermission.canGetLanguage,
		feature: CoreFeature.ADMINISTRATION_LANGUAGE,
		dependsOn: [CorePermission.canGetLanguageList]
	},
	{
		key: CorePermission.canGetLanguageList,
		feature: CoreFeature.ADMINISTRATION_LANGUAGE,
		dependsOn: [CorePermission.canViewAdministrationLanguageFeature]
	},
	{
		key: CorePermission.canUpdatePersonalData,
		feature: CoreFeature.MY_ACCOUNT,
		dependsOn: [CorePermission.canViewMyAccountFeature]
	},
	// canUpdateSettings is filed under ADMINISTRATION_SYSTEM_SETTINGS, but its interactor
	// (src/MyAccount/interactor/UpdateSettings.ts) is a personal MyAccount action, unrelated to
	// the system-wide settings this feature otherwise manages — depends on canViewMyAccountFeature
	// instead, despite the feature tag.
	{
		key: CorePermission.canUpdateSettings,
		feature: CoreFeature.ADMINISTRATION_SYSTEM_SETTINGS,
		dependsOn: [CorePermission.canViewMyAccountFeature]
	},
	{
		key: CorePermission.canGetUser,
		feature: CoreFeature.ADMINISTRATION_USER,
		dependsOn: [CorePermission.canGetUserList]
	},
	{
		key: CorePermission.canCreateNotificationToken,
		feature: CoreFeature.CORE
	},
	{
		key: CorePermission.canGetNotificationTokenList,
		feature: CoreFeature.CORE
	},
	{
		key: CorePermission.canDeleteNotificationToken,
		feature: CoreFeature.CORE
	},
	{
		key: CorePermission.canGetNotificationList,
		feature: CoreFeature.CORE
	},
	{
		key: CorePermission.canCountUnreadNotifications,
		feature: CoreFeature.CORE,
		dependsOn: [CorePermission.canGetNotificationList]
	},
	{
		key: CorePermission.canMarkAllNotificationsAsRead,
		feature: CoreFeature.CORE,
		dependsOn: [CorePermission.canGetNotificationList]
	},
	{
		key: CorePermission.canUpdateUserPreferences,
		feature: CoreFeature.MY_ACCOUNT,
		dependsOn: [CorePermission.canGetUserPreferences]
	},
	{
		key: CorePermission.canCreateUserPreferences,
		feature: CoreFeature.MY_ACCOUNT,
		dependsOn: [CorePermission.canViewMyAccountFeature]
	},
	{
		key: CorePermission.canGetUserPreferences,
		feature: CoreFeature.MY_ACCOUNT,
		dependsOn: [CorePermission.canViewMyAccountFeature]
	},
	{
		key: CorePermission.canDeleteUserPermissions,
		feature: CoreFeature.ADMINISTRATION_PERMISSIONS,
		dependsOn: [CorePermission.canGetUserPermissionList]
	},
	{
		key: CorePermission.canCreateTenant,
		feature: CoreFeature.ADMINISTRATION_TENANT,
		dependsOn: [CorePermission.canGetTenantList]
	},
	{
		key: CorePermission.canDeleteTenant,
		feature: CoreFeature.ADMINISTRATION_TENANT,
		dependsOn: [CorePermission.canGetTenantList, CorePermission.canGetTenant]
	},
	{
		key: CorePermission.canUpdateTenant,
		feature: CoreFeature.ADMINISTRATION_TENANT,
		dependsOn: [CorePermission.canGetTenantList, CorePermission.canGetTenant]
	},
	{
		key: CorePermission.canGetTenant,
		feature: CoreFeature.ADMINISTRATION_TENANT,
		dependsOn: [CorePermission.canGetTenantList]
	},
	{
		key: CorePermission.canSetPermissionListToRole,
		feature: CoreFeature.ADMINISTRATION_PERMISSIONS,
		dependsOn: [CorePermission.canGetRolePermissionList]
	},
	{
		key: CorePermission.canSetPermissionListToUser,
		feature: CoreFeature.ADMINISTRATION_PERMISSIONS,
		dependsOn: [CorePermission.canGetUserPermissionList]
	},
	{
		key: CorePermission.canGetRolePermissionList,
		feature: CoreFeature.ADMINISTRATION_PERMISSIONS,
		dependsOn: [CorePermission.canGetRoleList]
	},
	{
		key: CorePermission.canGetUserPermissionList,
		feature: CoreFeature.ADMINISTRATION_PERMISSIONS,
		dependsOn: [CorePermission.canGetUserList]
	},
	{
		key: CorePermission.canCreatePrivateTag,
		feature: CoreFeature.ADMINISTRATION_TAG,
		dependsOn: [CorePermission.canViewAdministrationTagFeature]
	},
	{
		key: CorePermission.canGetPublicTagList,
		feature: CoreFeature.ADMINISTRATION_TAG,
		dependsOn: [CorePermission.canViewAdministrationTagFeature]
	},
	{
		key: CorePermission.canGetContentList,
		feature: CoreFeature.CORE
	},
	{
		key: CorePermission.canGetTag,
		feature: CoreFeature.ADMINISTRATION_TAG,
		dependsOn: [CorePermission.canGetPublicTagList]
	},
	{
		key: CorePermission.canGetPersonalAccountInformation,
		feature: CoreFeature.SEARCH,
		dependsOn: [CorePermission.canViewSearchFeature]
	},
	{
		key: CorePermission.canUpdateUserAccountInformation,
		feature: CoreFeature.SEARCH,
		requiresScope: true,
		dependsOn: [CorePermission.canGetUserList]
	},
	{
		key: CorePermission.canGetTenantList,
		feature: CoreFeature.ADMINISTRATION_TENANT,
		dependsOn: [CorePermission.canViewAdministrationTenantFeature]
	},
	{
		key: CorePermission.canSearchTenantList,
		feature: CoreFeature.ADMINISTRATION_TENANT,
		dependsOn: [CorePermission.canViewAdministrationTenantFeature]
	},
	{
		key: CorePermission.canGetPrivateTagListForUser,
		feature: CoreFeature.ADMINISTRATION_TAG,
		requiresScope: true,
		dependsOn: [CorePermission.canViewAdministrationTagFeature]
	},
	{
		key: CorePermission.canCreateUser,
		feature: CoreFeature.ADMINISTRATION_USER,
		dependsOn: [CorePermission.canGetUserList]
	},
	{
		key: CorePermission.canDeleteUser,
		feature: CoreFeature.ADMINISTRATION_USER,
		dependsOn: [CorePermission.canGetUserList]
	},
	{
		key: CorePermission.canUpdateUser,
		feature: CoreFeature.ADMINISTRATION_USER,
		dependsOn: [CorePermission.canGetUserList]
	},
	{
		key: CorePermission.canGetUserList,
		feature: CoreFeature.ADMINISTRATION_USER,
		dependsOn: [CorePermission.canViewAdministrationUserFeature]
	},
	{
		key: CorePermission.canCreatePhoneNumber,
		feature: CoreFeature.MY_ACCOUNT,
		dependsOn: [CorePermission.canGetPhoneNumberList]
	},
	{
		key: CorePermission.canDeletePhoneNumber,
		feature: CoreFeature.MY_ACCOUNT,
		dependsOn: [CorePermission.canGetPhoneNumberList]
	},
	{
		key: CorePermission.canUpdatePhoneNumber,
		feature: CoreFeature.MY_ACCOUNT,
		dependsOn: [CorePermission.canGetPhoneNumberList]
	},
	{
		key: CorePermission.canGetPhoneNumberList,
		feature: CoreFeature.MY_ACCOUNT,
		dependsOn: [CorePermission.canViewMyAccountFeature]
	},
	// Address's country/state fields are real foreign keys (ValidateCountry/ValidateState in
	// both create and update), so these cross ADMINISTRATION_COUNTRY/ADMINISTRATION_REGION.
	{
		key: CorePermission.canCreateAddress,
		feature: CoreFeature.MY_ACCOUNT,
		dependsOn: [CorePermission.canViewMyAccountFeature, CorePermission.canGetCountryList, CorePermission.canGetStateList]
	},
	{
		key: CorePermission.canUpdateAddress,
		feature: CoreFeature.MY_ACCOUNT,
		dependsOn: [CorePermission.canViewMyAccountFeature, CorePermission.canGetCountryList, CorePermission.canGetStateList]
	},
	{
		key: CorePermission.canUpdateUserProfileImage,
		feature: CoreFeature.ADMINISTRATION_USER,
		dependsOn: [CorePermission.canUpdateUser]
	},
	{
		key: CorePermission.canCreateImage,
		feature: CoreFeature.MY_ACCOUNT,
		dependsOn: [CorePermission.canViewMyAccountFeature]
	},
	{
		key: CorePermission.canDeleteImage,
		feature: CoreFeature.MY_ACCOUNT,
		dependsOn: [CorePermission.canGetImage]
	},
	{
		key: CorePermission.canUpdateImage,
		feature: CoreFeature.MY_ACCOUNT,
		dependsOn: [CorePermission.canGetImage]
	},
	{
		key: CorePermission.canGetImage,
		feature: CoreFeature.MY_ACCOUNT,
		dependsOn: [CorePermission.canViewMyAccountFeature]
	},
	{
		key: CorePermission.canGetUserAccountInformation,
		feature: CoreFeature.MY_ACCOUNT,
		requiresScope: true
	},
	{
		key: CorePermission.canUpdatePersonalAccountInformation,
		feature: CoreFeature.MY_ACCOUNT,
		dependsOn: [CorePermission.canViewMyAccountFeature]
	},
	{
		key: CorePermission.canGetAllPermissions,
		feature: CoreFeature.ADMINISTRATION_PERMISSIONS,
		dependsOn: [CorePermission.canViewAdministrationPermissionsFeature]
	},
	{
		key: CorePermission.canGetSystemSettings,
		feature: CoreFeature.ADMINISTRATION_SYSTEM_SETTINGS,
		dependsOn: [CorePermission.canGetSystemSettingsList]
	},
	{
		key: CorePermission.canUpdateSystemSettings,
		feature: CoreFeature.ADMINISTRATION_SYSTEM_SETTINGS,
		dependsOn: [CorePermission.canGetSystemSettingsList, CorePermission.canGetSystemSettings]
	},
	{
		key: CorePermission.canGetSystemSettingsList,
		feature: CoreFeature.ADMINISTRATION_SYSTEM_SETTINGS,
		dependsOn: [CorePermission.canViewAdministrationSystemSettingsFeature]
	},
	{
		key: CorePermission.canGetUserAccountInformationForDisplay,
		feature: CoreFeature.MY_ACCOUNT,
		dependsOn: [CorePermission.canViewMyAccountFeature]
	},
	{
		key: CorePermission.canGetLog,
		feature: CoreFeature.ADMINISTRATION_LOG,
		dependsOn: [CorePermission.canGetLogList]
	},
	{
		key: CorePermission.canCreateRegionCity,
		feature: CoreFeature.ADMINISTRATION_REGION_CITY,
		dependsOn: [CorePermission.canGetRegionCityList]
	},
	{
		key: CorePermission.canDeleteRegionCity,
		feature: CoreFeature.ADMINISTRATION_REGION_CITY,
		dependsOn: [CorePermission.canGetRegionCityList, CorePermission.canGetRegionCity]
	},
	{
		key: CorePermission.canGetRegionCity,
		feature: CoreFeature.ADMINISTRATION_REGION_CITY,
		dependsOn: [CorePermission.canGetRegionCityList]
	},
	{
		key: CorePermission.canGetRegionCityList,
		feature: CoreFeature.ADMINISTRATION_REGION_CITY,
		dependsOn: [CorePermission.canViewAdministrationRegionCityFeature]
	},
	{
		key: CorePermission.canUpdateRegionCity,
		feature: CoreFeature.ADMINISTRATION_REGION_CITY,
		dependsOn: [CorePermission.canGetRegionCityList, CorePermission.canGetRegionCity]
	},
	{
		key: CorePermission.canCreateUserGroup,
		feature: CoreFeature.ADMINISTRATION_USER_GROUPS,
		dependsOn: [CorePermission.canGetUserGroupList]
	},
	{
		key: CorePermission.canDeleteUserGroup,
		feature: CoreFeature.ADMINISTRATION_USER_GROUPS,
		dependsOn: [CorePermission.canGetUserGroupList, CorePermission.canGetUserGroup]
	},
	{
		key: CorePermission.canGetUserGroup,
		feature: CoreFeature.ADMINISTRATION_USER_GROUPS,
		dependsOn: [CorePermission.canGetUserGroupList]
	},
	{
		key: CorePermission.canUpdateUserGroup,
		feature: CoreFeature.ADMINISTRATION_USER_GROUPS,
		dependsOn: [CorePermission.canGetUserGroupList, CorePermission.canGetUserGroup]
	},
	{
		key: CorePermission.canGetUserGroupTree,
		feature: CoreFeature.ADMINISTRATION_USER_GROUPS,
		dependsOn: [CorePermission.canGetUserGroupList]
	},
	{
		key: CorePermission.canSetPermissionListToUserGroup,
		feature: CoreFeature.ADMINISTRATION_PERMISSIONS,
		dependsOn: [CorePermission.canGetUserGroupPermissionList]
	},
	{
		key: CorePermission.canGetUserGroupPermissionList,
		feature: CoreFeature.ADMINISTRATION_PERMISSIONS,
		dependsOn: [CorePermission.canGetUserGroupList]
	},
	{
		key: CorePermission.canSetUserGroupUserList,
		feature: CoreFeature.ADMINISTRATION_USER_GROUPS,
		dependsOn: [CorePermission.canGetUserGroup, CorePermission.canGetUserList]
	},
	{
		key: CorePermission.canAddUserToUserGroup,
		feature: CoreFeature.ADMINISTRATION_USER_GROUPS,
		dependsOn: [CorePermission.canGetUserGroup, CorePermission.canGetUserList]
	},
	{
		key: CorePermission.canGetUserGroupList,
		feature: CoreFeature.ADMINISTRATION_USER_GROUPS,
		dependsOn: [CorePermission.canViewAdministrationUserGroupsFeature]
	},
	{
		key: CorePermission.canQueueEmail,
		feature: CoreFeature.CORE
	},
	{
		key: CorePermission.canDeleteQueuedEmail,
		feature: CoreFeature.CORE
	},
	{
		key: CorePermission.canViewSearchFeature,
		feature: CoreFeature.SEARCH
	},
	{
		key: CorePermission.canViewAiAssistanceFeature,
		feature: CoreFeature.AI_ASSISTANCE
	},
	{
		key: CorePermission.canViewMyAccountFeature,
		feature: CoreFeature.MY_ACCOUNT
	},
	{
		key: CorePermission.canViewAdministrationFeature,
		feature: CoreFeature.ADMINISTRATION
	},
	{
		key: CorePermission.canViewProfileFeature,
		feature: CoreFeature.PROFILE
	},
	{
		key: CorePermission.canViewAdministrationUserGroupFeature,
		feature: CoreFeature.ADMINISTRATION_USER_GROUP
	},
	{
		key: CorePermission.canViewAdministrationUserFeature,
		feature: CoreFeature.ADMINISTRATION_USER
	},
	{
		key: CorePermission.canViewAdministrationTagFeature,
		feature: CoreFeature.ADMINISTRATION_TAG
	},
	{
		key: CorePermission.canViewAdministrationLogFeature,
		feature: CoreFeature.ADMINISTRATION_LOG
	},
	{
		key: CorePermission.canViewAdministrationCountryFeature,
		feature: CoreFeature.ADMINISTRATION_COUNTRY
	},
	{
		key: CorePermission.canViewAdministrationRegionFeature,
		feature: CoreFeature.ADMINISTRATION_REGION
	},
	{
		key: CorePermission.canViewAdministrationLanguageFeature,
		feature: CoreFeature.ADMINISTRATION_LANGUAGE
	},
	{
		key: CorePermission.canViewAdministrationTenantFeature,
		feature: CoreFeature.ADMINISTRATION_TENANT
	},
	{
		key: CorePermission.canViewAdministrationPermissionsFeature,
		feature: CoreFeature.ADMINISTRATION_PERMISSIONS
	},
	{
		key: CorePermission.canViewAdministrationSystemSettingsFeature,
		feature: CoreFeature.ADMINISTRATION_SYSTEM_SETTINGS
	},
	{
		key: CorePermission.canViewAdministrationRegionCityFeature,
		feature: CoreFeature.ADMINISTRATION_REGION_CITY
	},
	{
		key: CorePermission.canViewAdministrationUserGroupsFeature,
		feature: CoreFeature.ADMINISTRATION_USER_GROUPS
	},
	{
		key: CorePermission.canGetFeatureList,
		feature: CoreFeature.CORE
	},
	{
		key: CorePermission.canCreateAdminUser,
		feature: CoreFeature.ADMINISTRATION_USER,
		dependsOn: [CorePermission.canGetUserList]
	},
	{
		key: CorePermission.canViewAdministrationStateFeature,
		feature: CoreFeature.ADMINISTRATION_STATE
	},
	{
		key: CorePermission.canCreateNativeLanguage,
		feature: CoreFeature.ADMINISTRATION_NATIVE_LANGUAGE,
		dependsOn: [CorePermission.canGetNativeLanguageList]
	},
	{
		key: CorePermission.canUpdateNativeLanguage,
		feature: CoreFeature.ADMINISTRATION_NATIVE_LANGUAGE,
		dependsOn: [CorePermission.canGetNativeLanguageList, CorePermission.canGetNativeLanguage]
	},
	{
		key: CorePermission.canDeleteNativeLanguage,
		feature: CoreFeature.ADMINISTRATION_NATIVE_LANGUAGE,
		dependsOn: [CorePermission.canGetNativeLanguageList, CorePermission.canGetNativeLanguage]
	},
	{
		key: CorePermission.canGetNativeLanguage,
		feature: CoreFeature.ADMINISTRATION_NATIVE_LANGUAGE,
		dependsOn: [CorePermission.canGetNativeLanguageList]
	},
	{
		key: CorePermission.canGetNativeLanguageList,
		feature: CoreFeature.ADMINISTRATION_NATIVE_LANGUAGE,
		dependsOn: [CorePermission.canViewAdministrationNativeLanguageFeature]
	},
	{
		key: CorePermission.canViewAdministrationNativeLanguageFeature,
		feature: CoreFeature.ADMINISTRATION_NATIVE_LANGUAGE
	}
];
