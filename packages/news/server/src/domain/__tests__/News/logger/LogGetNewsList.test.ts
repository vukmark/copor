import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {LogGetNewsList} from '@copor/news/domain/News/logger/LogGetNewsList';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('Log Get News List test', () => {
	const mockRepo: jest.Mocked<NoDataLogRepository> = {
		save: jest.fn()
	};

	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSaveWithNoData = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getNewsList'
	};

	const logDetails = new LogDetails(actorId);

	it('should successfully log get news list action', async () => {
		const logger: LogGetNewsList = new LogGetNewsList(mockRepo, logDetails);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});