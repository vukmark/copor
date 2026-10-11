import {ValidateGetTenantRepo} from '@copor/core/domain/Components/Tenant/validations/dto/ValidateGetTenantRepo';

export class FakeGetTenantValidatorStorageRepo implements ValidateGetTenantRepo {
	isInvalidTenant(tenantId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
