import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {ChecklistPermission} from '@copor/checklist/domain/Checklist/ChecklistPermission';

export class ValidateCanGetChecklist extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return ChecklistPermission.canGetChecklist;
	}
}