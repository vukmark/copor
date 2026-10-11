import {ValidateCreateTenantRepo}
	from '@copor/core/domain/Components/Tenant/repository/ValidateCreateTenantRepo';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';
import {RegionCityKyselyHelper} from '@copor/core/client/Components/RegionCity/repositoryHelper/RegionCityKyselyHelper';

export class KyselyCreateTenantValidatorStorageRepo implements ValidateCreateTenantRepo {
	isInvalidRegionCity(regionCityId: string | undefined): Promise<boolean> {
		return RegionCityKyselyHelper.isInvalidRegionCity(regionCityId);
	}
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return UserKyselyHelper.isNotValidUser(userId);
	}
}
