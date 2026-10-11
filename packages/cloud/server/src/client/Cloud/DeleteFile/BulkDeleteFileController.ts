import {BaseController} from '@copor/core/client/Core/BaseController';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateDeleteFileDTO} from '@copor/cloud/domain/Cloud/validation/dto/ValidateDeleteFileDTO';
import {ValidateDeleteFile} from '@copor/cloud/domain/Cloud/validation/ValidateDeleteFile';
import {DeleteFile} from '@copor/cloud/domain/Cloud/interactor/DeleteFile';
import {LogDeleteFile} from '@copor/cloud/domain/Cloud/logger/LogDeleteFile';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
	DeleteFileValidatorPermissionRepoPicker
} from '@copor/cloud/client/Cloud/DeleteFile/repo/repoPicker/DeleteFileValidatorPermissionRepoPicker';
import {
	DeleteFileValidatorStorageRepoPicker
} from '@copor/cloud/client/Cloud/DeleteFile/repo/repoPicker/DeleteFileValidatorStorageRepoPicker';
import {
	DeleteFileInteractorRepoPicker
} from '@copor/cloud/client/Cloud/DeleteFile/repo/repoPicker/DeleteFileInteractorRepoPicker';
import {
	DeleteFileLoggerRepoPicker
} from '@copor/cloud/client/Cloud/DeleteFile/repo/repoPicker/DeleteFileLoggerRepoPicker';

export interface BulkDeleteFileReqBodyDTO {
	ids: string[];
}

export class BulkDeleteFileController extends BaseController<BulkDeleteFileReqBodyDTO, void> {
	public async getResponse(): Promise<void> {
		const ids = this.getUniqueIds();

		if (!ids) {
			this.response.status(400).send();
			return;
		}

		const operations = ids.map((id) => this.createOperation(id));

		// Validate the complete request before deleting anything, so a forbidden
		// or non-existing file cannot leave the bulk operation partially applied.
		for (const operation of operations) {
			const validationResult = await operation.validator.validate();

			if (validationResult instanceof ErrorList) {
				this.next(validationResult);
				return;
			}
		}

		for (const operation of operations)
			await operation.factory.run({skipValidation: true});

		this.response.status(200).send();
	}

	private getUniqueIds(): string[] | undefined {
		const ids = this.request.body?.ids;

		if (!Array.isArray(ids) || ids.length === 0 || ids.some((id) => typeof id !== 'string' || id.length === 0))
			return undefined;

		return [... new Set(ids)];
	}

	private createOperation(id: string): {validator: Validator; factory: RunFactory<void>} {
		const input: ValidateDeleteFileDTO = {
			fileId: id,
			actorId: this.actorId
		};
		const validator = this.container.getValidator(
			ValidateDeleteFile,
			input,
			this.container.getNewRepoPicker(DeleteFileValidatorPermissionRepoPicker),
			this.container.getNewRepoPicker(DeleteFileValidatorStorageRepoPicker)
		);
		const interactor = this.container.getInteractor(
			DeleteFile,
			this.container.getNewRepoPicker(DeleteFileInteractorRepoPicker),
			id
		);
		const logger = this.container.getLogger(
			LogDeleteFile,
			this.container.getNewRepoPicker(DeleteFileLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{fileId: id}
		);

		return {
			validator,
			factory: new RunFactory<void>(validator, interactor, logger)
		};
	}
}
