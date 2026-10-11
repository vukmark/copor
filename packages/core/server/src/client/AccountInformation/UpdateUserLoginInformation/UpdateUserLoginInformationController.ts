import {UpdateUserLoginInformationReqBodyDTO}
	from '@copor/core/client/AccountInformation/UpdateUserLoginInformation/dto/UpdateUserLoginInformationReqBodyDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UpdateUserLoginInformationValidatorStorageRepoPicker}
	from './repo/repoPicker/UpdateUserLoginInformationValidatorStorageRepoPicker';
import {ValidateUpdateUserLoginInformation} from '@copor/core/domain/User/validation/ValidateUpdateUserLoginInformation';
import {UpdateUserLoginInformationInteractorRepoPicker}
	from './repo/repoPicker/UpdateUserLoginInformationInteractorRepoPicker';
import {UpdateUserLoginInformationLoggerRepoPicker}
	from '@copor/core/client/AccountInformation/UpdateUserLoginInformation/repo/repoPicker/UpdateUserLoginInformationLoggerRepoPicker';
import {LogDataForUpdateUserLoginInformation, LogUpdateUserLoginInformation}
	from '@copor/core/domain/User/logger/LogUpdateUserLoginInformation';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {UpdateUserLoginInformationDTO} from '@copor/core/domain/User/interactor/dto/UpdateUserLoginInformationDTO';
import {UpdateUserLoginInformation} from '@copor/core/domain/User/interactor/UpdateUserLoginInformation';
import {UpdateUserLoginInformationValidatorPermissionRepoPicker}
	from './repo/repoPicker/UpdateUserLoginInformationValidatorPermissionRepoPicker';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';


export class UpdateUserLoginInformationController extends UpdateBaseController<UpdateUserLoginInformationReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(UpdateUserLoginInformationValidatorPermissionRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateUserLoginInformationValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateUserLoginInformation,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdateUserLoginInformation,
			this.container.getNewRepoPicker(UpdateUserLoginInformationInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateUserLoginInformationLoggerRepoPicker);
		const logData: LogDataForUpdateUserLoginInformation = {
			... this.request.body,
			userId: this.actorId
		};

		return this.container.getLogger(
			LogUpdateUserLoginInformation,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): UpdateUserLoginInformationDTO {
		return {
			... this.request.body,
			userId: this.actorId,
			actorId: this.actorId
		};
	}
}
