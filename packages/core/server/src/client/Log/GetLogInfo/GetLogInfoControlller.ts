import {BaseController} from '@copor/core/client/Core/BaseController';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {GetInfoViewModel} from '@copor/core/client/Core/Info/GetInfoViewModel';
import {GetLogDTO} from '@copor/core/domain/Log/interactor/dto/GetLogDTO';
import {GetLogInfoPresenter} from '@copor/core/client/Log/GetLogInfo/GetLogInfoPresenter';
import {ValidateGetLogDTO} from '@copor/core/domain/Log/validation/dto/ValidateGetLogDTO';
import {LogGetLog} from '@copor/core/domain/Log/logger/LogGetLog';
import {GetLogValidatorStorageRepoPicker} from '@copor/core/client/Log/GetLog/repo/repoPicker/GetLogValidatorStorageRepoPicker';
import {ValidateGetLog} from '@copor/core/domain/Log/validation/ValidateGetLog';
import {GetLogLoggerRepoPicker} from '@copor/core/client/Log/GetLog/repo/repoPicker/GetLogLoggerRepoPicker';
import {GetLogInteractorRepoPicker} from '@copor/core/client/Log/GetLog/repo/repoPicker/GetLogInteractorRepoPicker';
import {GetLog} from '@copor/core/domain/Log/interactor/GetLog';

export interface GetLogParams {
	id: string;
}


export class GetLogInfoController extends BaseController<undefined, GetInfoViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetLogParams;

		if (!params.id) {
			const presenter = this.container.getPresenter(GetLogInfoPresenter, this.getDefaultInfoValues());

			this.response.status(200);
			this.response.send(presenter.present());
			return;
		}

		const logFactory = this.container.getFactory(
            RunFactory<GetLogDTO>,
            this.getLogValidator(this.actorId, params.id),
            this.getLogInteractor(params.id),
            this.getLogLogger(this.actorId, params.id)
		);

		const log = await logFactory.run();

		if (log instanceof ErrorList) {
			this.next(log);
			return;
		}

		const presenter = this.container.getPresenter(GetLogInfoPresenter, log);

		this.response.status(200);
		this.response.send(presenter.present());
	}

	private getDefaultInfoValues(): GetLogDTO {
		return {
			id: '',
			actorId: '',
			logData: {},
			actorUserName: '',
			logType: '',
			createdAt: new Date()
		};
	}

	private getLogValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetLogDTO = {actorId, logId: id};

		return c.getValidator(
			ValidateGetLog,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetLogValidatorStorageRepoPicker)
		);
	}

	private getLogLogger(actorId: string, id: string) {
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

	private getLogInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetLogInteractorRepoPicker);

		return this.container.getInteractor(
			GetLog,
			interactorRepository,
			id
		);
	}
}