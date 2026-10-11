import {CreateNotification} from '@copor/core/domain/Components/Notification/interactor/CreateNotification';
import {
	GetUserPreferencesInteractorRepoPicker
} from '@copor/core/client/User/UserPreferences/GetUserPreferences/repo/repoPicker/GetUserPreferencesInteractorRepoPicker';
import {GetUserPreferences} from '@copor/core/domain/User/UserPreferences/interactor/GetUserPreferences';
import i18next from 'i18next';
import {PushNotificationHelper} from './PushNotificationHelper';
import {AppContext} from '../../Interface/AppContext';
import {IdGenerator} from '../IdGenerator/IdGenerator';
import {GetNotificationTokenDTO} from '@copor/core/domain/Components/NotificationToken/interactor/dto/GetNotificationTokenDTO';
import {GetUserPreferencesDTO} from '@copor/core/domain/User/UserPreferences/interactor/dto/GetUserPreferencesDTO';
import {SaveNotificationDTO} from '@copor/core/domain/Components/Notification/interactor/dto/SaveNotificationDTO';
import {SaveNotificationRepo} from '@copor/core/domain/Components/Notification/repository/SaveNotificationRepo';

export interface SendNotificationDTO<TranslationData> {
	title: string;
	description: string;
	translationData: TranslationData;
	data?: Record<string, string>
}

export class NotificationHelper {
	public static async sendNotification<TranslationData>(
		appContext: AppContext,
		actorId: string,
		sendNotificationDTO: SendNotificationDTO<TranslationData>,
		repo: SaveNotificationRepo<SaveNotificationDTO<TranslationData>>,
		tokens: GetNotificationTokenDTO[]) {
		/*
		let tokens: GetNotificationTokenDTO[];
		tokens = await this.getNotificationTokens(appContext, actorId);
		*/
		for (const token of tokens) {
			const notificationInput = await this.getNotificationInput<TranslationData>(appContext, actorId, sendNotificationDTO, token);
			const preferences = await this.getUserPreferences(appContext, token);

			if (preferences)
				await i18next.changeLanguage(preferences.language);
			await this.createNotification<TranslationData>(appContext, notificationInput, repo);
			await this.sendPushNotifications(notificationInput, token, sendNotificationDTO.data);
		}
	}

	private static async sendPushNotifications<TranslationData>(
		notificationInput: SaveNotificationDTO<TranslationData>,
		token: GetNotificationTokenDTO,
		data?: Record<string, string>): Promise<void> {
		i18next.setDefaultNamespace('notification');
		await PushNotificationHelper.send({
			notification: {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				title: i18next.t(notificationInput.title, notificationInput.translationData as Record<string, string>),
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				body: i18next.t(notificationInput.description, notificationInput.translationData as Record<string, string>)
			},
			data: data,
			tokenList: [token]
		});
	}

	private static async createNotification<TranslationData>(
		appContext: AppContext,
		notificationInput: SaveNotificationDTO<TranslationData>,
		repo: SaveNotificationRepo<SaveNotificationDTO<TranslationData>>): Promise<void> {
		const notificationInteractor = new CreateNotification<TranslationData>(notificationInput, repo);

		await notificationInteractor.execute();
	}

	private static async getUserPreferences(
		appContext: AppContext,
		token: GetNotificationTokenDTO): Promise<GetUserPreferencesDTO | undefined> {
		const userPreferencesRepo = new GetUserPreferencesInteractorRepoPicker(appContext).getRepository();
		const getUserPreferences = new GetUserPreferences(token.user, userPreferencesRepo);
		const preferences = await getUserPreferences.execute();

		return preferences;
	}

	private static async getNotificationInput<TranslationData>(
		appContext: AppContext,
		actorId: string,
		sendNotificationDTO: SendNotificationDTO<TranslationData>,
		token: GetNotificationTokenDTO): Promise<SaveNotificationDTO<TranslationData>> {
		const notificationInput: SaveNotificationDTO<TranslationData> = {
			... sendNotificationDTO,
			id: await new IdGenerator().getNewId(),
			seen: false,
			userId: token.user,
			translationData: {
				... sendNotificationDTO.translationData
			}
		};

		return notificationInput;
	}
}
