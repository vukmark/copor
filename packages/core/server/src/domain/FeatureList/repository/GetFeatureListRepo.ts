import {GetFeatureListDTO} from '@copor/core/domain/FeatureList/interactor/dto/GetFeatureListDTO';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';

export type GetFeatureListRepo = GetItem<GetFeatureListDTO>;