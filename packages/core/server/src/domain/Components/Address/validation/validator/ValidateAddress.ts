import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {InvalidAddressException} from '../../exception/InvalidAddressException';
import {IsInvalidAddressRepo} from '../../repository/IsInvalidAddressRepo';

export class ValidateAddress extends ValidatorWithRepo<IsInvalidAddressRepo, string> {
	public async validate(): Promise<void> {
		if (await this.repository.isInvalidAddress(this.input))
			throw new InvalidAddressException();
	}
}