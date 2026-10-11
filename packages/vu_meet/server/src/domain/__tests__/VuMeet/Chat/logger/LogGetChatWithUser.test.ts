import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {
	LogDataForGetChatWithUser,
	LogGetChatWithUser
} from '@copor/vu_meet/domain/VuMeet/Chat/logger/LogGetChatWithUser';

describe('get private chat with user logger tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetChatWithUser>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetChatWithUser = {users: ['chat-Id', 'user2-Id']};
	const expectedLogForSave: LogForSave<LogDataForGetChatWithUser> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getChatWithUser',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get private chat', async () => {
		const logger = new LogGetChatWithUser(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
