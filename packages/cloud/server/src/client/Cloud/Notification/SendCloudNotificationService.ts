import {
	GetNotificationTokenListRepo
} from '@copor/core/domain/Components/NotificationToken/repository/GetNotificationTokenListRepo';
import {CloudNotificationSender} from './CloudNotificationSender';
import type {SharingType} from '@copor/cloud/domain/Cloud/interactor/dto/SaveFileDTO';
import {CloudPreference} from '@copor/cloud/domain/Cloud/CloudPreferenceDefinitions';

export type CloudNotificationPreference = CloudPreference;

export interface CloudNotificationRecipientRepo {
	loadUserIds(fileId: string): Promise<string[]>;
	loadNotificationDetails(fileId: string, uploaderUserId: string): Promise<CloudNotificationDetails>;
	loadDisabledUserIds(userIds: string[], preference: CloudNotificationPreference): Promise<string[]>;
}

export interface CloudNotificationDetails {
	filePath: string;
	fileName: string;
	uploaderName: string;
	uploaderRole: string;
	uploadedAt: Date;
	sharingType: SharingType;
}

export interface CloudNotificationWebSocketSender {
	send(userIds: string[], payload: Record<string, string>): void;
}

export interface SendCloudNotificationResult {
	targetedDeviceCount: number;
	deliveredDeviceCount: number;
	failedDeviceCount: number;
	failureCodes: string[];
}

export function normalizeCloudNotificationPath(filePath: string): string {
	const normalizedPath = filePath.trim().replace(/^\/+|\/+$/g, '');
	if (!normalizedPath) return '/cloud';
	return normalizedPath === 'cloud' || normalizedPath.startsWith('cloud/')
		? `/${normalizedPath}`
		: `/cloud/${normalizedPath}`;
}

export function getCloudNotificationPreference(sharingType: SharingType): CloudNotificationPreference | undefined {
	switch (sharingType) {
		case 'USER_GROUP':
			return CloudPreference.groupFolderNotifications;
		case 'PUBLIC':
			return CloudPreference.userFolderNotifications;
		case 'PRIVATE':
			return undefined;
	}
}

export class SendCloudNotificationService {
	constructor(
		private readonly recipientRepo: CloudNotificationRecipientRepo,
		private readonly tokenRepo: GetNotificationTokenListRepo,
		private readonly sender: CloudNotificationSender,
		private readonly webSocketSender: CloudNotificationWebSocketSender
	) {}

	async execute(fileId: string, uploaderUserId: string): Promise<SendCloudNotificationResult> {
		const [recipientUserIds, details] = await Promise.all([
			this.recipientRepo.loadUserIds(fileId),
			this.recipientRepo.loadNotificationDetails(fileId, uploaderUserId)
		]);
		let userIds = recipientUserIds
			.filter((userId) => userId !== uploaderUserId);
		const preference = getCloudNotificationPreference(details.sharingType);

		// Private files have no recipients other than their uploader and are never notified.
		if (!preference) userIds = [];
		else if (userIds.length > 0) {
			const disabledUserIds = new Set(await this.recipientRepo.loadDisabledUserIds(userIds, preference));
			userIds = userIds.filter((userId) => !disabledUserIds.has(userId));
		}
		const filePath = normalizeCloudNotificationPath(details.filePath);
		const notificationData = {
			notificationId: fileId,
			fileId,
			type: 'CLOUD',
			filePath,
			fileName: details.fileName,
			uploaderName: details.uploaderName,
			uploaderRole: details.uploaderRole,
			uploadedAt: details.uploadedAt.toISOString()
		};
		const title = 'Cloud update';
		const body = `${details.uploaderName} added ${details.fileName}`;

		if (userIds.length > 0) {
			this.webSocketSender.send(userIds, {...notificationData, title, body});
		}
		const tokens = userIds.length > 0 ? await this.tokenRepo.load(userIds) : [];
		let result: SendCloudNotificationResult = {
			targetedDeviceCount: tokens.length,
			deliveredDeviceCount: 0,
			failedDeviceCount: 0,
			failureCodes: tokens.length === 0 ? ['notification/no-registered-devices'] : []
		};

		if (tokens.length > 0) {
			result = await this.sender.send(tokens, {
				title,
				body,
				data: notificationData
			});
		}

		console.info('Automatic cloud notification result:', {
			fileId,
			recipientCount: userIds.length,
			tokenTypes: [...new Set(tokens.map((token) => token.type))],
			...result
		});

		return result;
	}
}
