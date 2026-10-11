import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogGetShareRecipientList} from '@copor/cloud/domain/Cloud/logger/LogGetShareRecipientList';

describe('get share recipient list logger tests', () => {
	const mockRepo: jest.Mocked<NoDataLogRepository> = {
		save: jest.fn()
	};
	const userId = 'user_id';
	const expectedLogCreate: LogForSaveWithNoData = {
		actionTime: new CurrentUTCDate(),
		actorUserId: userId,
		actionType: 'getShareRecipientList'
	};

	it('logs the get share recipient list action', async () => {
		const logger = new LogGetShareRecipientList(mockRepo, new LogDetails(userId));

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLogCreate);
	});
});
