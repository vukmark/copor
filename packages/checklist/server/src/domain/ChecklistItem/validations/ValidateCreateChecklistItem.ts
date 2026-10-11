import {ValidateCanCreateChecklistItem} from '@copor/checklist/domain/ChecklistItem/validations/validators/ValidateCanCreateChecklistItem';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateChecklist} from '@copor/checklist/domain/Checklist/validations/ValidateChecklist';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateCreateChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/ValidateCreateChecklistItemRepo';
import {ValidateCreateChecklistItemDTO} from '@copor/checklist/domain/ChecklistItem/validations/dto/ValidateCreateChecklistItemDTO';

export class ValidateCreateChecklistItem
	extends ValidationWithPermissionAndRepo<ValidateCreateChecklistItemDTO, ValidateCreateChecklistItemRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateChecklistItem(this.permissionRepo, this.input.actorId),
			new ValidateChecklist(this.storageRepo, this.input.checklistId)
		];
	}
}