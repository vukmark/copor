import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {RequestAccountDeletionValidatorStorageRepoPicker}
	from '@copor/core/client/User/RequestAccountDeletion/repo/repoPicker/RequestAccountDeletionValidatorStorageRepoPicker';
import {ValidateRequestAccountDeletion} from '@copor/core/domain/User/validation/ValidateRequestAccountDeletion';
import {RequestAccountDeletionInteractorRepoPicker}
	from '@copor/core/client/User/RequestAccountDeletion/repo/repoPicker/RequestAccountDeletionInteractorRepoPicker';
import {RequestAccountDeletion} from '@copor/core/domain/User/interactor/RequestAccountDeletion';
import {RequestAccountDeletionLoggerRepoPicker}
	from '@copor/core/client/User/RequestAccountDeletion/repo/repoPicker/RequestAccountDeletionLoggerRepoPicker';
import {LogDataForRequestAccountDeletion, LogRequestAccountDeletion} from '@copor/core/domain/User/logger/LogRequestAccountDeletion';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';
import {NotificationHelper, SendNotificationDTO} from '@copor/core/client/Core/Helpers/NotificationHelper';
import {NotificationType} from '@copor/core/client/enum/NotificationType';
import {
	AccountDeletionRequestedNotificationTranslationData
} from '@copor/core/domain/Components/Notification/interactor/dto/AccountDeletionRequestedNotificationTranslationData';
import {
	GetAdminUserIdListInteractorRepoPicker
} from '@copor/core/client/User/RequestAccountDeletion/repo/repoPicker/GetAdminUserIdListInteractorRepoPicker';
import {GetAdminUserIdList} from '@copor/core/domain/User/interactor/GetAdminUserIdList';
import {
	SaveAccountDeletionRequestedNotificationRepoPicker
} from '@copor/core/client/User/RequestAccountDeletion/repo/repoPicker/SaveAccountDeletionRequestedNotificationRepoPicker';
import {GetNotificationTokenDTO} from '@copor/core/domain/Components/NotificationToken/interactor/dto/GetNotificationTokenDTO';
import {
	GetNotificationTokenListInteractorRepoPicker
} from '@copor/core/client/Components/NotificationToken/GetNotificationTokenList/repo/repoPicker/GetNotificationTokenListInteractorRepoPicker';
import {GetNotificationTokenList} from '@copor/core/domain/Components/NotificationToken/interactor/GetNotificationTokenList';
import {
	GetUserFullNameInteractorRepoPicker
} from '@copor/core/client/User/GetUserFullName/repo/repoPicker/GetUserFullNameInteractorRepoPicker';
import {GetUserFullName} from '@copor/core/domain/User/GetFullName/interactor/GetUserFullName';

export class RequestAccountDeletionController extends UpdateBaseController<void> {
	async getResponse() {
		await super.getResponse(); // runs validator, interactor, logger, sends response

		const getUserFullNameRepo = this.container.getNewRepoPicker(GetUserFullNameInteractorRepoPicker);
		const sendNotificationDTO: SendNotificationDTO<AccountDeletionRequestedNotificationTranslationData> = {
			title: 'translationStringList.ACCOUNT_DELETION_REQUESTED_NOTIFICATION_TITLE',
			description: 'translationStringList.ACCOUNT_DELETION_REQUESTED_NOTIFICATION_DESCRIPTION',
			translationData: {
				requesterName: await this.container.getInteractor(GetUserFullName, getUserFullNameRepo, this.actorId).execute()
			},
			data: {type: NotificationType.ACCOUNT_DELETION_REQUEST}
		};

		const recipientList = await this.getAdminUserIdList();
		const repoPicker = this.container.getNewRepoPicker(SaveAccountDeletionRequestedNotificationRepoPicker);
		const tokenList = await this.getTokenList(recipientList);

		await NotificationHelper.sendNotification(
			this.container.appContext,
			this.actorId,
			sendNotificationDTO,
			repoPicker,
			tokenList
		);
	}

	protected getValidator(): Validator {
		return this.container.getValidator(
			ValidateRequestAccountDeletion,
			this.actorId,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			this.container.getNewRepoPicker(RequestAccountDeletionValidatorStorageRepoPicker)
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			RequestAccountDeletion,
			this.container.getNewRepoPicker(RequestAccountDeletionInteractorRepoPicker),
			this.actorId
		);
	}

	protected getLogger() {
		const logData: LogDataForRequestAccountDeletion = {userId: this.actorId};

		return this.container.getLogger(
			LogRequestAccountDeletion,
			this.container.getNewRepoPicker(RequestAccountDeletionLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private async getAdminUserIdList(): Promise<string[]> {
		const repo = this.container.getNewRepoPicker(GetAdminUserIdListInteractorRepoPicker);

		return await this.container.getInteractor(GetAdminUserIdList, repo, undefined).execute();
	}

	private async getTokenList(recipientList: string[]): Promise<GetNotificationTokenDTO[]> {
		const repo = this.container.getNewRepoPicker(GetNotificationTokenListInteractorRepoPicker);
		const interactor = new GetNotificationTokenList(recipientList, repo);

		return await interactor.execute();
	}
}
