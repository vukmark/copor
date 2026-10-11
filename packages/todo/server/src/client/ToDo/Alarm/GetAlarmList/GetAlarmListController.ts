import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetAlarmViewModel} from '../GetAlarm/GetAlarmViewModel';
import {GetAlarmListInteractorRepoPicker} from './repo/repoPicker/GetAlarmListInteractorRepoPicker';
import {GetAlarmListLoggerRepoPicker} from './repo/repoPicker/GetAlarmListLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/GetAlarmDTO';
import {ValidateGetAlarmList} from '@copor/todo/domain/ToDo/Alarm/validations/ValidateGetAlarmList';
import {GetAlarmList} from '@copor/todo/domain/ToDo/Alarm/interactor/GetAlarmList';
import {LogGetAlarmList} from '@copor/todo/domain/ToDo/Alarm/logger/LogGetAlarmList';

export class GetAlarmListController extends BaseController<void, GetAlarmViewModel[]> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetAlarmDTO[]>,
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
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetAlarmList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetAlarmListInteractorRepoPicker);

		return container.getInteractor(GetAlarmList, interactorRepo, {filters: []});
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetAlarmListLoggerRepoPicker);

		return container.getLogger(LogGetAlarmList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
