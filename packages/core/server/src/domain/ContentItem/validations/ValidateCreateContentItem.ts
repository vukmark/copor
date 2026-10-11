import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateCreateContentItemDTO} from '@copor/core/domain/ContentItem/validations/dto/ValidateCreateContentItemDTO';
import {ValidateCreateContentItemRepo} from '@copor/core/domain/ContentItem/repository/ValidateCreateContentItemRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
	ValidateCanCreateContentItem,
	ValidateCanCreateContentItemContext
} from '@copor/core/domain/ContentItem/validations/permissions/ValidateCanCreateContentItem';
import {ValidateEmptyContent} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyContent';
import {ValidateEmptyTitle} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyTitle';

export class ValidateCreateContentItem extends ValidationWithPermissionAndRepo<
	ValidateCreateContentItemDTO,
	ValidateCreateContentItemRepo,
	ValidateCanCreateContentItemContext
> {
	public getValidators(): Validator[] {
		const context: ValidateCanCreateContentItemContext = {
			contentItemId: this.input.actorId
		};

		return [
			new ValidateCanCreateContentItem(this.permissionRepo, this.input.actorId, context),
			new ValidateEmptyContent(this.input.content),
			new ValidateEmptyTitle(this.input.title)
		];
	}
}

