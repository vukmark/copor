import {GetStateDTO} from '../interactor/dto/GetStateDTO';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';

export type GetStateRepo = GetItem<GetStateDTO>;