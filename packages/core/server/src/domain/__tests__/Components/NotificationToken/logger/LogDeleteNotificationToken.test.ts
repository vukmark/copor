import {
	LogDataForDeleteNotificationToken,
	LogDeleteNotificationToken
} from '@copor/core/domain/Components/NotificationToken/logger/LogDeleteNotificationToken';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('log delete notification token tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteNotificationToken>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForDeleteNotificationToken = {tokenId: 'deletedNotificationToken'};
	const expectedResponseForSave: LogForSave<LogDataForDeleteNotificationToken> = {
		actionTime: actionTime,
		actionType: 'deleteNotificationToken',
		actorUserId: actorId,
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log deletion of a Notification Token', async () => {
		const logger = new LogDeleteNotificationToken(repo, logDetails, logData);

		await logger.log();
		expect(repo.save).toHaveBeenCalledWith(expectedResponseForSave);
	});
});