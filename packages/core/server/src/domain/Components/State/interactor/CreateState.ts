import {SaveStateDTO} from './dto/SaveStateDTO';
import {CreateUseCase} from '@copor/core/domain/Core/Interactors/CreateUseCase';

export class CreateState extends CreateUseCase<SaveStateDTO> {}