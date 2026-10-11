import {BaseController} from '@copor/core/client/Core/BaseController';
import {ValidateGetLogList} from '@copor/core/domain/Log/validation/ValidateGetLogList';
import {GetLogListInteractorRepoPicker} from './repo/repoPicker/GetLogListInteractorRepoPicker';
import {GetLogList} from '@copor/core/domain/Log/interactor/GetLogList';
import {GetLogListLoggerRepoPicker} from './repo/repoPicker/GetLogListLoggerRepoPicker';
import {LogGetLogList} from '@copor/core/domain/Log/logger/LogGetLogList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {GetLogDTO} from '@copor/core/domain/Log/interactor/dto/GetLogDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetLogViewModel} from '@copor/core/client/Log/GetLogList/GetLogViewModel';
import {GetLogListPresenter} from '@copor/core/client/Log/GetLogList/GetLogListPresenter';

export class GetLogListController extends BaseController<void, GetLogViewModel[]> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetLogDTO[]>,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetLogListPresenter, response);

		this.response.status(200);
		this.response.send(presenter.present());
	}
	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetLogList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetLogListInteractorRepoPicker);

		return container.getInteractor(GetLogList, interactorRepo, {filters: []});
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetLogListLoggerRepoPicker);

		return container.getLogger(LogGetLogList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
