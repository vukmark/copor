import {ValidateCreateTenantRepo}
	from '@copor/core/domain/Components/Tenant/repository/ValidateCreateTenantRepo';

export class FakeCreateTenantValidatorStorageRepo implements ValidateCreateTenantRepo {
	isInvalidRegionCity(regionCityId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
