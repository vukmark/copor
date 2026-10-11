import {GetFileDTO} from '@copor/cloud/domain/Cloud/interactor/dto/GetFileDTO';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';

export type GetFileRepo = GetItem<GetFileDTO>;