import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/GetCalendarEntryDTO';
import {GetCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/interactor/GetCalendarEntry';
import {ValidateGetCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/validation/ValidateGetCalendarEntry';
import {
	ValidateGetCalendarEntryDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/dto/ValidateGetCalendarEntryDTO';
import {LogGetCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/logger/LogGetCalendarEntry';
import {GetCalendarEntryViewModel} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntry/GetCalendarEntryViewModel';
import {GetCalendarEntryPresenter} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntry/GetCalendarEntryPresenter';
import {
	GetCalendarEntryValidatorPermissionRepoPicker
} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntry/repo/repoPicker/GetCalendarEntryValidatorPermissionRepoPicker';
import {
	GetCalendarEntryValidatorStorageRepoPicker
} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntry/repo/repoPicker/GetCalendarEntryValidatorStorageRepoPicker';
import {
	GetCalendarEntryInteractorRepoPicker
} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntry/repo/repoPicker/GetCalendarEntryInteractorRepoPicker';
import {
	GetCalendarEntryLoggerRepoPicker
} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntry/repo/repoPicker/GetCalendarEntryLoggerRepoPicker';

export interface GetCalendarEntryParams {
	id: string;
}

export class GetCalendarEntryController extends BaseController<undefined, GetCalendarEntryViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetCalendarEntryParams;
		const id: string = params.id;

		const factory = this.container.getFactory(
			RunFactory<GetCalendarEntryDTO>,
			this.getValidator(id),
			this.getInteractor(id),
			this.getLogger(id)
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		const presenter = this.container.getPresenter(GetCalendarEntryPresenter, response);

		this.response.status(200);
		this.response.send(presenter.present());
	}

	private getValidator(id: string) {
		const container = this.container;
		const validatorInput: ValidateGetCalendarEntryDTO = {
			actorId: this.actorId,
			calendarEntryId: id
		};

		return container.getValidator(
			ValidateGetCalendarEntry,
			validatorInput,
			container.getNewRepoPicker(GetCalendarEntryValidatorPermissionRepoPicker),
			container.getNewRepoPicker(GetCalendarEntryValidatorStorageRepoPicker)
		);
	}

	private getInteractor(id: string) {
		const container = this.container;

		return container.getInteractor(
			GetCalendarEntry,
			container.getNewRepoPicker(GetCalendarEntryInteractorRepoPicker),
			id
		);
	}

	private getLogger(id: string) {
		const container = this.container;

		return container.getLogger(
			LogGetCalendarEntry,
			container.getNewRepoPicker(GetCalendarEntryLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{id: id}
		);
	}
}
