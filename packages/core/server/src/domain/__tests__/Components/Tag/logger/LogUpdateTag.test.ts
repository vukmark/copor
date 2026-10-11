import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDataForUpdateTag, LogUpdateTag} from '@copor/core/domain/Components/Tag/logger/LogUpdateTag';
import {Color} from '@copor/core/domain/Core/enum/Color';

describe('Log tag update', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateTag>> = {
		save: jest.fn()
	};

	const logData: LogDataForUpdateTag = {
		id: 'unique-id',
		name: 'tag',
		description: 'description of todo',
		color: Color.amber,
		actorId: 'creator-id'
	};

	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForUpdateTag> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'editTag',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogUpdateTag = new LogUpdateTag(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
