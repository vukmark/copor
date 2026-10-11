import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveNotificationRepo} from '../repository/SaveNotificationRepo';
import {SaveNotificationDTO} from './dto/SaveNotificationDTO';


export class CreateNotification<TranslationData>
	extends ExecuteUseCase<SaveNotificationDTO<TranslationData>, SaveNotificationRepo<SaveNotificationDTO<TranslationData>>, string> {
	public execute(): Promise<string> {
		return this.repository.save(this.input);
	}
}
