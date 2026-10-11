import {PermissionDefinitionDTO} from '@copor/core/domain/Core/Permission/PermissionDefinitionDTO';
import {CloudFeature} from '@copor/cloud/domain/Cloud/CloudFeature';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {CloudPermission} from '@copor/cloud/domain/Cloud/CloudPermission';

export const cloudPermissionDefinitions: PermissionDefinitionDTO[] = [
	{
		key: CloudPermission.canCreateCloudCategory,
		feature: CloudFeature.CLOUD,
		dependsOn: [CloudPermission.canGetCloudCategoryList]
	},
	{
		key: CloudPermission.canGetCloudCategory,
		feature: CloudFeature.CLOUD,
		dependsOn: [CloudPermission.canGetCloudCategoryList]
	},
	{
		key: CloudPermission.canDeleteCloudCategory,
		feature: CloudFeature.CLOUD,
		dependsOn: [CloudPermission.canGetCloudCategoryList, CloudPermission.canGetCloudCategory]
	},
	{
		key: CloudPermission.canGetCloudCategoryList,
		feature: CloudFeature.CLOUD,
		dependsOn: [CloudPermission.canViewCloudFeature]
	},
	{
		key: CloudPermission.canUpdateCloudCategory,
		feature: CloudFeature.CLOUD,
		dependsOn: [CloudPermission.canGetCloudCategoryList, CloudPermission.canGetCloudCategory]
	},
	// canCreateUserGroupFile only has a bare PermissionValidator (no composite validator checking
	// the referenced group exists), so this edge is inferred from naming, not a verified
	// foreign-key check like the rest of this file's cross-feature edges.
	{
		key: CloudPermission.canCreateUserGroupFile,
		feature: CloudFeature.CLOUD,
		dependsOn: [CorePermission.canGetUserGroupList]
	},
	{
		key: CloudPermission.canCreatePublicFile,
		feature: CloudFeature.CLOUD,
		dependsOn: [CloudPermission.canGetFileListForUser]
	},
	// Whom the "send file to a user" picker lists: the scope of this grant
	// (OWN: nobody, TENANT: same tenant, ALL: everyone).
	{
		key: CloudPermission.canGetShareRecipientList,
		feature: CloudFeature.CLOUD,
		requiresScope: true,
		dependsOn: [CloudPermission.canCreatePublicFile]
	},
	{
		key: CloudPermission.canGetFileListForUser,
		feature: CloudFeature.CLOUD,
		dependsOn: [CloudPermission.canViewCloudFeature]
	},
	{
		key: CloudPermission.canGetFile,
		feature: CloudFeature.CLOUD,
		dependsOn: [CloudPermission.canGetFileListForUser]
	},
	{
		key: CloudPermission.canDeleteFile,
		feature: CloudFeature.CLOUD,
		requiresScope: true,
		dependsOn: [CloudPermission.canGetFileListForUser, CloudPermission.canGetFile]
	},
	{
		key: CloudPermission.canViewCloudFeature,
		feature: CloudFeature.CLOUD
	}
];
