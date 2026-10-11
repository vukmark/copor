import {UpdatePhoneNumberReqBodyDTO} from './dto/UpdatePhoneNumberReqBodyDTO';
import {UpdatePhoneNumberValidatorStorageRepoPicker} from './repo/repoPicker/UpdatePhoneNumberValidatorStorageRepoPicker';
import {UpdatePhoneNumberInteractorRepoPicker} from './repo/repoPicker/UpdatePhoneNumberInteractorRepoPicker';
import {UpdatePhoneNumberLoggerRepoPicker} from './repo/repoPicker/UpdatePhoneNumberLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	ValidateUpdatePhoneNumber
} from '@copor/core/domain/Core/global/PhoneNumber/validations/ValidateUpdatePhoneNumber';
import {UpdatePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/interactor/UpdatePhoneNumber';
import {
	LogDataForUpdatePhoneNumber, LogUpdatePhoneNumber
} from '@copor/core/domain/Core/global/PhoneNumber/logger/LogUpdatePhoneNumber';
import {SavePhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/SavePhoneNumberDTO';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';

export class UpdatePhoneNumberController extends UpdateBaseController<UpdatePhoneNumberReqBodyDTO[]> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdatePhoneNumberValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdatePhoneNumber,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdatePhoneNumber,
			this.container.getNewRepoPicker(UpdatePhoneNumberInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdatePhoneNumberLoggerRepoPicker);
		const logData: LogDataForUpdatePhoneNumber[] = this.request.body;

		return this.container.getLogger(
			LogUpdatePhoneNumber,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SavePhoneNumberDTO[] {
		return this.request.body.map((dto) => ({
			... dto,
			actorId: this.actorId
		}));
	}
}
