import {GetPrivateToDoDTO} from '../interactor/dto/GetPrivateToDoDTO';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';

export type GetPrivateToDoRepo = GetItem<GetPrivateToDoDTO>;