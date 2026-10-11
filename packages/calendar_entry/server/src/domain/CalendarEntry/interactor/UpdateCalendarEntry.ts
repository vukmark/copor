import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {UpdateCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/UpdateCalendarEntryRepo';
import {SaveCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/SaveCalendarEntryDTO';

export class UpdateCalendarEntry
	extends ExecuteUseCase<SaveCalendarEntryDTO, UpdateCalendarEntryRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}
