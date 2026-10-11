import {ListItemsUseCase} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';
import {GetAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/GetAiContextItemDTO';

export class GetAiContextItemList extends ListItemsUseCase<GetAiContextItemDTO> {}