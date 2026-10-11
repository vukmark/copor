import {SaveToDoCommentDTO} from '../interactor/dto/SaveToDoCommentDTO';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';

export type SaveToDoCommentRepo = SaveItem<SaveToDoCommentDTO>;
