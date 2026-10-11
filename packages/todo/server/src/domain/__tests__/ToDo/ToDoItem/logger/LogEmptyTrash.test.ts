import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogEmptyTrash} from '@copor/todo/domain/ToDo/ToDoItem/logger/LogEmptyTrash';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log empty trash test', () => {
	const repo: jest.Mocked<NoDataLogRepository> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const userId = 'user_id';
	const expectedLogCreate: LogForSaveWithNoData = {
		actionTime: actionTime,
		actorUserId: userId,
		actionType: 'emptyTrash'
	};
	const logDetails = new LogDetails(userId);

	it('should log action', async () => {
		const logger = new LogEmptyTrash(repo, logDetails);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogCreate);
	});
})