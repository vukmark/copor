import {IsInvalidChatRepo} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/repository/IsInvalidChatRepo';
import {IsUserNotInChatRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/IsUserNotInChatRepo';
import {IsUserNotVisibleRepo} from '@copor/core/domain/User/VisibleUsers/repository/IsUserNotVisibleRepo';


export type ValidateUpdateChatRepo = IsInvalidChatRepo & IsUserNotInChatRepo & IsUserNotVisibleRepo;
