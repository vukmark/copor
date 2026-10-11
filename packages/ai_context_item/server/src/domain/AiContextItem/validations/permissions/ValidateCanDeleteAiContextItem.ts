import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {AiContextItemPermission} from '@copor/ai_context_item/domain/AiContextItem/AiContextItemPermission';

export class ValidateCanDeleteAiContextItem extends
	PermissionValidator {
	public getPermissionType(): PermissionType {
		return AiContextItemPermission.canDeleteAiContextItem;
	}
}