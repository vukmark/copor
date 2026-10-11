import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CategoryType} from '@copor/core/domain/Core/enum/categoryType';
import {
	LogUpdateCloudCategory,
	LogDataForUpdateCloudCategory
} from '@copor/cloud/domain/Cloud/CloudCategory/logger/LogUpdateCloudCategory';

describe('Log update cloud category test', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateCloudCategory>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdateCloudCategory = {
		id: 'uniqueId',
		name: 'some cloud category',
		publishStatus: PublishStatus.published,
		categoryType: CategoryType.groups,
		actorId: 'crId'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForUpdateCloudCategory> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateCloudCategory',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogUpdateCloudCategory = new LogUpdateCloudCategory(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});