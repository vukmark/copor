import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/GetCalendarEntryDTO';
import {GetCalendarEntryViewModel} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntry/GetCalendarEntryViewModel';

export class GetCalendarEntryPresenter
	extends PresenterInstance<GetCalendarEntryDTO, GetCalendarEntryViewModel> {
	public present(): GetCalendarEntryViewModel {
		return {
			id: this.input.id,
			userId: this.input.userId,
			type: this.input.type,
			startDate: this.dateTimeToString(this.input.startDate),
			endDate: this.dateTimeToString(this.input.endDate),
			description: this.input.description,
			createdBy: this.input.createdBy,
			createdAt: this.input.createdAt,
			modifiedBy: this.input.modifiedBy,
			modifiedAt: this.input.modifiedAt,
			creatorName: this.input.creatorFirstName + ' ' + this.input.creatorLastName
		};
	}
}
