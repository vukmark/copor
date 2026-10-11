import {db} from '@copor/core/client/AppDataSource';
import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';
import {DefaultTimeTransformer} from '@copor/core/domain/Core/Date/DefaultTimeTransformer';
import {
	ValidateIsCalendarEntryOverlappingDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateIsCalendarEntryOverlapping';

export class CalendarEntryKyselyHelper {
	private static readonly helper = new EntityRepoHelper('calendarEntry');

	public static async isInvalidCalendarEntry(id: string | undefined) {
		return this.helper.isInvalid(id);
	}

	/**
	 * Two closed spans overlap unless one ends strictly before the other starts. Both bounds are
	 * inclusive, so entries that merely touch (one ends on the day the next starts) still overlap.
	 */
	public static async isCalendarEntryOverlapping(
		input: ValidateIsCalendarEntryOverlappingDTO | undefined
	): Promise<boolean> {
		if (!input) {
			return true;
		}

		const transformer = new DefaultTimeTransformer();
		const startDate = transformer.toUtc(input.startDate);
		const endDate = transformer.toUtc(input.endDate);

		let query = db
			.selectFrom('calendarEntry')
			.select('id')
			.where('userId', '=', input.userId)
			.where('startDate', '<=', endDate)
			.where('endDate', '>=', startDate);

		if (input.excludedCalendarEntryId) {
			query = query.where('id', '!=', input.excludedCalendarEntryId);
		}

		return query
			.limit(1)
			.executeTakeFirst()
			.then((result) => !!result);
	}
}
