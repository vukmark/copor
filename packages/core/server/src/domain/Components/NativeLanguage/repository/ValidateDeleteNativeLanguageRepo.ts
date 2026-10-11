import {IsInvalidNativeLanguageRepo} from './IsInvalidNativeLanguageRepo';
import {EntityHasForeignKeyReferencesRepo} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export interface ValidateDeleteNativeLanguageRepo extends IsInvalidNativeLanguageRepo, EntityHasForeignKeyReferencesRepo {}
