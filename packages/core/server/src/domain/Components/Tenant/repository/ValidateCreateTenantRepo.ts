import {IsNotValidUserRepo} from '@copor/core/domain/User/repository/IsNotValidUserRepo';
import {IsInvalidRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/IsInvalidRegionCityRepo';

export interface ValidateCreateTenantRepo extends
	IsInvalidRegionCityRepo,
	IsNotValidUserRepo {
}
