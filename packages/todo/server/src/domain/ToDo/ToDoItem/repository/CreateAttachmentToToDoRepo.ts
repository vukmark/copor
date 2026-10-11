import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveAttachmentForToDoDTO} from '../interactor/dto/SaveAttachmentForToDoDTO';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';

export interface CreateAttachmentToToDoRepo extends SaveItem<SaveAttachmentForToDoDTO>, UniqueIdGenerator {}