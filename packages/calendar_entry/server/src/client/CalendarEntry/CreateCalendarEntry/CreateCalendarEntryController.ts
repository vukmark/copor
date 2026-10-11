import {CreateBaseController} from '@copor/core/client/Core/Controller/CreateBaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {stringToDateTime} from '@copor/core/client/Core/Helpers/DateTransformer';
import {
	CreateCalendarEntryReqBodyDTO
} from '@copor/calendar_entry/client/CalendarEntry/CreateCalendarEntry/dto/CreateCalendarEntryReqBodyDTO';
import {
	CreateCalendarEntryValidatorPermissionRepoPicker
} from '@copor/calendar_entry/client/CalendarEntry/CreateCalendarEntry/repo/repoPicker/CreateCalendarEntryValidatorPermissionRepoPicker';
import {
	CreateCalendarEntryValidatorStorageRepoPicker
} from '@copor/calendar_entry/client/CalendarEntry/CreateCalendarEntry/repo/repoPicker/CreateCalendarEntryValidatorStorageRepoPicker';
import {
	CreateCalendarEntryInteractorRepoPicker
} from '@copor/calendar_entry/client/CalendarEntry/CreateCalendarEntry/repo/repoPicker/CreateCalendarEntryInteractorRepoPicker';
import {
	CreateCalendarEntryLoggerRepoPicker
} from '@copor/calendar_entry/client/CalendarEntry/CreateCalendarEntry/repo/repoPicker/CreateCalendarEntryLoggerRepoPicker';
import {ValidateCreateCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/validation/ValidateCreateCalendarEntry';
import {
	ValidateCreateCalendarEntryDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/dto/ValidateCreateCalendarEntryDTO';
import {CreateCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/interactor/CreateCalendarEntry';
import {SaveCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/SaveCalendarEntryDTO';
import {
	LogCreateCalendarEntry,
	LogDataForCreateCalendarEntry
} from '@copor/calendar_entry/domain/CalendarEntry/logger/LogCreateCalendarEntry';

export class CreateCalendarEntryController extends CreateBaseController<CreateCalendarEntryReqBodyDTO> {
	protected getValidator(): Validator {
		const container = this.container;
		const validatorInput: ValidateCreateCalendarEntryDTO = {
			actorId: this.actorId,
			userId: this.request.body.userId,
			type: this.request.body.type,
			startDate: stringToDateTime(this.request.body.startDate),
			endDate: stringToDateTime(this.request.body.endDate)
		};

		return container.getValidator(
			ValidateCreateCalendarEntry,
			validatorInput,
			container.getNewRepoPicker(CreateCalendarEntryValidatorPermissionRepoPicker),
			container.getNewRepoPicker(CreateCalendarEntryValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(uniqueId: string): UseCase<string> {
		const container = this.container;
		const input: SaveCalendarEntryDTO = {
			id: uniqueId,
			actorId: this.actorId,
			userId: this.request.body.userId,
			type: this.request.body.type,
			startDate: stringToDateTime(this.request.body.startDate),
			endDate: stringToDateTime(this.request.body.endDate),
			description: this.request.body.description ?? null
		};

		return container.getInteractor(
			CreateCalendarEntry,
			container.getNewRepoPicker(CreateCalendarEntryInteractorRepoPicker),
			input
		);
	}

	protected getLogger(uniqueId: string): LogAction {
		const container = this.container;
		const logData: LogDataForCreateCalendarEntry = {
			id: uniqueId,
			userId: this.request.body.userId,
			type: this.request.body.type,
			startDate: stringToDateTime(this.request.body.startDate),
			endDate: stringToDateTime(this.request.body.endDate)
		};

		return container.getLogger(
			LogCreateCalendarEntry,
			container.getNewRepoPicker(CreateCalendarEntryLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			logData
		);
	}
}
