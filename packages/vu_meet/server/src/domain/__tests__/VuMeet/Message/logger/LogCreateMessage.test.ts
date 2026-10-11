import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {MessageContentType} from '@copor/vu_meet/domain/VuMeet/Core/enum/MessageContentType';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {
    LogCreateMessage,
    LogDataForCreateMessage
} from '@copor/vu_meet/domain/VuMeet/Message/logger/LogCreateMessage';

describe('log create private message tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateMessage>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateMessage = {
		id: 'id',
		type: MessageContentType.TEXT,
		chat: 'chat'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForCreateMessage> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createMessage',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogCreateMessage = new LogCreateMessage(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
