import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {
	LogDataForGetMessageList,
	LogGetMessageList
} from '@copor/vu_meet/domain/VuMeet/Message/logger/LogGetMessageList';

describe('log get private message list tests', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetMessageList>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetMessageList = {chatId: 'chat-Id'};
	const expectedLogForSave: LogForSave<LogDataForGetMessageList> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getMessageList',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get activity type', async () => {
		const logger = new LogGetMessageList(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
