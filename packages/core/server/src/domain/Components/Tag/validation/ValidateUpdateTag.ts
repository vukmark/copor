import {ValidateCanEditTag, ValidateCanEditTagContext} from './permissions/ValidateCanEditTag';
import {SaveTagDTO} from '../interactor/dto/SaveTagDTO';
import {ValidateUpdateTagRepo} from '../repository/ValidateUpdateTagRepo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {ValidateTag} from '@copor/core/domain/Core/Validations/Validators/ValidateTag';

export class ValidateUpdateTag extends ValidationWithPermissionAndRepo<
	SaveTagDTO,
	ValidateUpdateTagRepo,
	ValidateCanEditTagContext
> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanEditTag(this.permissionRepo, this.input.actorId, {tagId: this.input.id}),
			new ValidateEmptyName(this.input.name),
			new ValidateTag(this.storageRepo, this.input.id)
		];
	}
}
