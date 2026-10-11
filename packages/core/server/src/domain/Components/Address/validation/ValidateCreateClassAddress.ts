import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCountry} from '@copor/core/domain/Core/Validations/Validators/ValidateCountry';
import {ValidateState} from '@copor/core/domain/Core/Validations/Validators/ValidateState';
import {ValidateCanCreateAddress} from './validator/ValidateCanCreateAddress';
import {ValidateCreateAddressDTO} from './dto/ValidateCreateAddressDTO';
import {ValidateCreateAddressRepo} from '../repository/ValidateCreateAddressRepo';

export class ValidateCreateClassAddress extends ValidationWithPermissionAndRepo<ValidateCreateAddressDTO, ValidateCreateAddressRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateAddress(this.permissionRepo, this.input.actorId),
			new ValidateCountry(this.storageRepo, this.input.country),
			new ValidateState(this.storageRepo, this.input.state)
		];
	}
}