import {SaveUserDTO} from '@copor/core/domain/User/interactor/dto/SaveUserDTO';
import {CreateUseCase} from '@copor/core/domain/Core/Interactors/CreateUseCase';

export class CreateUser extends CreateUseCase<SaveUserDTO> {
}
