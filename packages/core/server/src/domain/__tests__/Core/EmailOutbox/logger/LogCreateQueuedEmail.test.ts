import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDataForCreateQueuedEmail, LogCreateQueuedEmail} from '@copor/core/domain/Core/EmailOutbox/logger/LogCreateQueuedEmail';

describe('log queue email country tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateQueuedEmail>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateQueuedEmail = {
		id: 'unique-id',
		type: 'unique-id',
		receiver: 'Serbia',
		subject: 'RS'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForCreateQueuedEmail> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createQueuedEmail',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should successfully log action', async () => {
		const logger: LogCreateQueuedEmail = new LogCreateQueuedEmail(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
