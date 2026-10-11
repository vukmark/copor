import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogGetAlarmList} from '@copor/todo/domain/ToDo/Alarm/logger/LogGetAlarmList';

describe('log get alarm list test', () => {
	const mockRepo: jest.Mocked<NoDataLogRepository> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const userId = 'user_id';
	const expectedLogCreate: LogForSaveWithNoData = {
		actionTime: actionTime,
		actorUserId: userId,
		actionType: 'getAlarmList'
	};
	const logDetails = new LogDetails(userId);

	it('should log action', async () => {
		const logger = new LogGetAlarmList(mockRepo, logDetails);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLogCreate);
	});
});
