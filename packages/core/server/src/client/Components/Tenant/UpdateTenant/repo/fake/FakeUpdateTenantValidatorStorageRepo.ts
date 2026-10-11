import {ValidateUpdateTenantRepo} from '@copor/core/domain/Components/Tenant/repository/ValidateUpdateTenantRepo';

export class FakeUpdateTenantValidatorStorageRepo implements ValidateUpdateTenantRepo {
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isInvalidTenant(tenantId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isInvalidRegionCity(regionCityId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
