import {IsInvalidContentItemRepo} from '@copor/core/domain/ContentItem/repository/IsInvalidContentItemRepo';
import {EntityHasForeignKeyReferencesRepo} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export interface ValidateDeleteContentItemRepo extends IsInvalidContentItemRepo, EntityHasForeignKeyReferencesRepo {}