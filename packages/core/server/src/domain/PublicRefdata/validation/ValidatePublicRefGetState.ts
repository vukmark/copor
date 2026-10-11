import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateGetStateRepo} from '@copor/core/domain/Components/State/repository/ValidateGetStateRepo';
import {ValidateState} from '@copor/core/domain/Core/Validations/Validators/ValidateState';
import {ValidateGetStateDTO} from '@copor/core/domain/Components/State/validations/dto/ValidateGetStateDTO';
import {ValidationWithRepo} from '@copor/core/domain/Core/Validations/ValidationWithRepo';

export class ValidatePublicRefGetState extends ValidationWithRepo<ValidateGetStateDTO, ValidateGetStateRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateState(this.storageRepo, this.input.stateId)
		];
	}
}
