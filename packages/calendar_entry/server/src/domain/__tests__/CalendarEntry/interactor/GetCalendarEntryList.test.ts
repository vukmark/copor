import {GetCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/GetCalendarEntryDTO';
import {GetCalendarEntryList} from '@copor/calendar_entry/domain/CalendarEntry/interactor/GetCalendarEntryList';
import {GetCalendarEntryListRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/GetCalendarEntryListRepo';
import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';

describe('Get list of calendar entries', () => {
	const mockRepo: jest.Mocked<GetCalendarEntryListRepo> = {
		list: jest.fn()
	};
	const expectedResponse: GetCalendarEntryDTO[] = [{
		id: 'unique-id',
		userId: 'user-id',
		type: CalendarEntryType.TRAVEL,
		startDate: new Date(2026, 7, 8),
		endDate: new Date(2026, 7, 30),
		description: null,
		createdBy: 'creatorId',
		createdAt: new Date(),
		modifiedBy: '',
		modifiedAt: new Date(),
		creatorFirstName: 'creatorFirstName',
		creatorLastName: 'creatorLastName'
	}];
	const getCalendarEntryList: GetCalendarEntryList = new GetCalendarEntryList('user-id', mockRepo);

	it('Should list all calendar entries', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getCalendarEntryList.execute()).toEqual(expectedResponse);
	});
});
