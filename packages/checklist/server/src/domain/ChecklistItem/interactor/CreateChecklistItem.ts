import {SaveChecklistItemDTO} from '../../Checklist/interactor/dto/SaveChecklistItemDTO';
import {CreateUseCase} from '@copor/core/domain/Core/Interactors/CreateUseCase';

export class CreateChecklistItem extends CreateUseCase<SaveChecklistItemDTO> {}