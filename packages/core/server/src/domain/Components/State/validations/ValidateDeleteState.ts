import {ValidateCanDeleteState} from './permissions/ValidateCanDeleteState';
import {ValidateDeleteStateRepo} from '../repository/ValidateDeleteStateRepo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateState} from '@copor/core/domain/Core/Validations/Validators/ValidateState';
import {ValidateDeleteStateDTO} from './dto/ValidateDeleteStateDTO';
import {ValidateEntityIsNotReferenced} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export class ValidateDeleteState
	extends ValidationWithPermissionAndRepo<ValidateDeleteStateDTO, ValidateDeleteStateRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteState(this.permissionRepo, this.input.actorId),
			new ValidateState(this.storageRepo, this.input.stateId),
			new ValidateEntityIsNotReferenced(this.storageRepo, this.input.stateId)
		];
	}
}
