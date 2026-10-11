import {IsInvalidTenantRepo} from './IsInvalidTenantRepo';
import {EntityHasForeignKeyReferencesRepo} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export interface ValidateDeleteTenantRepo extends IsInvalidTenantRepo, EntityHasForeignKeyReferencesRepo {}