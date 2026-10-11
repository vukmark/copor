import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetNotificationTokenDTO} from './dto/GetNotificationTokenDTO';
import {GetAllNotificationTokensRepo} from '../repository/GetAllNotificationTokensRepo';

export class GetAllNotificationTokens extends ExecuteUseCase<string, GetAllNotificationTokensRepo, GetNotificationTokenDTO[]> {
	public execute(): Promise<GetNotificationTokenDTO[]> {
		return this.repository.load(this.input);
	}
}
