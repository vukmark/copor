import {CreateUseCase} from '@copor/core/domain/Core/Interactors/CreateUseCase';
import {SaveRegionDTO} from './dto/SaveRegionDTO';

export class CreateRegion extends CreateUseCase<SaveRegionDTO> {}
