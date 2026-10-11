import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {LogCountUnreadNotifications} from '@copor/core/domain/Components/Notification/logger/LogCountUnreadNotifications';

describe('log count unread notifications tests', () => {
	const mockRepo: jest.Mocked<NoDataLogRepository> = {
		save: jest.fn()
	};
	const actorId = 'actor-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSaveWithNoData = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'countUnreadNotifications'
	};
	const logDetails = new LogDetails(actorId);

	it('Should log action', async () => {
		const logger = new LogCountUnreadNotifications(mockRepo, logDetails);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
