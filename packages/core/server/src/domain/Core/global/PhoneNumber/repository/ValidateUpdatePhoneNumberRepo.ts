import {IsInvalidPhoneNumberRepo} from './IsInvalidPhoneNumberRepo';
import {IsNotValidUserRepo}        from '../../../../User/repository/IsNotValidUserRepo';

export interface ValidateUpdatePhoneNumberRepo extends IsInvalidPhoneNumberRepo, IsNotValidUserRepo {
}