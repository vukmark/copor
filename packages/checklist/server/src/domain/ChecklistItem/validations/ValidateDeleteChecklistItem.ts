import {ValidateCanDeleteChecklistItem} from '@copor/checklist/domain/ChecklistItem/validations/validators/ValidateCanDeleteChecklistItem';
import {ValidateDeleteChecklistItemDTO} from './dto/ValidateDeleteChecklistItemDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateDeleteChecklistItemRepo} from '../repository/ValidateDeleteChecklistItemRepo';
import {ValidateChecklistItem} from '@copor/checklist/domain/ChecklistItem/validations/ValidateChecklistItem';
import {ValidateEntityIsNotReferenced} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';


export class ValidateDeleteChecklistItem
	extends ValidationWithPermissionAndRepo<ValidateDeleteChecklistItemDTO, ValidateDeleteChecklistItemRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteChecklistItem(this.permissionRepo, this.input.actorId),
			new ValidateChecklistItem(this.storageRepo, this.input.checklistItemId),
			new ValidateEntityIsNotReferenced(this.storageRepo, this.input.checklistItemId)
		];
	}
}