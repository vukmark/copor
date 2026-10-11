import {IsInvalidFileSizeRepo} from '@copor/core/domain/Core/Repository/IsInvalidFileSizeRepo';
import {IsInvalidUserGroupRepo} from '@copor/core/domain/UserGroup/repository/IsNotValidUserGroupRepo';
import {IsUserNotInUserGroupRepo} from '@copor/cloud/domain/Cloud/repository/IsUserNotInUserGroupRepo';
import {IsUserNotVisibleRepo} from '@copor/core/domain/User/VisibleUsers/repository/IsUserNotVisibleRepo';

export interface ValidateCreateFileRepo extends
	IsInvalidFileSizeRepo,
	IsInvalidUserGroupRepo,
	IsUserNotInUserGroupRepo,
	IsUserNotVisibleRepo {}
