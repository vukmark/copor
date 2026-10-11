import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveNewsDTO} from '@copor/news/domain/News/interactor/dto/SaveNewsDTO';

export type SaveNewsRepo = SaveItem<SaveNewsDTO>;