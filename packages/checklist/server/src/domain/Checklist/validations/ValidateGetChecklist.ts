import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateGetChecklistDTO} from './dto/ValidateGetChecklistDTO';
import {ValidateGetChecklistRepo} from '../repository/ValidateGetChecklistRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetChecklist} from './permissions/ValidateCanGetChecklist';
import {ValidateChecklist} from '@copor/checklist/domain/Checklist/validations/ValidateChecklist';

export class ValidateGetChecklist extends ValidationWithPermissionAndRepo<ValidateGetChecklistDTO, ValidateGetChecklistRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetChecklist(this.permissionRepo, this.input.actorId),
			new ValidateChecklist(this.storageRepo, this.input.checklistId),
		];
	}
}