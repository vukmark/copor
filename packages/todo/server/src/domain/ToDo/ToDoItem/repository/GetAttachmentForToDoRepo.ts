import {GetAttachmentForToDoDTO} from '../interactor/dto/GetAttachmentForToDoDTO';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';

export type GetAttachmentForToDoRepo = GetItem<GetAttachmentForToDoDTO>;
