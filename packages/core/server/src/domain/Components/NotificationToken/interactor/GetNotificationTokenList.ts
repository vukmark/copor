import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetNotificationTokenListRepo} from '../repository/GetNotificationTokenListRepo';
import {GetNotificationTokenDTO} from './dto/GetNotificationTokenDTO';

export class GetNotificationTokenList extends ExecuteUseCase<string[], GetNotificationTokenListRepo, GetNotificationTokenDTO[]> {
	public async execute(): Promise<GetNotificationTokenDTO[]> {
		return await this.repository.load(this.input);
	}
}
