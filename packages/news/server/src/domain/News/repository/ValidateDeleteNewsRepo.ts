import {IsInvalidNewsRepo} from '@copor/news/domain/News/repository/IsInvalidNewsRepo';
import {EntityHasForeignKeyReferencesRepo} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export interface ValidateDeleteNewsRepo extends IsInvalidNewsRepo, EntityHasForeignKeyReferencesRepo {}