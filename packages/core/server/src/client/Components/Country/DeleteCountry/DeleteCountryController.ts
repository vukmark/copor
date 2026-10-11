import {ValidateDeleteCountryDTO} from '@copor/core/domain/Components/Country/validations/dto/ValidateDeleteCountryDTO';
import {ValidateDeleteCountry} from '@copor/core/domain/Components/Country/validations/ValidateDeleteCountry';
import {DeleteCountry} from '@copor/core/domain/Components/Country/interactor/DeleteCountry';
import {LogDeleteCountry} from '@copor/core/domain/Components/Country/logger/LogDeleteCountry';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {DeleteCountryValidatorStorageRepoPicker} from './repoPicker/DeleteCountryValidatorStorageRepoPicker';
import {DeleteCountryInteractorRepoPicker} from './repoPicker/DeleteCountryInteractorRepoPicker';
import {DeleteCountryLoggerRepoPicker} from './repoPicker/DeleteCountryLoggerRepoPicker';
import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';

export interface DeleteCountryParams {
	id: string;
}

export class DeleteCountryController extends DeleteBaseController<DeleteCountryParams> {
	protected getValidator(id: string) : Validator {
		const c = this.container;
		const input: ValidateDeleteCountryDTO = {
			actorId: this.actorId,
			countryId: id
		};

		return c.getValidator(
			ValidateDeleteCountry,
			input,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(DeleteCountryValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string) : UseCase<void> {
		const c = this.container;
		const repo = c.getNewRepoPicker(DeleteCountryInteractorRepoPicker);

		return c.getInteractor(DeleteCountry, repo, id);
	}

	protected getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeleteCountry,
			this.container.getNewRepoPicker(DeleteCountryLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{countryId: id}
		);
	}
}
