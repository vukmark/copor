import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SavePrivateToDoDTO} from '../interactor/dto/SavePrivateToDoDTO';

export interface SavePrivateToDoRepo extends SaveItem<SavePrivateToDoDTO> {}