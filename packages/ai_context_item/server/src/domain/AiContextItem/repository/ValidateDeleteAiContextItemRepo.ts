import {IsInvalidAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/IsInvalidAiContextItemRepo';
import {EntityHasForeignKeyReferencesRepo} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export interface ValidateDeleteAiContextItemRepo extends
	IsInvalidAiContextItemRepo, EntityHasForeignKeyReferencesRepo {}