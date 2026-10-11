import {GetItemUseCase} from '@copor/core/domain/Core/Interactors/GetItemUseCase';
import {GetRoleDTO} from './dto/GetRoleDTO';

export class GetRole extends GetItemUseCase<GetRoleDTO> {}