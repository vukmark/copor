import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {GetUserContactInformationViewModel} from './GetUserContactInformationViewModel';
import {GetUserContactInformationValidatorStorageRepoPicker} from './repo/repoPicker/GetUserContactInformationValidatorStorageRepoPicker';
import {GetUserContactInformationInteractorRepoPicker} from './repo/repoPicker/GetUserContactInformationInteractorRepoPicker';
import {GetUserContactInformationLoggerRepoPicker} from './repo/repoPicker/GetUserContactInformationLoggerRepoPicker';
import {GetUserContactInformationPresenter} from './GetUserContactInformationPresenter';
import {ValidateGetUserContactInformationDTO}
	from '@copor/contacts/domain/Contacts/GetUserContactInformation/validations/dto/ValidateGetUserContactInformationDTO';
import {ValidateGetUserContactInformation}
	from '@copor/contacts/domain/Contacts/GetUserContactInformation/validations/ValidateGetUserContactInformation';
import {LogGetUserContactInformation}
	from '@copor/contacts/domain/Contacts/GetUserContactInformation/logger/LogGetUserContactInformation';
import {GetUserContactInformation}
	from '@copor/contacts/domain/Contacts/GetUserContactInformation/interactor/GetUserContactInformation';

import {GetUserContactInformationDTO} from '@copor/contacts/domain/Contacts/interactor/dto/GetUserContactInformationDTO';
import {
	GetUserContactInformationValidatorPermissionRepoPicker
} from '@copor/contacts/client/Contacts/GetUserContactInformation/repo/repoPicker/GetUserContactInformationValidatorPermissionRepoPicker';
import {SingleItemBaseController} from '@copor/core/client/Core/Controller/SingleItemBaseController';
import {Presenter} from '@copor/core/client/Interface/Presenter';


export class GetUserContactInformationController extends SingleItemBaseController<GetUserContactInformationDTO,
	GetUserContactInformationViewModel> {
	protected getPresenter(response: GetUserContactInformationDTO): Presenter<GetUserContactInformationViewModel> {
		return this.container.getPresenter(GetUserContactInformationPresenter, response);
	}

	protected getValidator(id: string) {
		const c = this.container;
		const validatorInput: ValidateGetUserContactInformationDTO = {actorId: this.actorId, userId: id};

		return c.getValidator(
			ValidateGetUserContactInformation,
			validatorInput,
			c.getNewRepoPicker(GetUserContactInformationValidatorPermissionRepoPicker),
			c.getNewRepoPicker(GetUserContactInformationValidatorStorageRepoPicker)
		);
	}

	protected getLogger(id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetUserContactInformationLoggerRepoPicker);
		const logData = {
			userId: id
		};

		return this.container.getLogger(
			LogGetUserContactInformation,
			loggerRepository,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	protected getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetUserContactInformationInteractorRepoPicker);

		return this.container.getInteractor(
			GetUserContactInformation,
			interactorRepository,
			id
		);
	}
}
