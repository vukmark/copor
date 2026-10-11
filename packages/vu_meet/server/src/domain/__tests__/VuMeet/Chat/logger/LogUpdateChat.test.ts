import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForUpdateChat, LogUpdateChat} from '@copor/vu_meet/domain/VuMeet/Chat/logger/LogUpdateChat';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log update Chat tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateChat>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdateChat = {
		chatId: 'someId',
		name: 'chatName',
		userList: ['u1', 'u2']
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForUpdateChat> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateChat',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogUpdateChat = new LogUpdateChat(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
