import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateDeleteStateDTO} from '@copor/core/domain/Components/State/validations/dto/ValidateDeleteStateDTO';
import {ValidateDeleteState} from '@copor/core/domain/Components/State/validations/ValidateDeleteState';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {DeleteState} from '@copor/core/domain/Components/State/interactor/DeleteState';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {LogDeleteState} from '@copor/core/domain/Components/State/logger/LogDeleteState';
import {DeleteStateValidatorStorageRepoPicker}
	from '@copor/core/client/Components/State/DeleteState/repo/repoPicker/DeleteStateValidatorStorageRepoPicker';
import {DeleteStateInteractorRepoPicker} from '@copor/core/client/Components/State/DeleteState/repo/repoPicker/DeleteStateInteractorRepoPicker';
import {DeleteStateLoggerRepoPicker} from '@copor/core/client/Components/State/DeleteState/repo/repoPicker/DeleteStateLoggerRepoPicker';
import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';

export interface DeleteStateParams {
	id: string;
}

export class DeleteStateController extends DeleteBaseController<DeleteStateParams> {
	protected getValidator(id: string) : Validator {
		const c = this.container;
		const input: ValidateDeleteStateDTO = {
			actorId: this.actorId,
			stateId: id
		};

		return c.getValidator(
			ValidateDeleteState,
			input,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(DeleteStateValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string) : UseCase<void> {
		const c = this.container;
		const repo = c.getNewRepoPicker(DeleteStateInteractorRepoPicker);

		return c.getInteractor(DeleteState, repo, id);
	}

	protected getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeleteState,
			this.container.getNewRepoPicker(DeleteStateLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{stateId: id}
		);
	}
}