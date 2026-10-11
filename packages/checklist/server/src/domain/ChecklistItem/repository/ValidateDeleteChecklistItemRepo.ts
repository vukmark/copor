import {IsInvalidChecklistItemRepo} from './IsInvalidChecklistItemRepo';
import {EntityHasForeignKeyReferencesRepo} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export interface ValidateDeleteChecklistItemRepo
	extends IsInvalidChecklistItemRepo, EntityHasForeignKeyReferencesRepo {}