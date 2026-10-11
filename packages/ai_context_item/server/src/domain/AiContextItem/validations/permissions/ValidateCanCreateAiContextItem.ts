import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {AiContextItemPermission} from '@copor/ai_context_item/domain/AiContextItem/AiContextItemPermission';

export interface ValidateCanCreateAiContextItemContext {
	aiContextItemId: string;
}

export class ValidateCanCreateAiContextItem extends PermissionValidator<ValidateCanCreateAiContextItemContext> {
	public getPermissionType(): PermissionType {
		return AiContextItemPermission.canCreateAiContextItem;
	}
}