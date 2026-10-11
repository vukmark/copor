import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForDeleteChecklistItem, LogDeleteChecklistItem} from '@copor/checklist/domain/ChecklistItem/logger/LogDeleteChecklistItem';

describe('Test log deletion of checklist item', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteChecklistItem>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'user-id';
	const logData: LogDataForDeleteChecklistItem = {deleteChecklistItemId: 'item-id'};
	const expectedLogForSave: LogForSave<LogDataForDeleteChecklistItem> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteChecklistItem',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log deletion', async () => {
		const logger = new LogDeleteChecklistItem(repo, logDetails, logData);

		await logger.log();
		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});