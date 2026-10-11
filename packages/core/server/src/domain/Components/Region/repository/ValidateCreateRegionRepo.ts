import {IsInvalidCountryRepo} from '../../Country/repository/IsInvalidCountryRepo';
import {IsInvalidStateRepo} from '../../State/repository/IsInvalidStateRepo';

export interface ValidateCreateRegionRepo extends IsInvalidCountryRepo, IsInvalidStateRepo {
}