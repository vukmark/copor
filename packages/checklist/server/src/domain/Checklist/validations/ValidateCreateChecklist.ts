import {ValidateCanCreateChecklist} from './permissions/ValidateCanCreateChecklist';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCreateChecklistDTO} from '@copor/checklist/domain/Checklist/validations/dto/ValidateCreateChecklistDTO';

export class ValidateCreateChecklist extends ValidationWithPermission<ValidateCreateChecklistDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateChecklist(this.permissionRepo, this.input.actorId)
		];
	}
}