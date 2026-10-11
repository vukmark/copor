import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {DeleteUserValidatorStorageRepoPicker}
	from '@copor/core/client/User/DeleteUser/repo/repoPicker/DeleteUserValidatorStorageRepoPicker';
import {ValidateDeleteUserDTO} from '@copor/core/domain/User/validation/dto/ValidateDeleteUserDTO';
import {ValidateDeleteUser} from '@copor/core/domain/User/validation/ValidateDeleteUser';
import {DeleteUserInteractorRepoPicker} from '@copor/core/client/User/DeleteUser/repo/repoPicker/DeleteUserInteractorRepoPicker';
import {DeleteUser} from '@copor/core/domain/User/interactor/DeleteUser';
import {DeleteUserLoggerRepoPicker} from '@copor/core/client/User/DeleteUser/repo/repoPicker/DeleteUserLoggerRepoPicker';
import {LogDataForDeleteUser, LogDeleteUser} from '@copor/core/domain/User/logger/LogDeleteUser';
import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';

export interface DeleteUserParams {
	id: string;
}

export class DeleteUserController extends DeleteBaseController<DeleteUserParams> {
	protected getValidator(id: string): Validator {
		const container = this.container;
		const input: ValidateDeleteUserDTO = {
			userId: id,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateDeleteUser,
			input,
			container.getNewRepoPicker(PermissionValidatorRepoPicker),
			container.getNewRepoPicker(DeleteUserValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string): UseCase<void> {
		const container = this.container;
		const repo = container.getNewRepoPicker(DeleteUserInteractorRepoPicker);

		return container.getInteractor(DeleteUser, repo, id);
	}

	protected getLogger(id: string): LogAction {
		const logData: LogDataForDeleteUser = {deletedUserId: id};

		return this.container.getLogger(
			LogDeleteUser,
			this.container.getNewRepoPicker(DeleteUserLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			logData
		);
	}
}
