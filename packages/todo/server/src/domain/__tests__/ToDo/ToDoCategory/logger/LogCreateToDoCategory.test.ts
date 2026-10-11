import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogCreateToDoCategory, LogDataForCreateToDoCategory} from '@copor/todo/domain/ToDo/ToDoCategory/logger/LogCreateToDoCategory';
import {SimpleDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/entity/SimpleDate';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log create todo category tests', () => {
	const mockRepo: LogRepository<LogDataForCreateToDoCategory> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateToDoCategory = {
		id: 'unique-id',
		name: 'name',
		createdAt: new SimpleDate(2, 2, 2002),
		actorId: 'user-id'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForCreateToDoCategory> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createToDoCategory',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('should succesfully log action', async () => {
		const logger: LogCreateToDoCategory = new LogCreateToDoCategory(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
