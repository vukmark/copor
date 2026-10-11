import {CreateAlarmReqBodyDTO} from '@copor/todo/client/ToDo/Alarm/CreateAlarm/dto/CreateAlarmReqBodyDTO';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	CreateAlarmValidatorStorageRepoPicker
} from '@copor/todo/client/ToDo/Alarm/CreateAlarm/repo/repoPicker/CreateAlarmValidatorStorageRepoPicker';
import {
	CreateAlarmInteractorRepoPicker
} from '@copor/todo/client/ToDo/Alarm/CreateAlarm/repo/repoPicker/CreateAlarmInteractorRepoPicker';
import {CreateAlarmLoggerRepoPicker} from '@copor/todo/client/ToDo/Alarm/CreateAlarm/repo/repoPicker/CreateAlarmLoggerRepoPicker';
import {SaveAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';
import {ValidateCreateAlarm} from '@copor/todo/domain/ToDo/Alarm/validations/ValidateCreateAlarm';
import {ValidateCreateAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/validations/dto/ValidateCreateAlarmDTO';
import {CreateAlarm} from '@copor/todo/domain/ToDo/Alarm/interactor/CreateAlarm';
import {LogCreateAlarm, LogDataForCreateAlarm} from '@copor/todo/domain/ToDo/Alarm/logger/LogCreateAlarm';
import {CreateBaseController} from '@copor/core/client/Core/Controller/CreateBaseController';


export class CreateAlarmController extends CreateBaseController<CreateAlarmReqBodyDTO> {
	protected getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(CreateAlarmValidatorStorageRepoPicker);
		const validatorInput: ValidateCreateAlarmDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreateAlarm,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor(uniqueId: string) : UseCase<string> {
		const container = this.container;
		const interactorInput: SaveAlarmDTO = {
			... this.request.body,
			actorId: this.actorId,
			id: uniqueId
		};
		const interactorRepo = container.getNewRepoPicker(CreateAlarmInteractorRepoPicker);

		return container.getInteractor(
			CreateAlarm,
			interactorRepo,
			interactorInput
		);
	}

	protected getLogger(uniqueId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateAlarmLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateAlarm,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(uniqueId: string): LogDataForCreateAlarm {
		return {
			... this.request.body,
			id: uniqueId
		};
	}
}
