import {CreateUseCase} from '@copor/core/domain/Core/Interactors/CreateUseCase';
import {SaveContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/SaveContentItemDTO';

export class CreateContentItem extends CreateUseCase<SaveContentItemDTO> {}