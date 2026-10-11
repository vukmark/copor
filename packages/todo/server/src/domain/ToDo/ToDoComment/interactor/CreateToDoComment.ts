import {CreateUseCase} from '@copor/core/domain/Core/Interactors/CreateUseCase';
import {SaveToDoCommentDTO} from './dto/SaveToDoCommentDTO';

export class CreateToDoComment extends CreateUseCase<SaveToDoCommentDTO> {}