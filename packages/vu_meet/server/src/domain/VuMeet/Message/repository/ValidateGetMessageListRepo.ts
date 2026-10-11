import {IsInvalidChatRepo} from './IsInvalidChatRepo';
import {IsUserNotInChatRepo} from './IsUserNotInChatRepo';

export interface ValidateGetMessageListRepo extends IsInvalidChatRepo, IsUserNotInChatRepo {
}
