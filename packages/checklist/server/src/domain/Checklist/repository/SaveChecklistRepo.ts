import {SaveChecklistDTO} from '../interactor/dto/SaveChecklistDTO';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';

export type SaveChecklistRepo = SaveItem<SaveChecklistDTO>;