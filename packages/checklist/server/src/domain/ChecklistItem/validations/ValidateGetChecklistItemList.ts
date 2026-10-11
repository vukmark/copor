import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
	ValidateCanGetChecklistItemList
} from '@copor/checklist/domain/ChecklistItem/validations/validators/ValidateCanGetChecklistItemList';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateChecklist} from '@copor/checklist/domain/Checklist/validations/ValidateChecklist';
import {ValidateGetChecklistItemListRepo} from '@copor/checklist/domain/ChecklistItem/repository/ValidateGetChecklistItemListRepo';
import {ValidateGetChecklistItemListDTO} from '@copor/checklist/domain/ChecklistItem/validations/dto/ValidateGetChecklistItemListDTO';

export class ValidateGetChecklistItemList
	extends ValidationWithPermissionAndRepo<ValidateGetChecklistItemListDTO, ValidateGetChecklistItemListRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetChecklistItemList(this.permissionRepo, this.input.actorId),
			new ValidateChecklist(this.storageRepo, this.input.checklistId)
		];
	}
}
