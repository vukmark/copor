import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogDataForDeleteCloudCategory,
	LogDeleteCloudCategory
} from '@copor/cloud/domain/Cloud/CloudCategory/logger/LogDeleteCloudCategory';

describe('log delete cloud category tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteCloudCategory>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForDeleteCloudCategory = {cloudCategoryId: 'deletedCloudCategoryId'};
	const expectedLogForSave: LogForSave<LogDataForDeleteCloudCategory> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteCloudCategory',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log deletion of a cloud category', async () => {
		const logger = new LogDeleteCloudCategory(repo, logDetails, logData);

		await logger.log();
		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
