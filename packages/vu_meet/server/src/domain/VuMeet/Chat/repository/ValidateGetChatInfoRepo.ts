import {IsInvalidChatRepo} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/repository/IsInvalidChatRepo';
import {IsUserNotInChatRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/IsUserNotInChatRepo';


export type ValidateGetChatInfoRepo = IsInvalidChatRepo & IsUserNotInChatRepo;

