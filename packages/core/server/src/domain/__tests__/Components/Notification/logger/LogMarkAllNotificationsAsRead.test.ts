import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {LogMarkAllNotificationsAsRead} from '@copor/core/domain/Components/Notification/logger/LogMarkAllNotificationsAsRead';

describe('log mark all notifications as read tests', () => {
	const mockRepo: jest.Mocked<NoDataLogRepository> = {
		save: jest.fn()
	};
	const actorId = 'actor-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSaveWithNoData = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'markAllNotificationsAsRead'
	};
	const logDetails = new LogDetails(actorId);

	it('Should log action', async () => {
		const logger = new LogMarkAllNotificationsAsRead(mockRepo, logDetails);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
