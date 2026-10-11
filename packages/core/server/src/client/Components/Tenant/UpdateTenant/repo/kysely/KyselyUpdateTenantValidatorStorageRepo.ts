import {ValidateUpdateTenantRepo} from '@copor/core/domain/Components/Tenant/repository/ValidateUpdateTenantRepo';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';
import {TenantKyselyHelper} from '@copor/core/client/Components/Tenant/repositoryHelper/TenantKyselyHelper';
import {RegionCityKyselyHelper} from '@copor/core/client/Components/RegionCity/repositoryHelper/RegionCityKyselyHelper';

export class KyselyUpdateTenantValidatorStorageRepo implements ValidateUpdateTenantRepo {
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return UserKyselyHelper.isNotValidUser(userId);
	}
	isInvalidTenant(tenantId: string | undefined): Promise<boolean> {
		return TenantKyselyHelper.isInvalidTenant(tenantId);
	}
	isInvalidRegionCity(regionCityId: string | undefined): Promise<boolean> {
		return RegionCityKyselyHelper.isInvalidRegionCity(regionCityId);
	}
}
