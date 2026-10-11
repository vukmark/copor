import {GetToDoCommentDTO} from './dto/GetToDoCommentDTO';
import {GetItemUseCase} from '@copor/core/domain/Core/Interactors/GetItemUseCase';

export class GetToDoComment extends GetItemUseCase<GetToDoCommentDTO> {}