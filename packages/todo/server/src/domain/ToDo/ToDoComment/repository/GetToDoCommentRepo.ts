import {GetToDoCommentDTO} from '../interactor/dto/GetToDoCommentDTO';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';

export type GetToDoCommentRepo = GetItem<GetToDoCommentDTO>;