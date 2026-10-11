import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogGetFileListForUser} from '@copor/cloud/domain/Cloud/logger/LogGetFileListForUser';

describe('log get activity type list test', () => {
	const mockRepo: jest.Mocked<NoDataLogRepository> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const userId = 'user_id';
	const expectedLogCreate: LogForSaveWithNoData = {
		actionTime: actionTime,
		actorUserId: userId,
		actionType: 'getFileListForUser'
	};
	const logDetails = new LogDetails(userId);

	it('should log action', async () => {
		const logger = new LogGetFileListForUser(mockRepo, logDetails);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLogCreate);
	});
});