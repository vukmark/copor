import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CategoryType} from '@copor/core/domain/Core/enum/categoryType';
import {
	LogCreateCloudCategory,
	LogDataForCreateCloudCategory
} from '@copor/cloud/domain/Cloud/CloudCategory/logger/LogCreateCloudCategory';

describe('Test logging of creation of new cloud category', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateCloudCategory>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateCloudCategory = {
		name: 'some-name',
		description: 'some description',
		publishStatus: PublishStatus.published,
		categoryType: CategoryType.groups,
		actorId: 'crId'
	};
	const actorId = 'userId';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForCreateCloudCategory> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createCloudCategory',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogCreateCloudCategory = new LogCreateCloudCategory(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});