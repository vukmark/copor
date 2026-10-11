import {db} from '@copor/core/client/AppDataSource';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';
import {TimeTransformer} from '@copor/core/domain/Core/Date/TimeTransformer';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/GetCalendarEntryDTO';

export class KyselyGetCalendarEntryInteractorRepo
	extends TimeTransformer implements GetItem<GetCalendarEntryDTO> {
	private appContext: AppContext;

	constructor(appContext: AppContext) {
		super();
		this.appContext = appContext;
	}

	async load(id: string): Promise<GetCalendarEntryDTO> {
		const result = await db
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
			.where('id', '=', id)
			.executeTakeFirst();

		if (!result) {
			throw new Error(`Calendar entry with id ${id} not found`);
		}

		const creatorData = await UserKyselyHelper.getUserData(result.createdBy, this.appContext);

		return {
			... result,
			startDate: this.fromUtc(result.startDate),
			endDate: this.fromUtc(result.endDate),
			creatorFirstName: creatorData?.userFirstName ?? '',
			creatorLastName: creatorData?.userLastName ?? ''
		};
	}
}
