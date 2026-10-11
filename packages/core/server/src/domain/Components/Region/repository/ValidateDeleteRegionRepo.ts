import {IsInvalidRegionRepo} from './IsInvalidRegionRepo';
import {EntityHasForeignKeyReferencesRepo} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export interface ValidateDeleteRegionRepo extends IsInvalidRegionRepo, EntityHasForeignKeyReferencesRepo {}
