import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForGetChatInfo, LogGetChatInfo} from '@copor/vu_meet/domain/VuMeet/Chat/logger/LogGetChatInfo';

describe('Log get ChatInfo', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetChatInfo>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetChatInfo = {
		chatId: 'cid'
	};
	const expectedLogForSave: LogForSave<LogDataForGetChatInfo> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getChatInfo',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get ChatInfo', async () => {
		const logger = new LogGetChatInfo(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
