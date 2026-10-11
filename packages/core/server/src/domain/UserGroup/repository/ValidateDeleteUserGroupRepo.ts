import {IsInvalidUserGroupRepo} from '@copor/core/domain/UserGroup/repository/IsNotValidUserGroupRepo';

import {DoesUserGroupHaveNoChildrenRepo} from './DoesUserGroupHaveNoChildrenRepo';
import {IsUserGroupSpecialRepo} from '@copor/core/domain/UserGroup/repository/IsUserGroupSpecialRepo';
import {EntityHasForeignKeyReferencesRepo} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export interface ValidateDeleteUserGroupRepo
	extends
	IsInvalidUserGroupRepo,
	DoesUserGroupHaveNoChildrenRepo,
	IsUserGroupSpecialRepo,
	EntityHasForeignKeyReferencesRepo {}