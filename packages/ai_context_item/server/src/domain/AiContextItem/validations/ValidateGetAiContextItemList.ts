import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
	ValidateCanGetAiContextItemList
} from '@copor/ai_context_item/domain/AiContextItem/validations/permissions/ValidateCanGetAiContextItemList';

export class ValidateGetAiContextItemList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetAiContextItemList(this.permissionRepo, this.input)
		];
	}
}