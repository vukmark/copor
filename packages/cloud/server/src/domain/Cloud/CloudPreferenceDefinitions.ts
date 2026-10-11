import {ModulePreferenceDefinitionDTO} from '@copor/core/domain/User/UserPreferences/ModulePreferences/ModulePreferenceDefinitionDTO';

export enum CloudPreference {
	// Push when a file lands in a user group folder the user belongs to.
	groupFolderNotifications = 'cloud.groupFolderNotifications',
	// Push when someone sends a file into the user's Public folder.
	userFolderNotifications = 'cloud.userFolderNotifications'
}

export const cloudPreferenceDefinitions: ModulePreferenceDefinitionDTO[] = [
	{key: CloudPreference.groupFolderNotifications, default: true},
	{key: CloudPreference.userFolderNotifications, default: true}
];
