import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForUpdateChecklist, LogUpdateChecklist} from '@copor/checklist/domain/Checklist/logger/LogUpdateChecklist';

describe('Log checklist edit', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateChecklist>> = {
		save: jest.fn()
	};

	const logData: LogDataForUpdateChecklist = {
		id: 'unique-id',
		title: 'checklist title'
	};

	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForUpdateChecklist> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'editChecklist',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log edit checklist', async () => {
		const logger: LogUpdateChecklist = new LogUpdateChecklist(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});