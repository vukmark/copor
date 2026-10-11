import {IsInvalidChatRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/IsInvalidChatRepo';
import {IsUserNotInChatRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/IsUserNotInChatRepo';

export interface ValidateStartPrivateCallRepo extends IsInvalidChatRepo, IsUserNotInChatRepo {
}