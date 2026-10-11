import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {
	LogDataForGetCloudCategory,
	LogGetCloudCategory
} from '@copor/cloud/domain/Cloud/CloudCategory/logger/LogGetCloudCategory';

describe('Log get cloud category', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetCloudCategory>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetCloudCategory = {cloudCategoryId: 'cloud-category-Id'};
	const expectedLogForSave: LogForSave<LogDataForGetCloudCategory> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getCloudCategory',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get cloud category', async () => {
		const logger = new LogGetCloudCategory(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
