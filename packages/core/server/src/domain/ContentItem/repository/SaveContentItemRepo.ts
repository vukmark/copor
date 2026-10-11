import {SaveContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/SaveContentItemDTO';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';

export type SaveContentItemRepo = SaveItem<SaveContentItemDTO>;