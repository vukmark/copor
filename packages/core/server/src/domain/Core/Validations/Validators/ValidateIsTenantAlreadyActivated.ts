import {ValidatorWithRepo} from './ValidatorWithRepo';
import {TenantAlreadyActivatedRepo} from '@copor/core/domain/Components/Tenant/TenantRegistration/repository/TenantAlreadyActivatedRepo';
import {TenantAlreadyActivatedException} from '@copor/core/domain/Components/Tenant/TenantRegistration/exception/TenantAlreadyActivatedException';

export class ValidateIsTenantAlreadyActivated extends ValidatorWithRepo<TenantAlreadyActivatedRepo, string> {
	public async validate(): Promise<void> {
		if (await this.repository.tenantAlreadyActivated(this.input)) {
			throw new TenantAlreadyActivatedException();
		}
	}
}
