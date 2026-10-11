import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {
	DeleteCalendarEntryValidatorPermissionRepoPicker
} from '@copor/calendar_entry/client/CalendarEntry/DeleteCalendarEntry/repo/repoPicker/DeleteCalendarEntryValidatorPermissionRepoPicker';
import {
	DeleteCalendarEntryValidatorStorageRepoPicker
} from '@copor/calendar_entry/client/CalendarEntry/DeleteCalendarEntry/repo/repoPicker/DeleteCalendarEntryValidatorStorageRepoPicker';
import {
	DeleteCalendarEntryInteractorRepoPicker
} from '@copor/calendar_entry/client/CalendarEntry/DeleteCalendarEntry/repo/repoPicker/DeleteCalendarEntryInteractorRepoPicker';
import {
	DeleteCalendarEntryLoggerRepoPicker
} from '@copor/calendar_entry/client/CalendarEntry/DeleteCalendarEntry/repo/repoPicker/DeleteCalendarEntryLoggerRepoPicker';
import {ValidateDeleteCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/validation/ValidateDeleteCalendarEntry';
import {
	ValidateDeleteCalendarEntryDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/dto/ValidateDeleteCalendarEntryDTO';
import {DeleteCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/interactor/DeleteCalendarEntry';
import {LogDeleteCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/logger/LogDeleteCalendarEntry';

export interface DeleteCalendarEntryParams {
	id: string;
}

export class DeleteCalendarEntryController extends DeleteBaseController<DeleteCalendarEntryParams> {
	protected getValidator(id: string): Validator {
		const container = this.container;
		const input: ValidateDeleteCalendarEntryDTO = {
			id: id,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateDeleteCalendarEntry,
			input,
			container.getNewRepoPicker(DeleteCalendarEntryValidatorPermissionRepoPicker),
			container.getNewRepoPicker(DeleteCalendarEntryValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string): UseCase<void> {
		const container = this.container;

		return container.getInteractor(
			DeleteCalendarEntry,
			container.getNewRepoPicker(DeleteCalendarEntryInteractorRepoPicker),
			id
		);
	}

	protected getLogger(id: string): LogAction {
		const container = this.container;

		return container.getLogger(
			LogDeleteCalendarEntry,
			container.getNewRepoPicker(DeleteCalendarEntryLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{id: id}
		);
	}
}
