import {IsInvalidToDoAttachmentRepo} from './IsInvalidToDoAttachmentRepo';
import {IsForbiddenAttachmentForToDoAccessRepo} from './IsForbiddenAttachmentForToDoAccessRepo';

export interface ValidateDeleteAttachmentForToDoRepo extends IsInvalidToDoAttachmentRepo, IsForbiddenAttachmentForToDoAccessRepo {}
