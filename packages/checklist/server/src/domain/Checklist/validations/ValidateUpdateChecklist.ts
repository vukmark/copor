import {ValidateCanEditChecklist} from './permissions/ValidateCanEditChecklist';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateChecklist} from '@copor/checklist/domain/Checklist/validations/ValidateChecklist';
import {ValidateUpdateChecklistRepo} from '../repository/ValidateUpdateChecklistRepo';
import {ValidateUpdateChecklistDTO} from '@copor/checklist/domain/Checklist/validations/dto/ValidateUpdateChecklistDTO';

export class ValidateUpdateChecklist extends ValidationWithPermissionAndRepo<ValidateUpdateChecklistDTO, ValidateUpdateChecklistRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanEditChecklist(this.permissionRepo, this.input.actorId),
			new ValidateChecklist(this.storageRepo, this.input.id)
		];
	}
}