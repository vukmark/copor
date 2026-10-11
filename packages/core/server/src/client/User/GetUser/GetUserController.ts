import {GetUserViewModel} from '@copor/core/client/User/GetUser/GetUserViewModel';
import {PermissionValidatorRepoPicker}
	from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateGetUserDTO} from '@copor/core/domain/User/validation/dto/ValidateGetUserDTO';
import {ValidateGetUser} from '@copor/core/domain/User/validation/ValidateGetUser';
import {GetUserValidatorStorageRepoPicker}
	from '@copor/core/client/User/GetUser/repo/repoPicker/GetUserValidatorStorageRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {GetUserLoggerRepoPicker} from '@copor/core/client/User/GetUser/repo/repoPicker/GetUserLoggerRepoPicker';
import {LogGetUser} from '@copor/core/domain/User/logger/LogGetUser';
import {GetUserInteractorRepoPicker} from '@copor/core/client/User/GetUser/repo/repoPicker/GetUserInteractorRepoPicker';
import {GetUser} from '@copor/core/domain/User/interactor/GetUser';
import {GetUserPresenter} from '@copor/core/client/User/GetUser/GetUserPresenter';
import {GetUserDTO} from '@copor/core/domain/User/interactor/dto/GetUserDTO';
import {SingleItemBaseController} from '@copor/core/client/Core/Controller/SingleItemBaseController';
import {Presenter} from '@copor/core/client/Interface/Presenter';


export class GetUserController extends SingleItemBaseController<GetUserDTO, GetUserViewModel> {
	protected getPresenter(response: GetUserDTO): Presenter<GetUserViewModel> {
		return this.container.getPresenter(GetUserPresenter, response);
	}

	protected getValidator(id: string) {
		const c = this.container;
		const validatorInput: ValidateGetUserDTO = {actorId: this.actorId, userId: id};

		return c.getValidator(
			ValidateGetUser,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetUserValidatorStorageRepoPicker)
		);
	}

	protected getLogger(id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetUserLoggerRepoPicker);
		const logData = {
			id: id
		};

		return this.container.getLogger(
			LogGetUser,
			loggerRepository,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	protected getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetUserInteractorRepoPicker);

		return this.container.getInteractor(
			GetUser,
			interactorRepository,
			id
		);
	}
}