import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogGetPublicTagList} from '@copor/core/domain/Components/Tag/logger/LogGetPublicTagList';

describe('Log get public tag list test', () => {
	const mockRepo: jest.Mocked<NoDataLogRepository> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const userId = 'user_id';
	const expectedLogCreate: LogForSaveWithNoData = {
		actionTime: actionTime,
		actorUserId: userId,
		actionType: 'getPublicTagList'
	};
	const logDetails = new LogDetails(userId);

	it('should log action', async () => {
		const logger = new LogGetPublicTagList(mockRepo, logDetails);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLogCreate);
	});
});