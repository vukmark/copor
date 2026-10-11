import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogCreateCalendarEntry,
	LogDataForCreateCalendarEntry
} from '@copor/calendar_entry/domain/CalendarEntry/logger/LogCreateCalendarEntry';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';

describe('Log create CalendarEntry tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateCalendarEntry>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateCalendarEntry = {
		id: 'id',
		userId: 'sid',
		type: CalendarEntryType.TRAVEL,
		startDate: new Date(),
		endDate: new Date()
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForCreateCalendarEntry> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createCalendarEntry',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger = new LogCreateCalendarEntry(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
