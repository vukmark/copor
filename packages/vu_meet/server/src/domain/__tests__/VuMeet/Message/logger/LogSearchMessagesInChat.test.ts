import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForSearchAllMessages} from '@copor/vu_meet/domain/VuMeet/Core/logger/LogSearchAllMessages';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {
	LogDataForSearchMessagesInChat,
	LogSearchMessagesInChat
} from '@copor/vu_meet/domain/VuMeet/Message/logger/LogSearchMessagesInChat';

describe('search messages in private chat logger tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForSearchMessagesInChat>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const userId = 'user_id';
	const logData: LogDataForSearchAllMessages = {
		prompt: 'prompt'
	};
	const expectedLogCreate: LogForSave<LogDataForSearchMessagesInChat> = {
		actionTime: actionTime,
		actorUserId: userId,
		actionType: 'searchMessagesInChat',
		logData: logData
	};
	const logDetails = new LogDetails(userId);

	it('should log action', async () => {
		const logger = new LogSearchMessagesInChat(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLogCreate);
	});
});
