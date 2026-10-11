import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetNews, LogGetNews} from '@copor/news/domain/News/logger/LogGetNews';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('Log Get News test', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForGetNews>> = {
		save: jest.fn()
	};

	const logData: LogDataForGetNews = {
		newsId: ''
	};

	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForGetNews> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getNews',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should successfully log get news action', async () => {
		const logger: LogGetNews = new LogGetNews(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});