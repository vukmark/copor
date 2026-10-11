import {IsInvalidRoleRepo} from './IsInvalidRoleRepo';

import {IsDefaultRoleForRoleTypeRepo} from '@copor/core/domain/Components/Role/repository/IsDefaultRoleForRoleTypeRepo';
import {EntityHasForeignKeyReferencesRepo} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export interface ValidateDeleteRoleRepo
	extends IsInvalidRoleRepo, IsDefaultRoleForRoleTypeRepo, EntityHasForeignKeyReferencesRepo {}
