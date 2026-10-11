import {GetChecklistDTO} from '../interactor/dto/GetChecklistDTO';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';

export type GetChecklistRepo = GetItem<GetChecklistDTO>;