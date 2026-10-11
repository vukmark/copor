import {db} from '@copor/core/client/AppDataSource';
import {TimeTransformer} from '@copor/core/domain/Core/Date/TimeTransformer';
import {SaveCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/SaveCalendarEntryRepo';
import {SaveCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/SaveCalendarEntryDTO';
import {TimestampHelper} from "@copor/core/client/Core/Helpers/TimestampHelper";

export class KyselyCreateCalendarEntryInteractorRepo
	extends TimeTransformer implements SaveCalendarEntryRepo {
	async save(saveDTO: SaveCalendarEntryDTO): Promise<void> {
		await db
			.insertInto('calendarEntry')
			.values({
				id: saveDTO.id,
				userId: saveDTO.userId,
				type: saveDTO.type,
				startDate: this.toUtc(new Date(saveDTO.startDate)),
				endDate: this.toUtc(new Date(saveDTO.endDate)),
				description: saveDTO.description,
				... TimestampHelper.getTimestampForCreate(saveDTO.actorId)
			})
			.execute();
	}
}
