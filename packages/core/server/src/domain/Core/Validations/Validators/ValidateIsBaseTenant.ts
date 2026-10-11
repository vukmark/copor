import {ValidatorWithRepo} from './ValidatorWithRepo';
import {NotBaseTenantRepo} from '@copor/core/domain/Components/Tenant/TenantRegistration/repository/NotBaseTenantRepo';
import {NotBaseTenantException} from '../../Exceptions/NotBaseTenantException';

export class ValidateIsBaseTenant extends ValidatorWithRepo<NotBaseTenantRepo, string> {
	public async validate(): Promise<void> {
		if (await this.repository.isNotBaseTenant(this.input)) {
			throw new NotBaseTenantException();
		}
	}
}
