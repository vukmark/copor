import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateGetAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/validations/dto/ValidateGetAiContextItemDTO';
import {ValidateGetAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/ValidateGetAiContextItemRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/validations/permissions/ValidateCanGetAiContextItem';
import {ValidateAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/validations/ValidateAiContextItem';

export class ValidateGetAiContextItem extends ValidationWithPermissionAndRepo<
	ValidateGetAiContextItemDTO,
	ValidateGetAiContextItemRepo
> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetAiContextItem(this.permissionRepo, this.input.actorId),
			new ValidateAiContextItem(this.storageRepo, this.input.aiContextItemId)
		];
	}
}