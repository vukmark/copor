import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetCalendarEntryListRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/GetCalendarEntryListRepo';
import {GetCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/GetCalendarEntryDTO';

export class GetCalendarEntryList
	extends ExecuteUseCase<string, GetCalendarEntryListRepo, GetCalendarEntryDTO[]> {
	public execute(): Promise<GetCalendarEntryDTO[]> {
		return this.repository.list(this.input);
	}
}
