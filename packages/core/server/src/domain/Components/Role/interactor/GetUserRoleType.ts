import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';

export interface GetUserRoleTypeRepo {
	load(userId: string): Promise<RoleType>;
}

export class GetUserRoleType extends ExecuteUseCase<string, GetUserRoleTypeRepo, RoleType> {
	public async execute(): Promise<RoleType> {
		return await this.repository.load(this.input);
	}
}