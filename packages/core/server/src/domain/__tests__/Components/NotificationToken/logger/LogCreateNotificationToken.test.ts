import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {NotificationTokenType} from '@copor/core/domain/Core/enum/NotificationTokenType';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {
	LogCreateNotificationToken,
	LogDataForCreateNotificationToken
} from '@copor/core/domain/Components/NotificationToken/logger/LogCreateNotificationToken';

describe('log create notification token tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateNotificationToken>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateNotificationToken = {
		id: 'id',
		token: 'token',
		userId: 'userId',
		type: NotificationTokenType.IOS
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForCreateNotificationToken> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createNotificationToken',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogCreateNotificationToken = new LogCreateNotificationToken(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
