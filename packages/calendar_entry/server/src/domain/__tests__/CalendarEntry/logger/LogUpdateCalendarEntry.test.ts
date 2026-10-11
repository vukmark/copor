import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogDataForUpdateCalendarEntry,
	LogUpdateCalendarEntry
} from '@copor/calendar_entry/domain/CalendarEntry/logger/LogUpdateCalendarEntry';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';

describe('Log update CalendarEntry tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateCalendarEntry>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdateCalendarEntry = {
		id: 'id',
		userId: 'sid',
		type: CalendarEntryType.HOLIDAYS,
		startDate: new Date(),
		endDate: new Date()
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForUpdateCalendarEntry> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateCalendarEntry',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger = new LogUpdateCalendarEntry(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
