import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetAlarmViewModel} from './GetAlarmViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetAlarmValidatorStorageRepoPicker} from './repo/repoPicker/GetAlarmValidatorStorageRepoPicker';
import {GetAlarmInteractorRepoPicker} from './repo/repoPicker/GetAlarmInteractorRepoPicker';
import {GetAlarmLoggerRepoPicker} from './repo/repoPicker/GetAlarmLoggerRepoPicker';
import {GetAlarmPresenter} from './GetAlarmPresenter';
import {GetAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/GetAlarmDTO';
import {ValidateGetAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/validations/dto/ValidateGetAlarmDTO';
import {ValidateGetAlarm} from '@copor/todo/domain/ToDo/Alarm/validations/ValidateGetAlarm';
import {LogGetAlarm} from '@copor/todo/domain/ToDo/Alarm/logger/LogGetAlarm';
import {GetAlarm} from '@copor/todo/domain/ToDo/Alarm/interactor/GetAlarm';

export interface GetAlarmParams {
	id: string;
}

export class GetAlarmController extends BaseController<undefined, GetAlarmViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetAlarmParams;
		const id: string = params.id;
		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<GetAlarmDTO>,
			this.getValidator(actorId, id),
			this.getInteractor(id),
			this.getLogger(actorId, id)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetAlarmPresenter, response);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}

	private getValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetAlarmDTO = {actorId, alarmId: id};

		return c.getValidator(
			ValidateGetAlarm,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetAlarmValidatorStorageRepoPicker)
		);
	}

	private getLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetAlarmLoggerRepoPicker);
		const logData = {
			alarmId: id
		};

		return this.container.getLogger(
			LogGetAlarm,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetAlarmInteractorRepoPicker);

		return this.container.getInteractor(
			GetAlarm,
			interactorRepository,
			id
		);
	}
}
