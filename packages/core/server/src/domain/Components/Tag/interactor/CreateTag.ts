import {SaveTagDTO} from './dto/SaveTagDTO';
import {CreateUseCase} from '../../../Core/Interactors/CreateUseCase';

export class CreateTag extends CreateUseCase<SaveTagDTO> {}