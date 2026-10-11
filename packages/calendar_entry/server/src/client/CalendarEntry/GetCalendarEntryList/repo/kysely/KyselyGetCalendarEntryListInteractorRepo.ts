import {db} from '@copor/core/client/AppDataSource';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';
import {TimeTransformer} from '@copor/core/domain/Core/Date/TimeTransformer';
import {GetCalendarEntryListRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/GetCalendarEntryListRepo';
import {GetCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/GetCalendarEntryDTO';

export class KyselyGetCalendarEntryListInteractorRepo
	extends TimeTransformer implements GetCalendarEntryListRepo {
	private appContext: AppContext;

	constructor(appContext: AppContext) {
		super();
		this.appContext = appContext;
	}

	public async list(userId: string): Promise<GetCalendarEntryDTO[]> {
		const entries = await db
			.selectFrom('calendarEntry')
			.select([
				'id',
				'userId',
				'type',
				'startDate',
				'endDate',
				'description',
				'createdBy',
				'createdAt',
				'modifiedBy',
				'modifiedAt'
			])
			.where('userId', '=', userId)
			.orderBy('startDate', 'asc')
			.execute();

		const creatorNameById = await this.getCreatorNameById(entries.map((entry) => entry.createdBy));

		return entries.map((entry) => ({
			... entry,
			startDate: this.fromUtc(entry.startDate),
			endDate: this.fromUtc(entry.endDate),
			creatorFirstName: creatorNameById.get(entry.createdBy)?.firstName ?? '',
			creatorLastName: creatorNameById.get(entry.createdBy)?.lastName ?? ''
		}));
	}

	/**
	 * Creators can hold any role, so names are resolved through the role-aware user helper rather
	 * than a join against a single role table. Resolving the distinct ids keeps this at one lookup
	 * per creator instead of one per entry.
	 */
	private async getCreatorNameById(
		creatorIdList: string[]
	): Promise<Map<string, {firstName: string; lastName: string}>> {
		const nameById = new Map<string, {firstName: string; lastName: string}>();

		await Promise.all([... new Set(creatorIdList)].map(async (creatorId) => {
			const creatorData = await UserKyselyHelper.getUserData(creatorId, this.appContext);

			nameById.set(creatorId, {
				firstName: creatorData?.userFirstName ?? '',
				lastName: creatorData?.userLastName ?? ''
			});
		}));

		return nameById;
	}
}
