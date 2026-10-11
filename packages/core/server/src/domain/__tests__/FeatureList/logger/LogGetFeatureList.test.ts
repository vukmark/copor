import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogGetFeatureList} from '@copor/core/domain/FeatureList/logger/LogGetFeatureList';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';

describe('Log get ContentList', () => {
	const mockRepo: jest.Mocked<NoDataLogRepository> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const userId = 'userId';
	const expectedLogForSave: LogForSaveWithNoData = {
		actionTime: actionTime,
		actorUserId: userId,
		actionType: 'getContentList'
	};
	const logDetails = new LogDetails(userId);

	it('Should log get ContentList', async () => {
		const logger = new LogGetFeatureList(mockRepo, logDetails);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
