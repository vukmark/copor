import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {
	LogDataForGetNotificationTokenList,
	LogGetNotificationTokenList
} from '@copor/core/domain/Components/NotificationToken/logger/LogGetNotificationTokenList';

describe('get notification token list logger tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForGetNotificationTokenList>> = {
		save: jest.fn()
	};
	const logData: LogDataForGetNotificationTokenList = {
		userId: 'uid'
	};
	const actorId = 'actor-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForGetNotificationTokenList> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getNotificationTokenList',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should successfully log action', async () => {
		const logger: LogGetNotificationTokenList = new LogGetNotificationTokenList(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
