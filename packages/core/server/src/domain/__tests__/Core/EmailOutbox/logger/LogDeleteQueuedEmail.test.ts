import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDataForDeleteQueuedEmail, LogDeleteQueuedEmail} from '@copor/core/domain/Core/EmailOutbox/logger/LogDeleteQueuedEmail';

describe('Log deletion of an email', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteQueuedEmail>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForDeleteQueuedEmail = {emailId: 'deletedEmailId'};
	const expectedLogForSave: LogForSave<LogDataForDeleteQueuedEmail> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteQueuedEmail',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log deletion of an email', async () => {
		const logger = new LogDeleteQueuedEmail(repo, logDetails, logData);

		await logger.log();
		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});