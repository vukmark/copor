import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCountry} from '@copor/core/domain/Core/Validations/Validators/ValidateCountry';
import {ValidateState} from '@copor/core/domain/Core/Validations/Validators/ValidateState';
import {ValidateAddress} from './validator/ValidateAddress';
import {ValidateCanUpdateAddress} from './validator/ValidateCanUpdateAddress';
import {ValidateUpdateAddressDTO} from './dto/ValidateUpdateAddressDTO';
import {ValidateUpdateAddressRepo} from '../repository/ValidateUpdateAddressRepo';

export class ValidateUpdateAddress extends ValidationWithPermissionAndRepo<ValidateUpdateAddressDTO, ValidateUpdateAddressRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateAddress(this.permissionRepo, this.input.actorId),
			new ValidateAddress(this.storageRepo, this.input.id),
			new ValidateCountry(this.storageRepo, this.input.country),
			new ValidateState(this.storageRepo, this.input.state)
		];
	}
}