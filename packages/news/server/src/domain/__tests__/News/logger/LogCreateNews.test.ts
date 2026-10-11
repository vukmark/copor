import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogCreateNews, LogDataForCreateNews} from '@copor/news/domain/News/logger/LogCreateNews';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('Log Create News test', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateNews>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateNews = {
		id: 'id',
		content: 'content',
		publishStatus: PublishStatus.published,
		roleId: ['roleId'],
		summary: 'summary',
		title: 'title'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForCreateNews> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createNews',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should successfully log action', async () => {
		const logger: LogCreateNews = new LogCreateNews(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});