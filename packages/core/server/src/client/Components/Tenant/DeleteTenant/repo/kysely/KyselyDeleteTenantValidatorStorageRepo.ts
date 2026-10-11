import {ValidateDeleteTenantRepo} from '@copor/core/domain/Components/Tenant/repository/ValidateDeleteTenantRepo';
import {TenantKyselyHelper} from '@copor/core/client/Components/Tenant/repositoryHelper/TenantKyselyHelper';

export class KyselyDeleteTenantValidatorStorageRepo implements ValidateDeleteTenantRepo {
	isInvalidTenant(tenantId: string): Promise<boolean> {
		return TenantKyselyHelper.isInvalidTenant(tenantId);
	}
	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return TenantKyselyHelper.hasTenantReferences(id);
	}
}
