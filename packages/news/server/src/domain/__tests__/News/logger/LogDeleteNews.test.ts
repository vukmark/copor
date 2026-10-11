import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteNews, LogDeleteNews} from '@copor/news/domain/News/logger/LogDeleteNews';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('Log Delete News test', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteNews>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'user-id';
	const logData: LogDataForDeleteNews = {
		newsId: 'deleted_news_id'
	};
	const expectedLogForSave: LogForSave<LogDataForDeleteNews> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteNews',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('should successfully log delete action', async () => {
		const logger: LogDeleteNews = new LogDeleteNews(repo, logDetails, logData);

		await logger.log();
		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});