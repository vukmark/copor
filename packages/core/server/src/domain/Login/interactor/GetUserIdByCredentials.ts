import {ExecuteUseCase} from '../../Core/Interactors/ExecuteUseCase';
import {GetUserIdByCredentialsRepo} from '../repository/GetUserIdByCredentialsRepo';
import {CredentialsDTO} from './dto/CredentialsDTO';
import {UserCredentialsResultDTO} from './dto/UserCredentialsResultDTO';

export class GetUserIdByCredentials extends ExecuteUseCase<CredentialsDTO, GetUserIdByCredentialsRepo, UserCredentialsResultDTO | undefined> {
	public async execute(): Promise<UserCredentialsResultDTO | undefined> {
		const result = await this.repository.getUserIdByCredentials(this.input);

		return result;
	}
}
