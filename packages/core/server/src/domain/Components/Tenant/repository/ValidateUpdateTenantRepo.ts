import {IsNotValidUserRepo} from '@copor/core/domain/User/repository/IsNotValidUserRepo';
import {IsInvalidRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/IsInvalidRegionCityRepo';
import {IsInvalidTenantRepo} from '@copor/core/domain/Components/Tenant/repository/IsInvalidTenantRepo';

export interface ValidateUpdateTenantRepo extends
	IsInvalidRegionCityRepo,
	IsNotValidUserRepo,
	IsInvalidTenantRepo {
}