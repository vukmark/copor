import {ValidatorWithRepo} from './ValidatorWithRepo';
import {IsInvalidTenantRepo} from '@copor/core/domain/Components/Tenant/repository/IsInvalidTenantRepo';
import {InvalidTenantException} from '../../Exceptions/invalid/InvalidTenantException';

export class ValidateTenant extends ValidatorWithRepo<IsInvalidTenantRepo, string | undefined> {
	public async validate(): Promise<void> {
		if (await this.repository.isInvalidTenant(this.input))
			throw new InvalidTenantException();
	}
}
