import {IsInvalidRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/IsInvalidRegionCityRepo';
import {EntityHasForeignKeyReferencesRepo} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export interface ValidateDeleteRegionCityRepo extends IsInvalidRegionCityRepo, EntityHasForeignKeyReferencesRepo {}