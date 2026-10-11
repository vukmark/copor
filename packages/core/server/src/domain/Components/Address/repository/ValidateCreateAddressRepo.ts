import {IsInvalidCountryRepo} from '../../Country/repository/IsInvalidCountryRepo';
import {IsInvalidStateRepo} from '../../State/repository/IsInvalidStateRepo';

export interface ValidateCreateAddressRepo extends IsInvalidCountryRepo, IsInvalidStateRepo {
}