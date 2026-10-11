import {IsInvalidRoleRepo} from '../../Components/Role/repository/IsInvalidRoleRepo';
import {IsNotValidUserRepo} from '../../User/repository/IsNotValidUserRepo';

export interface ValidateUpdatePersonalDataRepo extends IsNotValidUserRepo, IsInvalidRoleRepo {
}