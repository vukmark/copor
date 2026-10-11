import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {GetState} from '@copor/core/domain/Components/State/interactor/GetState';
import {LogGetState} from '@copor/core/domain/Components/State/logger/LogGetState';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetStateViewModel} from '@copor/core/client/Components/State/GetState/GetStateViewModel';
import {GetStatePresenter} from '@copor/core/client/Components/State/GetState/GetStatePresenter';
import {GetStateLoggerRepoPicker} from '@copor/core/client/Components/State/GetState/repo/repoPicker/GetStateLoggerRepoPicker';
import {GetStateInteractorRepoPicker} from '@copor/core/client/Components/State/GetState/repo/repoPicker/GetStateInteractorRepoPicker';
import {ValidateGetStateDTO} from '@copor/core/domain/Components/State/validations/dto/ValidateGetStateDTO';
import {ValidatePublicRefGetState} from '@copor/core/domain/PublicRefdata/validation/ValidatePublicRefGetState';
import {GetStateValidatorStorageRepoPicker}
	from '@copor/core/client/Components/State/GetState/repo/repoPicker/GetStateValidatorStorageRepoPicker';

export interface GetStateParams {
	id: string;
}

export class GetPublicRefStateController extends BaseController<undefined, GetStateViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetStateParams;
		const id: string = params.id;
		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<GetStateDTO>,
			this.getValidator(id),
			this.getInteractor(id),
			this.getLogger(actorId, id)
		);

		const response = await factory.run({skipValidation: true});

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetStatePresenter, response);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}

	private getValidator(id: string) {
		const c = this.container;
		const validatorInput: ValidateGetStateDTO = {stateId: id, actorId: ''};
		const storageRepo = c.getNewRepoPicker(GetStateValidatorStorageRepoPicker);

		return c.getValidator(
			ValidatePublicRefGetState,
			validatorInput,
			storageRepo,
			undefined
		);
	}

	private getLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetStateLoggerRepoPicker);
		const logData = {
			stateId: id
		};

		return this.container.getLogger(
			LogGetState,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetStateInteractorRepoPicker);

		return this.container.getInteractor(
			GetState,
			interactorRepository,
			id
		);
	}
}