import {SaveChecklistItemDTO} from '../../Checklist/interactor/dto/SaveChecklistItemDTO';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';

export type SaveChecklistItemRepo = SaveItem<SaveChecklistItemDTO>;