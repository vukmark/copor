import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateDeleteFileDTO} from '@copor/cloud/domain/Cloud/validation/dto/ValidateDeleteFileDTO';
import {ValidateCanDeleteFile} from '@copor/cloud/domain/Cloud/validation/validator/ValidateCanDeleteFile';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateDeleteFileRepo} from '@copor/cloud/domain/Cloud/repository/ValidateDeleteFileRepo';
import {ValidateFile} from '@copor/cloud/domain/Cloud/validation/validator/ValidateFile';

export interface ValidateCanDeleteFileContext {
	fileId: string;
}

export class ValidateDeleteFile extends
	ValidationWithPermissionAndRepo<ValidateDeleteFileDTO, ValidateDeleteFileRepo, ValidateCanDeleteFileContext> {
	public getValidators(): Validator[] {
		const context: ValidateCanDeleteFileContext = {fileId: this.input.fileId};

		return [
			new ValidateCanDeleteFile(this.permissionRepo, this.input.actorId, context),
			new ValidateFile(this.storageRepo, this.input.fileId)
		];
	}
}
