import {ListBaseController} from '@copor/core/client/Core/Controller/ListBaseController';
import {Presenter} from '@copor/core/client/Interface/Presenter';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {GetCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/GetCalendarEntryDTO';
import {GetCalendarEntryList} from '@copor/calendar_entry/domain/CalendarEntry/interactor/GetCalendarEntryList';
import {
	ValidateGetCalendarEntryList,
	ValidateGetCalendarEntryListDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/ValidateGetCalendarEntryList';
import {LogGetCalendarEntryList} from '@copor/calendar_entry/domain/CalendarEntry/logger/LogGetCalendarEntryList';
import {GetCalendarEntryViewModel} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntry/GetCalendarEntryViewModel';
import {
	GetCalendarEntryListPresenter
} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntryList/GetCalendarEntryListPresenter';
import {
	GetCalendarEntryListValidatorPermissionRepoPicker
} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntryList/repo/repoPicker/GetCalendarEntryListValidatorPermissionRepoPicker';
import {
	GetCalendarEntryListInteractorRepoPicker
} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntryList/repo/repoPicker/GetCalendarEntryListInteractorRepoPicker';
import {
	GetCalendarEntryListLoggerRepoPicker
} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntryList/repo/repoPicker/GetCalendarEntryListLoggerRepoPicker';

interface GetCalendarEntryListParams {
	userId: string;
}

export class GetCalendarEntryListController
	extends ListBaseController<void, GetCalendarEntryDTO[], GetCalendarEntryViewModel[]> {
	protected getPresenter(response: GetCalendarEntryDTO[]): Presenter<GetCalendarEntryViewModel[]> {
		return this.container.getPresenter(GetCalendarEntryListPresenter, response);
	}

	protected getValidator(): Validator {
		const container = this.container;
		const validatorInput: ValidateGetCalendarEntryListDTO = {
			actorId: this.actorId,
			userId: this.getUserId()
		};

		return container.getValidator(
			ValidateGetCalendarEntryList,
			validatorInput,
			container.getNewRepoPicker(GetCalendarEntryListValidatorPermissionRepoPicker),
			undefined
		);
	}

	protected getInteractor() {
		const container = this.container;

		return container.getInteractor(
			GetCalendarEntryList,
			container.getNewRepoPicker(GetCalendarEntryListInteractorRepoPicker),
			this.getUserId()
		);
	}

	protected getLogger() {
		const container = this.container;

		return container.getLogger(
			LogGetCalendarEntryList,
			container.getNewRepoPicker(GetCalendarEntryListLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			undefined
		);
	}

	private getUserId(): string {
		return (this.request.params as GetCalendarEntryListParams).userId;
	}
}
