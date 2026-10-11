import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForDeleteChecklist, LogDeleteChecklist} from '@copor/checklist/domain/Checklist/logger/LogDeleteChecklist';

describe('Log deleting checklist', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteChecklist>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'user_id';
	const logData: LogDataForDeleteChecklist = {deleteChecklistId: 'deleted_checklist_id'};
	const expectedLogForSave: LogForSave<LogDataForDeleteChecklist> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteChecklist',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log deletion', async () => {
		const logger = new LogDeleteChecklist(repo, logDetails, logData);

		await logger.log();
		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});