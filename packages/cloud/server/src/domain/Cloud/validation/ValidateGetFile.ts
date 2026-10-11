import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateGetFileDTO} from '@copor/cloud/domain/Cloud/validation/dto/ValidateGetFileDTO';
import {ValidateCanGetFile} from '@copor/cloud/domain/Cloud/validation/validator/ValidateCanGetFile';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateGetFileRepo} from '@copor/cloud/domain/Cloud/repository/ValidateGetFileRepo';
import {ValidateCloudFile} from '@copor/cloud/domain/Cloud/validation/validator/ValidateCloudFile';

export interface ValidateGetFileContext {
	fileId: string;
}

export class ValidateGetFile extends ValidationWithPermissionAndRepo<ValidateGetFileDTO, ValidateGetFileRepo, ValidateGetFileContext> {
	public getValidators(): Validator[] {
		const context: ValidateGetFileContext = {fileId: this.input.fileId};

		return [
			new ValidateCanGetFile(this.permissionRepo, this.input.actorId, context),
			new ValidateCloudFile(this.storageRepo, this.input.fileId)
		];
	}
}
