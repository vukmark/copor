import {IsInvalidRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/IsInvalidRegionCityRepo';
import {IsInvalidRegionRepo} from '@copor/core/domain/Components/Region/repository/IsInvalidRegionRepo';

export interface ValidateUpdateRegionCityRepo extends IsInvalidRegionCityRepo, IsInvalidRegionRepo {}