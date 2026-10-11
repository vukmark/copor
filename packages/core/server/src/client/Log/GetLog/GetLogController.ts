import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetLogViewModel} from './GetLogViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetLogValidatorStorageRepoPicker} from './repo/repoPicker/GetLogValidatorStorageRepoPicker';
import {GetLogInteractorRepoPicker} from './repo/repoPicker/GetLogInteractorRepoPicker';
import {GetLogLoggerRepoPicker} from './repo/repoPicker/GetLogLoggerRepoPicker';
import {GetLogPresenter} from './GetLogPresenter';
import {ValidateGetLog} from '@copor/core/domain/Log/validation/ValidateGetLog';
import {LogGetLog} from '@copor/core/domain/Log/logger/LogGetLog';
import {GetLogDTO} from '@copor/core/domain/Log/interactor/dto/GetLogDTO';
import {ValidateGetLogDTO} from '@copor/core/domain/Log/validation/dto/ValidateGetLogDTO';
import {GetLog} from '@copor/core/domain/Log/interactor/GetLog';

export interface GetTagParams {
	id: string;
}

export class GetLogController extends BaseController<undefined, GetLogViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetTagParams;
		const id: string = params.id;
		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<GetLogDTO>,
			this.getValidator(actorId, id),
			this.getInteractor(id),
			this.getLogger(actorId, id)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetLogPresenter, response);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}

	private getValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetLogDTO = {
			actorId: this.actorId,
			logId: id
		};

		return c.getValidator(
			ValidateGetLog,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetLogValidatorStorageRepoPicker)
		);
	}

	private getLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetLogLoggerRepoPicker);
		const logData = {
			log: id
		};

		return this.container.getLogger(
			LogGetLog,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetLogInteractorRepoPicker);

		return this.container.getInteractor(
			GetLog,
			interactorRepository,
			id
		);
	}
}
