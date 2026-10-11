import {ValidateDeleteTenantRepo} from '@copor/core/domain/Components/Tenant/repository/ValidateDeleteTenantRepo';

export class FakeDeleteTenantValidatorStorageRepo implements ValidateDeleteTenantRepo {
	isInvalidTenant(tenantId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
	entityHasReferences(value: string): Promise<{tableName: string} | false> {
		return Promise.resolve(false);
	}
}