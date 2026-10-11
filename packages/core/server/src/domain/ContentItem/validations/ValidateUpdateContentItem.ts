import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateUpdateContentItemDTO} from '@copor/core/domain/ContentItem/validations/dto/ValidateUpdateContentItemDTO';
import {ValidateUpdateContentItemRepo} from '@copor/core/domain/ContentItem/repository/ValidateUpdateContentItemRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanUpdateContentItem} from '@copor/core/domain/ContentItem/validations/permissions/ValidateCanUpdateContentItem';
import {ValidateEmptyContent} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyContent';
import {ValidateContentItem} from '@copor/core/domain/Core/Validations/Validators/ValidateContentItem';
import {ValidateEmptyTitle} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyTitle';

export class ValidateUpdateContentItem extends ValidationWithPermissionAndRepo<
	ValidateUpdateContentItemDTO,
	ValidateUpdateContentItemRepo
> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateContentItem(this.permissionRepo, this.input.actorId),
			new ValidateEmptyContent(this.input.content),
			new ValidateContentItem(this.storageRepo, this.input.id),
			new ValidateEmptyTitle(this.input.title)
		];
	}
}