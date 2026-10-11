import {UpdateCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/interactor/UpdateCalendarEntry';
import {UpdateCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/UpdateCalendarEntryRepo';
import {SaveCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/SaveCalendarEntryDTO';
import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';

describe('Update CalendarEntry tests', () => {
	const mockRepo: jest.Mocked<UpdateCalendarEntryRepo> = {
		save: jest.fn()
	};
	const input: SaveCalendarEntryDTO = {
		id: 'unique-id',
		userId: 'sid',
		type: CalendarEntryType.HOLIDAYS,
		startDate: new Date(2026, 7, 8),
		endDate: new Date(2026, 7, 30),
		description: null,
		actorId: 'actorId'
	};
	const updateCalendarEntry = new UpdateCalendarEntry(input, mockRepo);

	it('Should update a CalendarEntry', async () => {
		await updateCalendarEntry.execute();

		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});
