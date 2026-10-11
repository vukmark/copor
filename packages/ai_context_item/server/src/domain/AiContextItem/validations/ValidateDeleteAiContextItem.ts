import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateDeleteAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/validations/dto/ValidateDeleteAiContextItemDTO';
import {ValidateDeleteAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/ValidateDeleteAiContextItemRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
	ValidateCanDeleteAiContextItem
} from '@copor/ai_context_item/domain/AiContextItem/validations/permissions/ValidateCanDeleteAiContextItem';
import {ValidateEmptyId} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyId';
import {ValidateAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/validations/ValidateAiContextItem';

export class ValidateDeleteAiContextItem extends ValidationWithPermissionAndRepo<
	ValidateDeleteAiContextItemDTO,
	ValidateDeleteAiContextItemRepo
> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteAiContextItem(this.permissionRepo, this.input.actorId),
			new ValidateEmptyId(this.input.aiContextItemId),
			new ValidateAiContextItem(this.storageRepo, this.input.aiContextItemId)
		];
	}
}