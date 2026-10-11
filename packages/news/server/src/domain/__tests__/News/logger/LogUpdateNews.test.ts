
import {LogGetNewsList} from '@copor/news/domain/News/logger/LogGetNewsList';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {LogRepository} from "@copor/core/domain/Core/Logger/LogRepository";
import {LogDataForUpdateNews, LogUpdateNews} from "@copor/news/domain/News/logger/LogUpdateNews";
import {PublishStatus} from "@copor/core/domain/Core/enum/PublishStatus";
import {LogForSave} from "@copor/core/domain/Core/Logger/LogForSave";

describe('Log update News test', ()=>{
	const mockRepo : jest.Mocked<LogRepository<LogDataForUpdateNews>> ={
		save : jest.fn()
	}

	const actorId= 'user-id';
	const actionTIme = new CurrentUTCDate();

	const logData : LogDataForUpdateNews ={
		id: 'id',
		title: 'title',
		summary: 'some_summary',
		content: 'message_content',
		roleId: ['some-id'],
		publishStatus: PublishStatus.published
	}

	const expectedLog: LogForSave<LogDataForUpdateNews> = {
		actionTime: actionTIme,
		actorUserId : actorId,
		actionType : 'updateNews',
		logData : logData
	}

	const logDetails= new LogDetails(actorId);

	it('should successfully log update for News', async ()=>{
		const logger: LogUpdateNews= new LogUpdateNews(mockRepo,logDetails,logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});