import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForSearchAllMessages, LogSearchAllMessages} from '@copor/vu_meet/domain/VuMeet/Core/logger/LogSearchAllMessages';

describe('log search all messages tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForSearchAllMessages>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const userId = 'user_id';
	const logData: LogDataForSearchAllMessages = {
		prompt: 'prompt'
	};
	const expectedLogCreate: LogForSave<LogDataForSearchAllMessages> = {
		actionTime: actionTime,
		actorUserId: userId,
		actionType: 'searchAllMessages',
		logData: logData
	};
	const logDetails = new LogDetails(userId);

	it('should log action', async () => {
		const logger = new LogSearchAllMessages(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLogCreate);
	});
});
