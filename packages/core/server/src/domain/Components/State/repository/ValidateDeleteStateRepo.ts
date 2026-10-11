import {IsInvalidStateRepo} from './IsInvalidStateRepo';
import {EntityHasForeignKeyReferencesRepo} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export interface ValidateDeleteStateRepo extends IsInvalidStateRepo, EntityHasForeignKeyReferencesRepo {}
