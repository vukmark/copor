import {ValidateDeleteChecklistDTO} from './dto/ValidateDeleteChecklistDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateDeleteChecklistRepo} from '../repository/ValidateDeleteChecklistRepo';
import {ValidateChecklist} from '@copor/checklist/domain/Checklist/validations/ValidateChecklist';
import {ValidateCanDeleteChecklist} from './permissions/ValidateCanDeleteChecklist';
import {ValidateEntityIsNotReferenced} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export class ValidateDeleteChecklist extends ValidationWithPermissionAndRepo<ValidateDeleteChecklistDTO, ValidateDeleteChecklistRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteChecklist(this.permissionRepo, this.input.actorId),
			new ValidateChecklist(this.storageRepo, this.input.actorId),
			new ValidateEntityIsNotReferenced(this.storageRepo, this.input.checklistId)
		];
	}
}