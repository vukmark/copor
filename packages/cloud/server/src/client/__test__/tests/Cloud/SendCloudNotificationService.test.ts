import {
	CloudNotificationPreference,
	CloudNotificationRecipientRepo,
	SendCloudNotificationService
} from '@copor/cloud/client/Cloud/Notification/SendCloudNotificationService';
import {GetNotificationTokenListRepo}
	from '@copor/core/domain/Components/NotificationToken/repository/GetNotificationTokenListRepo';
import {CloudNotificationSender}
	from '@copor/cloud/client/Cloud/Notification/CloudNotificationSender';
import {GetNotificationTokenDTO}
	from '@copor/core/domain/Components/NotificationToken/interactor/dto/GetNotificationTokenDTO';
import {NotificationTokenType} from '@copor/core/domain/Core/enum/NotificationTokenType';
import {SharingType} from '@copor/cloud/domain/Cloud/interactor/dto/SaveFileDTO';
import {CloudPreference} from '@copor/cloud/domain/Cloud/CloudPreferenceDefinitions';

describe('SendCloudNotificationService', () => {
	const details = (sharingType: SharingType) => ({
		filePath: 'documents/reports',
		fileName: 'report.pdf',
		uploaderName: 'Test User',
		uploaderRole: 'USER',
		uploadedAt: new Date('2026-08-25T10:00:00.000Z'),
		sharingType
	});

	function createService(sharingType: SharingType, disabledUserIds: string[] = []) {
		const tokens: GetNotificationTokenDTO[] = [
			{token: 'first-token', user: 'first-user-id', type: NotificationTokenType.ANDROID}
		];
		const recipientRepo: CloudNotificationRecipientRepo = {
			loadUserIds: jest.fn().mockResolvedValue(['uploader-user-id', 'first-user-id', 'second-user-id']),
			loadNotificationDetails: jest.fn().mockResolvedValue(details(sharingType)),
			loadDisabledUserIds: jest.fn().mockResolvedValue(disabledUserIds)
		};
		const tokenRepo: GetNotificationTokenListRepo = {load: jest.fn().mockResolvedValue(tokens)};
		const senderResult = {
			targetedDeviceCount: 1,
			deliveredDeviceCount: 1,
			failedDeviceCount: 0,
			failureCodes: []
		};
		const sender: CloudNotificationSender = {send: jest.fn().mockResolvedValue(senderResult)};
		const webSocketSender = {send: jest.fn()};

		return {
			service: new SendCloudNotificationService(recipientRepo, tokenRepo, sender, webSocketSender),
			recipientRepo,
			tokenRepo,
			sender,
			webSocketSender,
			senderResult
		};
	}

	it.each([
		[SharingType.USER_GROUP, CloudPreference.groupFolderNotifications],
		[SharingType.PUBLIC, CloudPreference.userFolderNotifications]
	] as [SharingType, CloudNotificationPreference][])(
		'filters %s recipients using %s preference',
		async (sharingType, preference) => {
			const context = createService(sharingType, ['second-user-id']);

			const result = await context.service.execute('file-id', 'uploader-user-id');

			expect(context.recipientRepo.loadDisabledUserIds).toHaveBeenCalledWith(
				['first-user-id', 'second-user-id'],
				preference
			);
			expect(context.tokenRepo.load).toHaveBeenCalledWith(['first-user-id']);
			expect(context.webSocketSender.send).toHaveBeenCalledWith(
				['first-user-id'],
				expect.objectContaining({fileId: 'file-id', type: 'CLOUD'})
			);
			expect(context.sender.send).toHaveBeenCalled();
			expect(result).toEqual(context.senderResult);
		}
	);

	it('does not send private-folder notifications', async () => {
		const context = createService(SharingType.PRIVATE);

		const result = await context.service.execute('file-id', 'uploader-user-id');

		expect(context.recipientRepo.loadDisabledUserIds).not.toHaveBeenCalled();
		expect(context.tokenRepo.load).not.toHaveBeenCalled();
		expect(context.webSocketSender.send).not.toHaveBeenCalled();
		expect(context.sender.send).not.toHaveBeenCalled();
		expect(result.failureCodes).toEqual(['notification/no-registered-devices']);
	});
});
