import {IsInvalidLanguageRepo} from './IsInvalidLanguageRepo';
import {EntityHasForeignKeyReferencesRepo} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export interface ValidateDeleteLanguageRepo extends IsInvalidLanguageRepo, EntityHasForeignKeyReferencesRepo {}
