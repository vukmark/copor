import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {DeleteImageValidatorStorageRepoPicker} from './repo/repoPicker/DeleteImageValidatorStorageRepoPicker';
import {DeleteImageInteractorRepoPicker} from './repo/repoPicker/DeleteImageInteractorRepoPicker';
import {DeleteImage} from '@copor/core/domain/Components/Image/interactor/DeleteImage';
import {
	LogDeleteImage
} from '@copor/core/domain/Components/Image/logger/LogDeleteImage';
import {DeleteImageLoggerRepoPicker} from './repo/repoPicker/DeleteImageLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {ValidateDeleteImageDTO} from '@copor/core/domain/Components/Image/validation/dto/ValidateDeleteImageDTO';
import {ValidateDeleteImage} from '@copor/core/domain/Components/Image/validation/ValidateDeleteImage';
import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';

export interface DeleteImageParams {
	id: string;
}

export class DeleteImageController extends DeleteBaseController<DeleteImageParams> {

	protected getValidator(id: string) : Validator {
		const c = this.container;
		const input: ValidateDeleteImageDTO = {
			actorId: this.actorId,
			imageId: id
		};

		return c.getValidator(
			ValidateDeleteImage,
			input,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(DeleteImageValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string) : UseCase<void> {
		const c = this.container;
		const repo = c.getNewRepoPicker(DeleteImageInteractorRepoPicker);

		return c.getInteractor(DeleteImage, repo, id);
	}

	protected getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeleteImage,
			this.container.getNewRepoPicker(DeleteImageLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{imageId: id}
		);
	}
}
