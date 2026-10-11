import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateDeleteContentItemDTO} from '@copor/core/domain/ContentItem/validations/dto/ValidateDeleteContentItemDTO';
import {ValidateDeleteContentItemRepo} from '@copor/core/domain/ContentItem/repository/ValidateDeleteContentItemRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanDeleteContentItem} from '@copor/core/domain/ContentItem/validations/permissions/ValidateCanDeleteContentItem';
import {ValidateEmptyId} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyId';
import {ValidateContentItem} from '@copor/core/domain/Core/Validations/Validators/ValidateContentItem';

export class ValidateDeleteContentItem extends ValidationWithPermissionAndRepo<
	ValidateDeleteContentItemDTO,
	ValidateDeleteContentItemRepo
> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteContentItem(this.permissionRepo, this.input.actorId),
			new ValidateEmptyId(this.input.contentItemId),
			new ValidateContentItem(this.storageRepo, this.input.contentItemId),
		];
	}
}