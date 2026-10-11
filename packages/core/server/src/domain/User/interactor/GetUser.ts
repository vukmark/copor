import {GetUserDTO} from '@copor/core/domain/User/interactor/dto/GetUserDTO';
import {GetItemUseCase} from '@copor/core/domain/Core/Interactors/GetItemUseCase';

export class GetUser extends GetItemUseCase<GetUserDTO> {}