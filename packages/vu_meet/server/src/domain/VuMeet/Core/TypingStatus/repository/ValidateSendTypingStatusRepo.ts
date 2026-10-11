import {IsInvalidChatRepo} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/repository/IsInvalidChatRepo';
import {IsUserNotInChatRepo} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/repository/IsUserNotInChatRepo';

export interface ValidateSendTypingStatusRepo extends IsUserNotInChatRepo, IsInvalidChatRepo {
}
