import {ValidateCanEditChecklistItem} from '@copor/checklist/domain/ChecklistItem/validations/validators/ValidateCanEditChecklistItem';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateChecklistItem} from '@copor/checklist/domain/ChecklistItem/validations/ValidateChecklistItem';
import {ValidateUpdateChecklistItemRepo} from '../repository/ValidateUpdateChecklistItemRepo';
import {ValidateUpdateChecklistItemDTO} from '@copor/checklist/domain/ChecklistItem/validations/dto/ValidateUpdateChecklistItemDTO';
import {ValidateChecklist} from '@copor/checklist/domain/Checklist/validations/ValidateChecklist';

export class ValidateUpdateChecklistItem
	extends ValidationWithPermissionAndRepo<ValidateUpdateChecklistItemDTO, ValidateUpdateChecklistItemRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanEditChecklistItem(this.permissionRepo, this.input.actorId),
			new ValidateChecklistItem(this.storageRepo, this.input.id),
			new ValidateChecklist(this.storageRepo, this.input.checklistId)
		];
	}
}