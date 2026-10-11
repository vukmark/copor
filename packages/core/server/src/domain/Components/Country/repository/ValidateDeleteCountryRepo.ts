import {IsInvalidCountryRepo} from './IsInvalidCountryRepo';
import {EntityHasForeignKeyReferencesRepo} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export interface ValidateDeleteCountryRepo extends IsInvalidCountryRepo, EntityHasForeignKeyReferencesRepo {}