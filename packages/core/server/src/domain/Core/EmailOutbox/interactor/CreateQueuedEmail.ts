import {SaveQueuedEmailDTO} from './dto/SaveQueuedEmailDTO';
import {CreateUseCase} from '@copor/core/domain/Core/Interactors/CreateUseCase';

export class CreateQueuedEmail extends CreateUseCase<SaveQueuedEmailDTO> {
}