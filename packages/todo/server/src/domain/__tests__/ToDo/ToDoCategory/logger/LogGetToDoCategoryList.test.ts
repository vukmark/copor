import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogGetToDoCategoryList} from '@copor/todo/domain/ToDo/ToDoCategory/logger/LogGetToDoCategoryList';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log list todo categories test', () => {
	const mockRepo: jest.Mocked<NoDataLogRepository> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const userId = 'user-id';
	const expectedLogCreate: LogForSaveWithNoData = {
		actionTime: actionTime,
		actorUserId: userId,
		actionType: 'getToDoCategoryList'
	};
	const logDetails = new LogDetails(userId);

	it('should log action', async () => {
		const logger = new LogGetToDoCategoryList(mockRepo, logDetails);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLogCreate);
	});
});
