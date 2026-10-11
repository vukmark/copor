import {GetCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/GetCalendarEntryDTO';
import {GetCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/interactor/GetCalendarEntry';
import {GetCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/GetCalendarEntryRepo';
import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';

describe('Get CalendarEntry tests', () => {
	const mockRepo: jest.Mocked<GetCalendarEntryRepo> = {
		load: jest.fn()
	};

	const expectedResponse: GetCalendarEntryDTO = {
		id: 'unique-id',
		userId: 'sid',
		type: CalendarEntryType.TRAVEL,
		startDate: new Date(2026, 7, 8),
		endDate: new Date(2026, 7, 30),
		description: 'description',
		createdBy: 'creatorId',
		createdAt: new Date(),
		modifiedBy: '',
		modifiedAt: new Date(),
		creatorFirstName: 'creatorFirstName',
		creatorLastName: 'creatorLastName'
	};
	const getCalendarEntry: GetCalendarEntry = new GetCalendarEntry('unique-id', mockRepo);

	it('Should return CalendarEntry based on provided id', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse);

		expect(await getCalendarEntry.execute()).toEqual(expectedResponse);
	});
});
