import {ValidateCanDeleteTag} from './permissions/ValidateCanDeleteTag';
import {ValidateDeleteTagDTO} from './dto/ValidateDeleteTagDTO';
import {ValidateDeleteTagRepo} from '../repository/ValidateDeleteTagRepo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateEmptyId} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyId';
import {ValidateTag} from '@copor/core/domain/Core/Validations/Validators/ValidateTag';
import {ValidateEntityIsNotReferenced} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export class ValidateDeleteTag extends ValidationWithPermissionAndRepo<ValidateDeleteTagDTO, ValidateDeleteTagRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteTag(this.permissionRepo, this.input.actorId),
			new ValidateEmptyId(this.input.tagId),
			new ValidateTag(this.storageRepo, this.input.tagId),
			new ValidateEntityIsNotReferenced(this.storageRepo, this.input.tagId)
		];
	}
}
