import {IsInvalidChecklistRepo} from './IsInvalidChecklistRepo';
import {EntityHasForeignKeyReferencesRepo} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export interface ValidateDeleteChecklistRepo extends IsInvalidChecklistRepo, EntityHasForeignKeyReferencesRepo {}