import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForUpdateChecklistItem, LogUpdateChecklistItem} from '@copor/checklist/domain/ChecklistItem/logger/LogUpdateChecklistItem';

describe('Log checklist item edit', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateChecklistItem>> = {
		save: jest.fn()
	};

	const logData: LogDataForUpdateChecklistItem = {
		id: 'unique-id',
		description: 'some desc',
		checklistId: 'checklistId',
		isChecked: true
	};

	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForUpdateChecklistItem> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'editChecklistItem',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log edit checklist item', async () => {
		const logger: LogUpdateChecklistItem = new LogUpdateChecklistItem(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});