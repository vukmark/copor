import {GetRegionDTO} from './dto/GetRegionDTO';
import {GetItemUseCase} from '@copor/core/domain/Core/Interactors/GetItemUseCase';

export class GetRegion extends GetItemUseCase<GetRegionDTO> {}