import {CreateUseCase} from '@copor/core/domain/Core/Interactors/CreateUseCase';
import {SaveAuthUserDTO} from '@copor/core/domain/User/interactor/dto/SaveAuthUserDTO';

export class CreateAuthUser extends CreateUseCase<SaveAuthUserDTO> {
}