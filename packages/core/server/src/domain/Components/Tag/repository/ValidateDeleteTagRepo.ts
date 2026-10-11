import {IsInvalidTagRepo} from './IsInvalidTagRepo';
import {EntityHasForeignKeyReferencesRepo} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export interface ValidateDeleteTagRepo extends IsInvalidTagRepo, EntityHasForeignKeyReferencesRepo {}
