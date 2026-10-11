import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	DeleteAlarmValidatorStorageRepoPicker
} from '@copor/todo/client/ToDo/Alarm/DeleteToDoAlarm/repo/repoPicker/DeleteAlarmValidatorStorageRepoPicker';
import {
	DeleteAlarmInteractorRepoPicker
} from '@copor/todo/client/ToDo/Alarm/DeleteToDoAlarm/repo/repoPicker/DeleteAlarmInteractorRepoPicker';
import {
	DeleteAlarmLoggerRepoPicker
} from '@copor/todo/client/ToDo/Alarm/DeleteToDoAlarm/repo/repoPicker/DeleteAlarmLoggerRepoPicker';
import {ValidateDeleteAlarm} from '@copor/todo/domain/ToDo/Alarm/validations/ValidateDeleteAlarm';
import {ValidateDeleteAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/validations/dto/ValidateDeleteAlarmDTO';
import {DeleteAlarm} from '@copor/todo/domain/ToDo/Alarm/interactor/DeleteAlarm';
import {LogDeleteAlarm} from '@copor/todo/domain/ToDo/Alarm/logger/LogDeleteAlarm';
import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';

export interface DeleteAlarmParams {
	id: string;
}

export class DeleteAlarmController extends DeleteBaseController<DeleteAlarmParams> {

	protected getValidator(id: string) : Validator {
		const container = this.container;
		const input: ValidateDeleteAlarmDTO = {
			alarmId: id,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateDeleteAlarm,
			input,
			container.getNewRepoPicker(PermissionValidatorRepoPicker),
			container.getNewRepoPicker(DeleteAlarmValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string) : UseCase<void> {
		const container = this.container;
		const repo = container.getNewRepoPicker(DeleteAlarmInteractorRepoPicker);

		return container.getInteractor(DeleteAlarm, repo, id);
	}

	protected getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeleteAlarm,
			this.container.getNewRepoPicker(DeleteAlarmLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{id: id}
		);
	}
}
