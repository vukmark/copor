import {IsInvalidPhoneNumberRepo} from './IsInvalidPhoneNumberRepo';
import {EntityHasForeignKeyReferencesRepo} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export interface ValidateDeletePhoneNumberRepo extends IsInvalidPhoneNumberRepo, EntityHasForeignKeyReferencesRepo {}