import {GetChatInfoDTO} from './dto/GetChatInfoDTO';
import {GetItemUseCase} from '@copor/core/domain/Core/Interactors/GetItemUseCase';

export class GetChatInfo extends GetItemUseCase<GetChatInfoDTO> {}
