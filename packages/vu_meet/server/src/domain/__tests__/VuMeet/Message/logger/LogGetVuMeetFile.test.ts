import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForGetVuMeetFile, LogGetVuMeetFile} from '@copor/vu_meet/domain/VuMeet/Message/logger/LogGetVuMeetFile';

describe('Log get VuMeetFile', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetVuMeetFile>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetVuMeetFile = {
		messageId: 'mid'
	};
	const expectedLogForSave: LogForSave<LogDataForGetVuMeetFile> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getVuMeetFile',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get VuMeetFile', async () => {
		const logger = new LogGetVuMeetFile(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
