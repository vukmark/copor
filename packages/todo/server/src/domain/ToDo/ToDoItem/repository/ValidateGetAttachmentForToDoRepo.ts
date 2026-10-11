import {IsInvalidToDoAttachmentRepo} from './IsInvalidToDoAttachmentRepo';
import {IsForbiddenAttachmentForToDoAccessRepo} from './IsForbiddenAttachmentForToDoAccessRepo';

export interface ValidateGetAttachmentForToDoRepo extends IsInvalidToDoAttachmentRepo, IsForbiddenAttachmentForToDoAccessRepo {}
