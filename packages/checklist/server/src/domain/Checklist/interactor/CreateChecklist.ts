import {SaveChecklistDTO} from './dto/SaveChecklistDTO';
import {CreateUseCase} from '@copor/core/domain/Core/Interactors/CreateUseCase';

export class CreateChecklist extends CreateUseCase<SaveChecklistDTO> {}