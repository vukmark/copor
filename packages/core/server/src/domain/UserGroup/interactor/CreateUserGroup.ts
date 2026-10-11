import {SaveUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/SaveUserGroupDTO';
import {CreateUseCase} from '@copor/core/domain/Core/Interactors/CreateUseCase';

export class CreateUserGroup extends CreateUseCase<SaveUserGroupDTO> {
}
