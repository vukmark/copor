import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveChatDTO} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/dto/SaveChatDTO';

export type SaveChatRepo = SaveItem<SaveChatDTO>;