import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/GetCalendarEntryDTO';
import {GetCalendarEntryViewModel} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntry/GetCalendarEntryViewModel';

export class GetCalendarEntryListPresenter
	extends PresenterInstance<GetCalendarEntryDTO[], GetCalendarEntryViewModel[]> {
	public present(): GetCalendarEntryViewModel[] {
		return this.input.map((dto) => ({
			id: dto.id,
			userId: dto.userId,
			type: dto.type,
			startDate: this.dateTimeToString(dto.startDate),
			endDate: this.dateTimeToString(dto.endDate),
			description: dto.description,
			createdBy: dto.createdBy,
			createdAt: dto.createdAt,
			modifiedBy: dto.modifiedBy,
			modifiedAt: dto.modifiedAt,
			creatorName: dto.creatorFirstName + ' ' + dto.creatorLastName
		}));
	}
}
