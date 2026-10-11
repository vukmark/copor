import {IsInvalidContractTypeRepo} from './IsInvalidContractTypeRepo';
import {EntityHasForeignKeyReferencesRepo} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export interface ValidateDeleteContractTypeRepo
	extends IsInvalidContractTypeRepo, EntityHasForeignKeyReferencesRepo {}