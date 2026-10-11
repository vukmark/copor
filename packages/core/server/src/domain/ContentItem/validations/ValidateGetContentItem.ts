import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateGetContentItemDTO} from '@copor/core/domain/ContentItem/validations/dto/ValidateGetContentItemDTO';
import {ValidateGetContentItemRepo} from '@copor/core/domain/ContentItem/repository/ValidateGetContentItemRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetContentItem} from '@copor/core/domain/ContentItem/validations/permissions/ValidateCanGetContentItem';
import {ValidateContentItem} from '@copor/core/domain/Core/Validations/Validators/ValidateContentItem';

export class ValidateGetContentItem extends ValidationWithPermissionAndRepo<
	ValidateGetContentItemDTO,
	ValidateGetContentItemRepo
> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetContentItem(this.permissionRepo, this.input.actorId),
			new ValidateContentItem(this.storageRepo, this.input.contentItemId)
		];
	}
}