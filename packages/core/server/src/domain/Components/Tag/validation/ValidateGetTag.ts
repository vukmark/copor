import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateGetTagDTO} from './dto/ValidateGetTagDTO';
import {ValidateGetTagRepo} from '../repository/ValidateGetTagRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetTag} from './permissions/ValidateCanGetTag';
import {ValidateTag} from '@copor/core/domain/Core/Validations/Validators/ValidateTag';

export class ValidateGetTag extends ValidationWithPermissionAndRepo<ValidateGetTagDTO, ValidateGetTagRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetTag(this.permissionRepo, this.input.actorId),
			new ValidateTag(this.storageRepo, this.input.tagId)
		];
	}
}