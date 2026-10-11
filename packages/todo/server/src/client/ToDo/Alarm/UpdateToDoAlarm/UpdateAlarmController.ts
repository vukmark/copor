import {UpdateAlarmReqBodyDTO} from './dto/UpdateAlarmReqBodyDTO';
import {UpdateAlarmValidatorStorageRepoPicker} from './repo/repoPicker/UpdateAlarmValidatorStorageRepoPicker';
import {UpdateAlarmInteractorRepoPicker} from './repo/repoPicker/UpdateAlarmInteractorRepoPicker';
import {UpdateAlarmLoggerRepoPicker} from './repo/repoPicker/UpdateAlarmLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateUpdateAlarm} from '@copor/todo/domain/ToDo/Alarm/validations/ValidateUpdateAlarm';
import {UpdateAlarm} from '@copor/todo/domain/ToDo/Alarm/interactor/UpdateAlarm';
import {LogDataForUpdateAlarm, LogUpdateAlarm} from '@copor/todo/domain/ToDo/Alarm/logger/LogUpdateAlarm';
import {SaveAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';

export class UpdateAlarmController extends UpdateBaseController<UpdateAlarmReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateAlarmValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateAlarm,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdateAlarm,
			this.container.getNewRepoPicker(UpdateAlarmInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateAlarmLoggerRepoPicker);
		const logData: LogDataForUpdateAlarm = {
			... this.request.body
		};

		return this.container.getLogger(
			LogUpdateAlarm,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SaveAlarmDTO {
		return {
			... this.request.body,
			actorId: this.actorId
		};
	}
}
