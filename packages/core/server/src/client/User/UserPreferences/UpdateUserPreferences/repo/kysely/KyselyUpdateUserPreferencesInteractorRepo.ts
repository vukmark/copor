import {SaveUserPreferencesRepo} from '@copor/core/domain/User/UserPreferences/repository/SaveUserPreferencesRepo';
import {SaveUserPreferencesDTO} from '@copor/core/domain/User/UserPreferences/interactor/dto/SaveUserPreferencesDTO';
import {db} from '@copor/core/client/AppDataSource';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';
import {KyselyModulePreferencesHelper} from '@copor/core/client/User/UserPreferences/ModulePreferences/KyselyModulePreferencesHelper';

export class KyselyUpdateUserPreferencesInteractorRepo implements SaveUserPreferencesRepo {
	private dbInstance = db;

	public useTransaction(trx: typeof db): this {
		this.dbInstance = trx;
		return this;
	}

	async save(saveDTO: SaveUserPreferencesDTO): Promise<void> {
		const loadedPreferences = await this.dbInstance
			.selectFrom('userPreferences')
			.select(['userId'])
			.where('userId', '=', saveDTO.user)
			.executeTakeFirst();

		let languageId = saveDTO.language;

		if (!languageId) {
			const defaultLanguageCode = 'de';

			const fallbackLang = await this.dbInstance
				.selectFrom('language')
				.where('code', '=', defaultLanguageCode)
				.select(['id'])
				.executeTakeFirst();

			languageId = fallbackLang?.id;

			if (!languageId) {
				const anyLang = await this.dbInstance
					.selectFrom('language')
					.select(['id'])
					.limit(1)
					.executeTakeFirst();

				if (!anyLang?.id)
					throw new Error('No languages in database');

				languageId = anyLang.id;
			}
		}

		if (loadedPreferences) {
			const timestamps = TimestampHelper.getTimestampForUpdate(saveDTO.user);

			await this.updateExistingPreferences(languageId, saveDTO, timestamps);
		} else {
			const timestamps = TimestampHelper.getTimestampForCreate(saveDTO.user);

			await this.createNewPreferences(saveDTO, languageId, timestamps);
		}

		await KyselyModulePreferencesHelper.save(saveDTO.user, saveDTO.modulePreferences ?? {}, this.dbInstance);
	}

	private async createNewPreferences(
		saveDTO: SaveUserPreferencesDTO,
		languageId: string | undefined,
		timestamps: ReturnType<typeof TimestampHelper.getTimestampForCreate>
	): Promise<void> {
		await this.dbInstance
			.insertInto('userPreferences')
			.values({
				userId: saveDTO.user,
				language: languageId,
				themeMode: saveDTO.themeMode.toString() as '0' | '1' | '2',
				contrast: saveDTO.contrast.toString() as '0' | '1' | '2' | '3',
				colorSet: saveDTO.colorSet.toString() as 'SET22' | 'SET18' | 'SET9' | 'SET5',
				actionFeedbackDuration: saveDTO.actionFeedbackDuration,

				private: saveDTO.contactPrivacy.private,
				tenant: saveDTO.contactPrivacy.tenant,
				dateOfBirth: saveDTO.contactPrivacy.dateOfBirth,
				picture: saveDTO.contactPrivacy.picture,
				email: saveDTO.contactPrivacy.email,
				group: saveDTO.contactPrivacy.group,

				useIcons: saveDTO.useIcons,
				fontSize: saveDTO.fontSize,
				fontWeight: saveDTO.fontWeight,

				faceId: saveDTO.authentication.faceId,
				fingerprint: saveDTO.authentication.fingerprint,
				lockAppId: saveDTO.authentication.lockAppId,

				... timestamps
			})
			.execute();
	}

	private async updateExistingPreferences(
		languageId: string | undefined,
		saveDTO: SaveUserPreferencesDTO,
		timestamps: {
			modifiedAt: Date;
			modifiedBy: string;
		}
	): Promise<void> {
		await this.dbInstance
			.updateTable('userPreferences')
			.set({
				language: languageId,
				themeMode: saveDTO.themeMode.toString() as '0' | '1' | '2',
				contrast: saveDTO.contrast.toString() as '0' | '1' | '2' | '3',
				colorSet: saveDTO.colorSet.toString() as 'SET22' | 'SET18' | 'SET9' | 'SET5',
				actionFeedbackDuration: saveDTO.actionFeedbackDuration,

				private: saveDTO.contactPrivacy.private,
				tenant: saveDTO.contactPrivacy.tenant,
				dateOfBirth: saveDTO.contactPrivacy.dateOfBirth,
				picture: saveDTO.contactPrivacy.picture,
				email: saveDTO.contactPrivacy.email,
				group: saveDTO.contactPrivacy.group,

				useIcons: saveDTO.useIcons,
				fontSize: saveDTO.fontSize,
				fontWeight: saveDTO.fontWeight,

				faceId: saveDTO.authentication.faceId,
				fingerprint: saveDTO.authentication.fingerprint,
				lockAppId: saveDTO.authentication.lockAppId,

				... timestamps
			})
			.where('userId', '=', saveDTO.user)
			.execute();
	}
}