import {MessageCreatedNotificationTranslationData}
	from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/MessageCreatedNotificationTranslationData';
import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveNotificationRepo} from '@copor/core/domain/Components/Notification/repository/SaveNotificationRepo';
import {SaveNotificationDTO} from '@copor/core/domain/Components/Notification/interactor/dto/SaveNotificationDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {FakeSaveNotificationRepo} from '@copor/core/client/Components/Notification/repo/fake/FakeSaveNotificationRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	KyselySaveCreatedMessageNotificationRepo
} from '@copor/vu_meet/client/VuMeet/Message/CreateMessage/repo/kysely/KyselySaveCreatedMessageNotificationRepo';

export class SaveCreatedMessageNotificationRepoPicker
	extends NewRepositoryPicker<SaveNotificationRepo<SaveNotificationDTO<MessageCreatedNotificationTranslationData>>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	SaveNotificationRepo<SaveNotificationDTO<MessageCreatedNotificationTranslationData>>> {
		return {
			[DBEnv.FAKE]:
				FakeSaveNotificationRepo<SaveNotificationDTO<MessageCreatedNotificationTranslationData>>,
			[DBEnv.KYSELY]:
				KyselySaveCreatedMessageNotificationRepo
		};
	}
}
