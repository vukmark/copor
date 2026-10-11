import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetAdminUserIdListRepo} from '@copor/core/domain/User/repository/GetAdminUserIdListRepo';

export class GetAdminUserIdList extends ExecuteUseCase<undefined, GetAdminUserIdListRepo, string[]> {
	public async execute(): Promise<string[]> {
		return this.repository.list();
	}
}
