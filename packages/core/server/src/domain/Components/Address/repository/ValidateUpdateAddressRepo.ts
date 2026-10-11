import {IsInvalidCountryRepo} from '../../Country/repository/IsInvalidCountryRepo';
import {IsInvalidStateRepo} from '../../State/repository/IsInvalidStateRepo';

import {IsInvalidAddressRepo} from './IsInvalidAddressRepo';

export interface ValidateUpdateAddressRepo extends IsInvalidAddressRepo, IsInvalidCountryRepo, IsInvalidStateRepo {
}