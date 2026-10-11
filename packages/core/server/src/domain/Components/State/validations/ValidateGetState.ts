import {ValidateCanGetState} from './permissions/ValidateCanGetState';
import {ValidateGetStateDTO} from './dto/ValidateGetStateDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateState} from '@copor/core/domain/Core/Validations/Validators/ValidateState';
import {ValidateGetStateRepo} from '../repository/ValidateGetStateRepo';

export class ValidateGetState
	extends ValidationWithPermissionAndRepo<ValidateGetStateDTO, ValidateGetStateRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetState(this.permissionRepo, this.input.actorId),
			new ValidateState(this.storageRepo, this.input.stateId)
		];
	}
}