import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {
	DeleteFileValidatorStorageRepoPicker
} from '@copor/cloud/client/Cloud/DeleteFile/repo/repoPicker/DeleteFileValidatorStorageRepoPicker';
import {
	DeleteFileInteractorRepoPicker
} from '@copor/cloud/client/Cloud/DeleteFile/repo/repoPicker/DeleteFileInteractorRepoPicker';
import {
	DeleteFileLoggerRepoPicker
} from '@copor/cloud/client/Cloud/DeleteFile/repo/repoPicker/DeleteFileLoggerRepoPicker';
import {ValidateDeleteFileDTO} from '@copor/cloud/domain/Cloud/validation/dto/ValidateDeleteFileDTO';
import {ValidateDeleteFile} from '@copor/cloud/domain/Cloud/validation/ValidateDeleteFile';
import {DeleteFile} from '@copor/cloud/domain/Cloud/interactor/DeleteFile';
import {LogDeleteFile} from '@copor/cloud/domain/Cloud/logger/LogDeleteFile';
import {
	DeleteFileValidatorPermissionRepoPicker
} from '@copor/cloud/client/Cloud/DeleteFile/repo/repoPicker/DeleteFileValidatorPermissionRepoPicker';
import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';

export interface DeleteFileParams {
	id: string;
}

export class DeleteFileController extends DeleteBaseController<DeleteFileParams> {

	protected getValidator(id: string) : Validator {
		const container = this.container;
		const input: ValidateDeleteFileDTO = {
			fileId: id,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateDeleteFile,
			input,
			container.getNewRepoPicker(DeleteFileValidatorPermissionRepoPicker),
			container.getNewRepoPicker(DeleteFileValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string) : UseCase<void> {
		const container = this.container;
		const repo = container.getNewRepoPicker(DeleteFileInteractorRepoPicker);

		return container.getInteractor(DeleteFile, repo, id);
	}

	protected getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeleteFile,
			this.container.getNewRepoPicker(DeleteFileLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{fileId: id}
		);
	}
}
