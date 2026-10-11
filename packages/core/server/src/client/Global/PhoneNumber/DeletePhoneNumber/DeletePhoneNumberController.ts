import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {DeletePhoneNumberValidatorStorageRepoPicker} from './repo/repoPicker/DeletePhoneNumberValidatorStorageRepoPicker';
import {DeletePhoneNumberInteractorRepoPicker} from './repo/repoPicker/DeletePhoneNumberInteractorRepoPicker';
import {DeletePhoneNumberLoggerRepoPicker} from './repo/repoPicker/DeletePhoneNumberLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {ValidateDeletePhoneNumberDTO}
	from '@copor/core/domain/Core/global/PhoneNumber/validations/dto/ValidateDeletePhoneNumberDTO';
import {DeletePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/interactor/DeletePhoneNumber';
import {LogDeletePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/logger/LogDeletePhoneNumber';
import {
	ValidateDeletePhoneNumber
} from '@copor/core/domain/Core/global/PhoneNumber/validations/ValidateDeletePhoneNumber';
import {DeleteBaseController, DeleteParams} from '@copor/core/client/Core/Controller/DeleteBaseController';

export type DeletePhoneNumberParams = DeleteParams;

export class DeletePhoneNumberController extends DeleteBaseController<DeletePhoneNumberParams> {
	protected getValidator(id: string) : Validator {
		const c = this.container;
		const input: ValidateDeletePhoneNumberDTO = {
			actorId: this.actorId,
			id: id
		};

		return c.getValidator(
			ValidateDeletePhoneNumber,
			input,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(DeletePhoneNumberValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string) : UseCase<void> {
		const c = this.container;
		const repo = c.getNewRepoPicker(DeletePhoneNumberInteractorRepoPicker);

		return c.getInteractor(DeletePhoneNumber, repo, id);
	}

	protected getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeletePhoneNumber,
			this.container.getNewRepoPicker(DeletePhoneNumberLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{id: id}
		);
	}
}
