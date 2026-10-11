import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogCreateChecklistItem, LogDataForCreateChecklistItem} from '@copor/checklist/domain/ChecklistItem/logger/LogCreateChecklistItem';

describe('log create checklist item', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateChecklistItem>> = {
		save: jest.fn()
	};

	const logData: LogDataForCreateChecklistItem = {
		id: 'unique-id',
		checklistId: 'checklistId',
		description: 'checklist-item',
		isChecked: true
	};

	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForCreateChecklistItem> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createChecklistItem',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should successfully log action', async () => {
		const logger: LogCreateChecklistItem = new LogCreateChecklistItem(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});