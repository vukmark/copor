import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {stringToDateTime} from '@copor/core/client/Core/Helpers/DateTransformer';
import {
	UpdateCalendarEntryReqBodyDTO
} from '@copor/calendar_entry/client/CalendarEntry/UpdateCalendarEntry/dto/UpdateCalendarEntryReqBodyDTO';
import {
	UpdateCalendarEntryValidatorPermissionRepoPicker
} from '@copor/calendar_entry/client/CalendarEntry/UpdateCalendarEntry/repo/repoPicker/UpdateCalendarEntryValidatorPermissionRepoPicker';
import {
	UpdateCalendarEntryValidatorStorageRepoPicker
} from '@copor/calendar_entry/client/CalendarEntry/UpdateCalendarEntry/repo/repoPicker/UpdateCalendarEntryValidatorStorageRepoPicker';
import {
	UpdateCalendarEntryInteractorRepoPicker
} from '@copor/calendar_entry/client/CalendarEntry/UpdateCalendarEntry/repo/repoPicker/UpdateCalendarEntryInteractorRepoPicker';
import {
	UpdateCalendarEntryLoggerRepoPicker
} from '@copor/calendar_entry/client/CalendarEntry/UpdateCalendarEntry/repo/repoPicker/UpdateCalendarEntryLoggerRepoPicker';
import {ValidateUpdateCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/validation/ValidateUpdateCalendarEntry';
import {
	ValidateUpdateCalendarEntryDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/dto/ValidateUpdateCalendarEntryDTO';
import {UpdateCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/interactor/UpdateCalendarEntry';
import {SaveCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/SaveCalendarEntryDTO';
import {
	LogDataForUpdateCalendarEntry,
	LogUpdateCalendarEntry
} from '@copor/calendar_entry/domain/CalendarEntry/logger/LogUpdateCalendarEntry';

export class UpdateCalendarEntryController extends BaseController<UpdateCalendarEntryReqBodyDTO, void> {
	async getResponse() {
		const factory = this.container.getFactory(
			RunFactory<void>,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		this.response.status(200);
		this.response.send(response);
	}

	private getValidator(): Validator {
		const container = this.container;
		const validatorInput: ValidateUpdateCalendarEntryDTO = {
			id: this.request.body.id,
			actorId: this.actorId,
			userId: this.request.body.userId,
			type: this.request.body.type,
			startDate: stringToDateTime(this.request.body.startDate),
			endDate: stringToDateTime(this.request.body.endDate)
		};

		return container.getValidator(
			ValidateUpdateCalendarEntry,
			validatorInput,
			container.getNewRepoPicker(UpdateCalendarEntryValidatorPermissionRepoPicker),
			container.getNewRepoPicker(UpdateCalendarEntryValidatorStorageRepoPicker)
		);
	}

	private getInteractor() {
		const container = this.container;
		const input: SaveCalendarEntryDTO = {
			id: this.request.body.id,
			actorId: this.actorId,
			userId: this.request.body.userId,
			type: this.request.body.type,
			startDate: stringToDateTime(this.request.body.startDate),
			endDate: stringToDateTime(this.request.body.endDate),
			description: this.request.body.description ?? null
		};

		return container.getInteractor(
			UpdateCalendarEntry,
			container.getNewRepoPicker(UpdateCalendarEntryInteractorRepoPicker),
			input
		);
	}

	private getLogger() {
		const container = this.container;
		const logData: LogDataForUpdateCalendarEntry = {
			id: this.request.body.id,
			userId: this.request.body.userId,
			type: this.request.body.type,
			startDate: stringToDateTime(this.request.body.startDate),
			endDate: stringToDateTime(this.request.body.endDate)
		};

		return container.getLogger(
			LogUpdateCalendarEntry,
			container.getNewRepoPicker(UpdateCalendarEntryLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			logData
		);
	}
}
