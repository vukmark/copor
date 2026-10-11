import {GetChatInfoDTO} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/dto/GetChatInfoDTO';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';

export type GetChatInfoRepo = GetItem<GetChatInfoDTO>;