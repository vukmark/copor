import {KyselyModulePreferencesHelper} from '@copor/core/client/User/UserPreferences/ModulePreferences/KyselyModulePreferencesHelper';
import {VuMeetPreference} from '@copor/vu_meet/domain/VuMeet/VuMeetPreferenceDefinitions';
import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateMessageReqBodyDTO} from './dto/CreateMessageReqBodyDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	CreateMessageValidatorStorageRepoPicker
} from './repo/repoPicker/CreateMessageValidatorStorageRepoPicker';
import {CreateMessageInteractorRepoPicker} from './repo/repoPicker/CreateMessageInteractorRepoPicker';
import {CreateMessageLoggerRepoPicker} from './repo/repoPicker/CreateMessageLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {
	ValidateCreateMessageDTO
} from '@copor/vu_meet/domain/VuMeet/Message/validations/dto/ValidateCreateMessageDTO';
import {ValidateCreateMessage} from '@copor/vu_meet/domain/VuMeet/Message/validations/ValidateCreateMessage';
import {SaveMessageDTO} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/SaveMessageDTO';
import {CreateMessage} from '@copor/vu_meet/domain/VuMeet/Message/interactor/CreateMessage';
import {
	LogCreateMessage,
	LogDataForCreateMessage
} from '@copor/vu_meet/domain/VuMeet/Message/logger/LogCreateMessage';
import {
	GetOtherParticipantsInChatRepoPicker
} from './repo/repoPicker/GetOtherParticipantsInChatRepoPicker';
import {NotificationHelper, SendNotificationDTO} from '@copor/core/client/Core/Helpers/NotificationHelper';
import {
	MessageCreatedNotificationTranslationData
} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/MessageCreatedNotificationTranslationData';
import {
	SaveCreatedMessageNotificationRepoPicker
} from './repo/repoPicker/SaveCreatedMessageNotificationRepoPicker';
import {GetNotificationTokenDTO} from '@copor/core/domain/Components/NotificationToken/interactor/dto/GetNotificationTokenDTO';
import {
	GetNotificationTokenListInteractorRepoPicker
} from '@copor/core/client/Components/NotificationToken/GetNotificationTokenList/repo/repoPicker/GetNotificationTokenListInteractorRepoPicker';
import {NotificationType} from '@copor/core/client/enum/NotificationType';
import {GetNotificationTokenList} from '@copor/core/domain/Components/NotificationToken/interactor/GetNotificationTokenList';
import {VuMeetFileHelper} from '@copor/vu_meet/client/VuMeet/VuMeetFileHelper';
import {MessageContentType} from '@copor/vu_meet/domain/VuMeet/Core/enum/MessageContentType';
import {FileMetadataDTO} from '@copor/core/client/Core/Helpers/FileMetadataDTO';
import {FileHelper} from '@copor/core/client/Core/Helpers/FileHelper';
import {
	GetUserFullNameInteractorRepoPicker
} from '@copor/core/client/User/GetUserFullName/repo/repoPicker/GetUserFullNameInteractorRepoPicker';
import {GetUserFullName} from '@copor/core/domain/User/GetFullName/interactor/GetUserFullName';
import {VuMeetWebSocket} from '@copor/vu_meet/client/VuMeet/Core/WebSocket/VuMeetWebSocket';

export interface MessageCreatedNotificationData {
	chatId: string;
	isPrivate: boolean;
}

export class CreateMessageController
	extends BaseController<CreateMessageReqBodyDTO, string> {
	async getResponse() {
		let fileMetadata: FileMetadataDTO | undefined = undefined;

		if (this.request.body.type === MessageContentType.FILE || this.request.body.type === MessageContentType.PICTURE) {
			if (!this.request.file)
				throw new Error('No file included');
			fileMetadata = FileHelper.getFileMetadata(this.request.file);
		}

		const uniqueId = await this.getUniqueId();

		const factory = this.container.getFactory(
			RunFactory<string>,
			this.getValidator(),
			this.getInteractor(uniqueId, fileMetadata),
			this.getLogger(uniqueId)
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const otherUsersInChat = await this.getOtherUsersInChat();

		if (this.request.file) {
			const allUsers = [... otherUsersInChat, this.actorId];

			for (const user of allUsers) {
				await VuMeetFileHelper.saveFile(this.request.file, {fileId: uniqueId, userId: user});
			}
		}

		await this.sendWebSocketNotification(otherUsersInChat);
		await this.createNotification(otherUsersInChat);

		this.response.status(200);
		this.response.send(response);
	}

	private async getOtherUsersInChat() {
		const getOtherParticipantsInChatRepo = new GetOtherParticipantsInChatRepoPicker(this.container.appContext).getRepository();

		return await getOtherParticipantsInChatRepo.load(this.actorId, this.request.body.chat);
	}

	private async sendWebSocketNotification(otherUsersInChat: string[]) {
		await VuMeetWebSocket.sendNewMessageNotification(otherUsersInChat, this.container.appContext);
	}

	private async createNotification(otherUsersInChat: string[]) {
		const recipient = otherUsersInChat[0];
		const [pushOff] = await KyselyModulePreferencesHelper.usersWithPreferenceOff(
			VuMeetPreference.messagePushNotifications,
			[recipient]
		);

		if (pushOff)
			return;

		const notificationData: MessageCreatedNotificationData = {
			chatId: this.request.body.chat,
			isPrivate: true
		};
		const getUserFullNameRepo = this.container.getNewRepoPicker(GetUserFullNameInteractorRepoPicker);

		const sendNotificationDTO: SendNotificationDTO<MessageCreatedNotificationTranslationData> = {
			title: 'translationStringList.PRIVATE_MESSAGE_CREATED_NOTIFICATION_TITLE',
			description: 'translationStringList.PRIVATE_MESSAGE_CREATED_NOTIFICATION_DESCRIPTION',
			translationData: {
				author: await this.container.getInteractor(GetUserFullName, getUserFullNameRepo, this.actorId).execute(),
				previewText: this.getPreviewText()
			},
			data: {
				... notificationData,
				isPrivate: notificationData.isPrivate.toString(),
				type: NotificationType.VU_MEET
			}
		};
		const repoPicker = this.container.getNewRepoPicker(SaveCreatedMessageNotificationRepoPicker);
		const tokenList = await this.getTokenList(recipient);

		await NotificationHelper.sendNotification(this.container.appContext, this.actorId, sendNotificationDTO, repoPicker, tokenList);
	}

	private async getUniqueId(): Promise<string> {
		const uniqueIdGenerator = this.container.getRepository(IdGenerator);

		return await uniqueIdGenerator.getNewId();
	}

	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(CreateMessageValidatorStorageRepoPicker);
		const validatorInput: ValidateCreateMessageDTO = {
			... this.request.body,
			sender: this.actorId,
			actorId: this.actorId,
			file: this.request.file?.buffer ?? undefined
		};

		return container.getValidator(
			ValidateCreateMessage,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getInteractor(uniqueId: string, metadata: FileMetadataDTO | undefined) : UseCase<string> {
		const container = this.container;

		const interactorInput: SaveMessageDTO = {
			... this.request.body,
			sender: this.actorId,
			extension: metadata ? metadata.extension : undefined,
			id: uniqueId
		};
		const interactorRepo = container.getNewRepoPicker(CreateMessageInteractorRepoPicker);

		return container.getInteractor(
			CreateMessage,
			interactorRepo,
			interactorInput
		);
	}

	private getLogger(uniqueId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateMessageLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateMessage,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(uniqueId: string): LogDataForCreateMessage {
		return {
			... this.request.body,
			id: uniqueId
		};
	}

	private getPreviewText(): string {
		const text = this.request.body.content;
		const maxLength = 30;

		return text.length > maxLength ? text.substring(0, maxLength).trim() + '...' : text.trim();
	}

	private async getTokenList(otherParticipant: string): Promise<GetNotificationTokenDTO[]> {
		const getNotificationTokenListRepo = this.container.getNewRepoPicker(GetNotificationTokenListInteractorRepoPicker);
		const getNotificationTokenListInteractor
			= new GetNotificationTokenList([otherParticipant], getNotificationTokenListRepo);

		return await getNotificationTokenListInteractor.execute();
	}
}
