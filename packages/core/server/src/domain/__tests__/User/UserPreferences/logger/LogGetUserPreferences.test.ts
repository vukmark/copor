import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogGetUserPreferences} from '@copor/core/domain/User/UserPreferences/logger/LogGetUserPreferences';

describe('log get user preferences tests', () => {
	const mockRepo: jest.Mocked<NoDataLogRepository> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const expectedLogForSave: LogForSaveWithNoData = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getUserPreferences'
	};
	const logDetails = new LogDetails(actorId);

	it('Should log action', async () => {
		const logger = new LogGetUserPreferences(mockRepo, logDetails);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
