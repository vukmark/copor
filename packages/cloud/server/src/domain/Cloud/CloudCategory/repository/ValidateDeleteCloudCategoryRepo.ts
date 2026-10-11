import {IsInvalidCloudCategoryRepo} from './IsInvalidCloudCategoryRepo';
import {EntityHasForeignKeyReferencesRepo} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export interface ValidateDeleteCloudCategoryRepo
	extends IsInvalidCloudCategoryRepo, EntityHasForeignKeyReferencesRepo {}
