import {IsInvalidStateRepo} from './IsInvalidStateRepo';
import {IsInvalidCountryRepo} from '../../Country/repository/IsInvalidCountryRepo';

export interface ValidateUpdateStateRepo extends IsInvalidStateRepo, IsInvalidCountryRepo {
}