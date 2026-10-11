import {IsInvalidUserGroupRepo} from '@copor/core/domain/UserGroup/repository/IsNotValidUserGroupRepo';
import {IsNotValidUserRepo} from '@copor/core/domain/User/repository/IsNotValidUserRepo';
import {IsUserGroupSpecialRepo} from '@copor/core/domain/UserGroup/repository/IsUserGroupSpecialRepo';

export interface ValidateAddUserToUserGroupRepo
	extends IsInvalidUserGroupRepo, IsNotValidUserRepo, IsUserGroupSpecialRepo {
}