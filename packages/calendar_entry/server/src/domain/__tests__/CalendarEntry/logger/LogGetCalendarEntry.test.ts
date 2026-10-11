import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {
	LogDataForGetCalendarEntry,
	LogGetCalendarEntry
} from '@copor/calendar_entry/domain/CalendarEntry/logger/LogGetCalendarEntry';

describe('Log get CalendarEntry', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetCalendarEntry>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetCalendarEntry = {
		id: 'id'
	};
	const expectedLogForSave: LogForSave<LogDataForGetCalendarEntry> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getCalendarEntry',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get CalendarEntry', async () => {
		const logger = new LogGetCalendarEntry(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
