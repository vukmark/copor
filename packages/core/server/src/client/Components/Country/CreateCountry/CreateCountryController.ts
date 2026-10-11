import {CreateCountryReqBodyDTO} from './dto/CreateCountryReqBodyDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateCreateCountryDTO}
	from '@copor/core/domain/Components/Country/validations/dto/ValidateCreateCountryDTO';
import {ValidateCreateCountry} from '@copor/core/domain/Components/Country/validations/ValidateCreateCountry';
import {SaveCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/SaveCountryDTO';
import {CreateCountryInteractorRepoPicker} from './repo/repoPicker/CreateCountryInteractorRepoPicker';
import {CreateCountry} from '@copor/core/domain/Components/Country/interactor/CreateCountry';
import {CreateCountryLoggerRepoPicker} from './repo/repoPicker/CreateCountryLoggerRepoPicker';
import {
	LogCreateCountry,
	LogDataForCreateCountry
} from '@copor/core/domain/Components/Country/logger/LogCreateCountry';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateBaseController} from '@copor/core/client/Core/Controller/CreateBaseController';

export class CreateCountryController extends CreateBaseController<CreateCountryReqBodyDTO> {
	protected getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput: ValidateCreateCountryDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreateCountry,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}

	protected getInteractor(uniqueId: string) : UseCase<string> {
		const container = this.container;
		const interactorInput: SaveCountryDTO = {
			... this.request.body,
			actorId: this.actorId,
			id: uniqueId
		};
		const interactorRepo = container.getNewRepoPicker(CreateCountryInteractorRepoPicker);

		return container.getInteractor(
			CreateCountry,
			interactorRepo,
			interactorInput
		);
	}

	protected getLogger(uniqueId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateCountryLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateCountry,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(uniqueId: string): LogDataForCreateCountry {
		return {
			... this.request.body,
			id: uniqueId
		};
	}
}
