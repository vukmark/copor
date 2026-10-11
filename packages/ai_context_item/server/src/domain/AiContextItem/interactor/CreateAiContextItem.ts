import {CreateUseCase} from '@copor/core/domain/Core/Interactors/CreateUseCase';
import {SaveAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/SaveAiContextItemDTO';

export class CreateAiContextItem
	extends CreateUseCase<SaveAiContextItemDTO> {}