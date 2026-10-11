import {CreateUseCase} from '@copor/core/domain/Core/Interactors/CreateUseCase';
import {SaveResetCodeDTO} from '@copor/core/domain/User/PasswordReset/interactor/dto/SaveResetCodeDTO';


export class CreateSendPasswordResetCodeInteractorRepo extends CreateUseCase<SaveResetCodeDTO> {}