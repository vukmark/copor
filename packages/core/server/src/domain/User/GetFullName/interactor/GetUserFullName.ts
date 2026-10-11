import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetUserFullNameRepo} from '@copor/core/domain/User/repository/GetUserFullNameRepo';


export class GetUserFullName extends ExecuteUseCase<string, GetUserFullNameRepo, string> {
	public async execute(): Promise<string> {
		return this.repository.load(this.input);
	}
}
