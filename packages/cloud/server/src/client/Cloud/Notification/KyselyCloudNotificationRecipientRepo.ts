import {KyselyModulePreferencesHelper} from '@copor/core/client/User/UserPreferences/ModulePreferences/KyselyModulePreferencesHelper';
import {db} from '@copor/core/client/AppDataSource';
import {
	CloudNotificationDetails,
	CloudNotificationPreference,
	CloudNotificationRecipientRepo
} from './SendCloudNotificationService';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';

export class KyselyCloudNotificationRecipientRepo implements CloudNotificationRecipientRepo {
	constructor(private readonly appContext: AppContext) {}

	async loadNotificationDetails(fileId: string, uploaderUserId: string): Promise<CloudNotificationDetails> {
		const [file, uploader] = await Promise.all([
			db.selectFrom('cloudFile')
				.select(['path', 'name', 'createdAt', 'sharingType'])
				.where('id', '=', fileId)
				.executeTakeFirstOrThrow(),
			UserKyselyHelper.getUserData(uploaderUserId, this.appContext)
		]);
		const uploaderName = [uploader.userFirstName, uploader.userLastName]
			.filter(Boolean)
			.join(' ')
			.trim();

		return {
			filePath: file.path,
			fileName: file.name,
			uploaderName: uploaderName || uploader.username || '',
			uploaderRole: uploader.userRoleType?.toString() ?? '',
			uploadedAt: file.createdAt,
			sharingType: file.sharingType
		};
	}

	loadDisabledUserIds(userIds: string[], preference: CloudNotificationPreference): Promise<string[]> {
		return KyselyModulePreferencesHelper.usersWithPreferenceOff(preference, userIds);
	}

	async loadUserIds(fileId: string): Promise<string[]> {
		const [creator, userGroupUsers, targetedUser] = await Promise.all([
			db.selectFrom('cloudFile')
				.select('createdBy as userId')
				.where('id', '=', fileId)
				.execute(),
			db.selectFrom('fileUserGroupMap as fileMap')
				.innerJoin('userGroupUserMap as userMap', 'userMap.userGroupId', 'fileMap.userGroupId')
				.select('userMap.userId')
				.where('fileMap.fileId', '=', fileId)
				.execute(),
			db.selectFrom('fileUserMap')
				.select('userId')
				.where('fileId', '=', fileId)
				.execute()
		]);

		return [...new Set([
			...creator.map((item) => item.userId),
			...userGroupUsers.map((item) => item.userId),
			...targetedUser.map((item) => item.userId)
		].filter((userId): userId is string => Boolean(userId)))];
	}
}
