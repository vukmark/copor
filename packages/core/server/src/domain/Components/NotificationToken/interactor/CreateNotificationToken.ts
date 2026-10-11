import {CreateUseCase} from '@copor/core/domain/Core/Interactors/CreateUseCase';
import {SaveNotificationTokenDTO} from './dto/SaveNotificationTokenDTO';


export class CreateNotificationToken extends CreateUseCase<SaveNotificationTokenDTO> {}
