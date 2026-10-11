import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/GetCalendarEntryDTO';
import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';

export class FakeGetCalendarEntryInteractorRepo implements GetItem<GetCalendarEntryDTO> {
	load(id: string): Promise<GetCalendarEntryDTO> {
		return Promise.resolve({
			id: id,
			userId: '',
			type: CalendarEntryType.TRAVEL,
			startDate: new Date(),
			endDate: new Date(),
			description: null,
			createdBy: '',
			createdAt: new Date(),
			modifiedBy: '',
			modifiedAt: new Date(),
			creatorFirstName: '',
			creatorLastName: ''
		});
	}
}
