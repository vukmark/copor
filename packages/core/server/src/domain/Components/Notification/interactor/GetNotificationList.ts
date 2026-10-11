import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetNotificationListRepo} from '../repository/GetNotificationListRepo';
import {GetNotificationDTO} from './dto/GetNotificationDTO';

export class GetNotificationList extends ExecuteUseCase<string, GetNotificationListRepo, GetNotificationDTO[]> {
	public execute(): Promise<GetNotificationDTO[]> {
		return this.repository.load(this.input);
	}
}
