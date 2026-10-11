import {IsUserNotInChatRepo} from './IsUserNotInChatRepo';
import {IsInvalidChatRepo} from './IsInvalidChatRepo';

export interface ValidateSearchMessagesInChatRepo extends IsUserNotInChatRepo, IsInvalidChatRepo {
}
