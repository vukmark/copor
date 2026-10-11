import {IsInvalidRegionRepo} from './IsInvalidRegionRepo';
import {IsInvalidCountryRepo} from '../../Country/repository/IsInvalidCountryRepo';
import {IsInvalidStateRepo} from '../../State/repository/IsInvalidStateRepo';

export interface ValidateUpdateRegionRepo extends IsInvalidRegionRepo, IsInvalidCountryRepo, IsInvalidStateRepo {
}