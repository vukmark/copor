import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForGetChecklist, LogGetChecklist} from '@copor/checklist/domain/Checklist/logger/LogGetChecklist';

describe('Log get checklist', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetChecklist>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetChecklist = {checklistId: 'checklistId'};
	const expectedLogForSave: LogForSave<LogDataForGetChecklist> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getChecklist',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get state', async () => {
		const logger = new LogGetChecklist(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});