import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {
	LogDataForMarkChatMessagesSeen,
	LogMarkChatMessagesSeen
} from '@copor/vu_meet/domain/VuMeet/Chat/logger/LogMarkChatMessagesSeen';

describe('mark private chat messages seen logger tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForMarkChatMessagesSeen>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForMarkChatMessagesSeen = {chatId: 'chat-Id'};
	const expectedLogForSave: LogForSave<LogDataForMarkChatMessagesSeen> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'markChatMessagesSeen',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get private chat', async () => {
		const logger = new LogMarkChatMessagesSeen(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
