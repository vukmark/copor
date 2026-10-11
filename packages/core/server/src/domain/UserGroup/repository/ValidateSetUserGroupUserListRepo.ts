import {IsInvalidUserGroupRepo} from '@copor/core/domain/UserGroup/repository/IsNotValidUserGroupRepo';
import {IsUserGroupSpecialRepo} from '@copor/core/domain/UserGroup/repository/IsUserGroupSpecialRepo';

export interface ValidateSetUserGroupUserListRepo
	extends IsInvalidUserGroupRepo, IsUserGroupSpecialRepo {

}