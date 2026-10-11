import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForDeleteToDoCategory, LogDeleteToDoCategory} from '@copor/todo/domain/ToDo/ToDoCategory/logger/LogDeleteToDoCategory';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log delete todo category tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForDeleteToDoCategory>> = {
		save: jest.fn()
	};
	const logData: LogDataForDeleteToDoCategory = {
		categoryId: 'category-id'
	};
	const actorId = 'unique-id';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForDeleteToDoCategory> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteToDoCategory',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('should sucessfully log action', async () => {
		const logger: LogDeleteToDoCategory = new LogDeleteToDoCategory(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
