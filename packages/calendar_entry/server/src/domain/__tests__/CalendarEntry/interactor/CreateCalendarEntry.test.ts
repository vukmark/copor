import {CreateCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/interactor/CreateCalendarEntry';
import {SaveCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/SaveCalendarEntryRepo';
import {SaveCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/SaveCalendarEntryDTO';
import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';

describe('Create CalendarEntry tests', () => {
	const mockRepo: jest.Mocked<SaveCalendarEntryRepo> = {
		save: jest.fn()
	};
	const input: SaveCalendarEntryDTO = {
		id: 'unique-id',
		userId: 'sid',
		type: CalendarEntryType.TRAVEL,
		startDate: new Date(2026, 7, 8),
		endDate: new Date(2026, 7, 30),
		description: 'description',
		actorId: 'actorId'
	};
	const createCalendarEntry = new CreateCalendarEntry(input, mockRepo);

	it('Should save a CalendarEntry and return its id', async () => {
		const result = await createCalendarEntry.execute();

		expect(result).toBe('unique-id');
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});
