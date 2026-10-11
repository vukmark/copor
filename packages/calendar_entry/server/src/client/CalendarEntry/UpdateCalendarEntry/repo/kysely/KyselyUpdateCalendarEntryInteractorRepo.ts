import {db} from '@copor/core/client/AppDataSource';
import {TimeTransformer} from '@copor/core/domain/Core/Date/TimeTransformer';
import {UpdateCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/UpdateCalendarEntryRepo';
import {SaveCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/SaveCalendarEntryDTO';

export class KyselyUpdateCalendarEntryInteractorRepo
	extends TimeTransformer implements UpdateCalendarEntryRepo {
	async save(saveDTO: SaveCalendarEntryDTO): Promise<void> {
		await db
			.updateTable('calendarEntry')
			.set({
				userId: saveDTO.userId,
				type: saveDTO.type,
				startDate: this.toUtc(saveDTO.startDate),
				endDate: this.toUtc(saveDTO.endDate),
				description: saveDTO.description,
				modifiedBy: saveDTO.actorId,
				modifiedAt: new Date()
			})
			.where('id', '=', saveDTO.id)
			.execute();
	}
}
