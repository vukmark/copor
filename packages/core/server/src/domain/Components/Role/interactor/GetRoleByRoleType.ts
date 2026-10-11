import {GetRoleDTO} from './dto/GetRoleDTO';
import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export interface GetRoleByRoleTypeRepo {
	load(input: RoleType): Promise<GetRoleDTO>;
}

export class GetRoleByRoleType extends ExecuteUseCase<RoleType, GetRoleByRoleTypeRepo, GetRoleDTO> {
	public async execute(): Promise<GetRoleDTO> {
		return await this.repository.load(this.input);
	}
}