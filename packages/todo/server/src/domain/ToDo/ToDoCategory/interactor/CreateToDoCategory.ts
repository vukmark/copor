import {CreateUseCase} from '@copor/core/domain/Core/Interactors/CreateUseCase';
import {SaveToDoCategoryDTO} from './dto/SaveToDoCategoryDTO';

export class CreateToDoCategory extends CreateUseCase<SaveToDoCategoryDTO> {}