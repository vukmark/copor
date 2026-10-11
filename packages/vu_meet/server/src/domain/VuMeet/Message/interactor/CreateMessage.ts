import {CreateUseCase} from '@copor/core/domain/Core/Interactors/CreateUseCase';

import {SaveMessageDTO} from './dto/SaveMessageDTO';

export class CreateMessage extends CreateUseCase<SaveMessageDTO> {
}
