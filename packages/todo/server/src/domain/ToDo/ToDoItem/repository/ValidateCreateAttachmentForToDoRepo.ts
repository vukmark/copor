import {IsInvalidToDoRepo} from './IsInvalidToDoRepo';
import {IsForbiddenToDoAttachmentAccessRepo} from './IsForbiddenToDoAttachmentAccessRepo';

export interface ValidateCreateAttachmentForToDoRepo extends IsInvalidToDoRepo, IsForbiddenToDoAttachmentAccessRepo {}
