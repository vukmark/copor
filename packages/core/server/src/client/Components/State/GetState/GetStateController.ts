import {ValidateGetStateDTO} from '@copor/core/domain/Components/State/validations/dto/ValidateGetStateDTO';
import {ValidateGetState} from '@copor/core/domain/Components/State/validations/ValidateGetState';
import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {GetState} from '@copor/core/domain/Components/State/interactor/GetState';
import {LogGetState} from '@copor/core/domain/Components/State/logger/LogGetState';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {GetStateViewModel} from './GetStateViewModel';
import {GetStateValidatorStorageRepoPicker} from './repo/repoPicker/GetStateValidatorStorageRepoPicker';
import {GetStateInteractorRepoPicker} from './repo/repoPicker/GetStateInteractorRepoPicker';
import {GetStateLoggerRepoPicker} from './repo/repoPicker/GetStateLoggerRepoPicker';
import {GetStatePresenter} from './GetStatePresenter';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {SingleItemBaseController} from '@copor/core/client/Core/Controller/SingleItemBaseController';
import {Presenter} from '@copor/core/client/Interface/Presenter';


export class GetStateController extends SingleItemBaseController<GetStateDTO, GetStateViewModel> {
	protected getPresenter(response: GetStateDTO): Presenter<GetStateViewModel> {
		return this.container.getPresenter(GetStatePresenter, response);
	}

	protected getValidator(id: string) {
		const c = this.container;
		const validatorInput: ValidateGetStateDTO = {actorId: this.actorId, stateId: id};

		return c.getValidator(
			ValidateGetState,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetStateValidatorStorageRepoPicker)
		);
	}

	protected getLogger(id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetStateLoggerRepoPicker);
		const logData = {
			stateId: id
		};

		return this.container.getLogger(
			LogGetState,
			loggerRepository,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	protected getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetStateInteractorRepoPicker);

		return this.container.getInteractor(
			GetState,
			interactorRepository,
			id
		);
	}
}