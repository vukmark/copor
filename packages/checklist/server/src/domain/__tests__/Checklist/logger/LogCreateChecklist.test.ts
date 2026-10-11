import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogCreateChecklist, LogDataForCreateChecklist} from '@copor/checklist/domain/Checklist/logger/LogCreateChecklist';

describe('Test logging of creation of a new checklist', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateChecklist>> = {
		save: jest.fn()
	};

	const logData: LogDataForCreateChecklist = {
		id: 'unique-id',
		title: 'some-checklist'
	};

	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForCreateChecklist> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createChecklist',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should successfully log checklist creation', async () => {
		const logger: LogCreateChecklist = new LogCreateChecklist(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});