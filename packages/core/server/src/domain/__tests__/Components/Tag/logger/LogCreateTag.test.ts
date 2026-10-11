import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogCreateTag, LogDataForCreateTag} from '@copor/core/domain/Components/Tag/logger/LogCreateTag';

describe('log create tag tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateTag>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateTag = {
		id: 'some-id',
		name: 'name',
		description: 'description'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForCreateTag> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createTag',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogCreateTag = new LogCreateTag(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
