import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogDataForDeleteCalendarEntry,
	LogDeleteCalendarEntry
} from '@copor/calendar_entry/domain/CalendarEntry/logger/LogDeleteCalendarEntry';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';

describe('Log delete CalendarEntry tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForDeleteCalendarEntry>> = {
		save: jest.fn()
	};
	const logData: LogDataForDeleteCalendarEntry = {
		id: 'id'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForDeleteCalendarEntry> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteCalendarEntry',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger = new LogDeleteCalendarEntry(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
