import {UpdateCountryReqBodyDTO} from './dto/UpdateCountryReqBodyDTO';
import {UpdateCountryValidatorStorageRepoPicker} from './repo/repoPicker/UpdateRefactorValidatorStorageRepoPicker';
import {SaveCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/SaveCountryDTO';
import {ValidateUpdateCountry} from '@copor/core/domain/Components/Country/validations/ValidateUpdateCountry';
import {UpdateCountryInteractorRepoPicker} from './repo/repoPicker/UpdateCountryInteractorRepoPicker';
import {UpdateCountry} from '@copor/core/domain/Components/Country/interactor/UpdateCountry';
import {UpdateCountryLoggerRepoPicker} from './repo/repoPicker/UpdateCountryLoggerRepoPicker';
import {LogDataForUpdateCountry, LogUpdateCountry} from '@copor/core/domain/Components/Country/logger/LogUpdateCountry';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';

export class UpdateCountryController extends UpdateBaseController<UpdateCountryReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateCountryValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateCountry,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdateCountry,
			this.container.getNewRepoPicker(UpdateCountryInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateCountryLoggerRepoPicker);
		const logData: LogDataForUpdateCountry = this.request.body;

		return this.container.getLogger(
			LogUpdateCountry,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SaveCountryDTO {
		return {
			... this.request.body,
			actorId: this.actorId
		};
	}
}
