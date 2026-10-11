import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {UpdateAuthUserInformationReqBodyDTO}
	from '@copor/core/client/AccountInformation/UpdateAuthUserInformation/dto/UpdateAuthUserInformationReqBodyDTO';
import {UpdateAuthUserInformationDTO} from '@copor/core/domain/User/interactor/dto/UpdateAuthUserInformationDTO';
import {ValidateUpdateAuthUserInformation} from '@copor/core/domain/User/validation/ValidateUpdateAuthUserInformation';
import {UpdateAuthUserInformation} from '@copor/core/domain/User/interactor/UpdateAuthUserInformation';
import {LogDataForUpdateAuthUserInformation, LogUpdateAuthUserInformation}
	from '@copor/core/domain/User/logger/LogUpdateAuthUserInformation';
import {UpdateAuthUserInformationValidatorStorageRepoPicker}
	from './repo/repoPicker/UpdateAuthUserInformationValidatorStorageRepoPicker';
import {UpdateAuthUserInformationInteractorRepoPicker}
	from './repo/repoPicker/UpdateAuthUserInformationInteractorRepoPicker';
import {UpdateAuthUserInformationLoggerRepoPicker}
	from './repo/repoPicker/UpdateAuthUserInformationLoggerRepoPicker';

export class UpdateAuthUserInformationController
	extends UpdateBaseController<UpdateAuthUserInformationReqBodyDTO> {
	protected getValidator(): Validator {
		return this.container.getValidator(
			ValidateUpdateAuthUserInformation,
			this.getInput(),
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			this.container.getNewRepoPicker(UpdateAuthUserInformationValidatorStorageRepoPicker)
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdateAuthUserInformation,
			this.container.getNewRepoPicker(UpdateAuthUserInformationInteractorRepoPicker),
			this.getInput()
		);
	}

	protected getLogger() {
		const logData: LogDataForUpdateAuthUserInformation = {
			id: this.request.body.id,
			userName: this.request.body.userName,
			email: this.request.body.email
		};

		return this.container.getLogger(
			LogUpdateAuthUserInformation,
			this.container.getNewRepoPicker(UpdateAuthUserInformationLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getInput(): UpdateAuthUserInformationDTO {
		return {
			... this.request.body,
			password: this.request.body.password?.trim() || undefined,
			actorId: this.actorId
		};
	}
}
