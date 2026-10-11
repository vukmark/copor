import {GetFeatureListDTO} from './dto/GetFeatureListDTO';
import {GetItemUseCase} from '@copor/core/domain/Core/Interactors/GetItemUseCase';

export class GetFeatureList extends GetItemUseCase<GetFeatureListDTO> {}
