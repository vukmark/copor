import {IsInvalidChatRepo} from '../../../Message/repository/IsInvalidChatRepo';
import {IsUserNotInChatRepo} from '../../../Message/repository/IsUserNotInChatRepo';

export interface ValidateMarkChatMessagesSeenRepo extends IsInvalidChatRepo, IsUserNotInChatRepo {
}
