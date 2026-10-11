import {IsInvalidChecklistItemRepo} from './IsInvalidChecklistItemRepo';
import {IsInvalidChecklistRepo} from '@copor/checklist/domain/Checklist/repository/IsInvalidChecklistRepo';

export interface ValidateUpdateChecklistItemRepo extends IsInvalidChecklistItemRepo, IsInvalidChecklistRepo {}