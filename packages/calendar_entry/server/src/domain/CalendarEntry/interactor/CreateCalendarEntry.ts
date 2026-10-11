import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/SaveCalendarEntryRepo';
import {SaveCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/SaveCalendarEntryDTO';

export class CreateCalendarEntry
	extends ExecuteUseCase<SaveCalendarEntryDTO, SaveCalendarEntryRepo, string> {
	public async execute(): Promise<string> {
		await this.repository.save(this.input);

		return this.input.id;
	}
}
