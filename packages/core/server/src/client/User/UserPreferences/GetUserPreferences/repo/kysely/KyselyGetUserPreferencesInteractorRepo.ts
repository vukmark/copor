import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetUserPreferencesDTO} from '@copor/core/domain/User/UserPreferences/interactor/dto/GetUserPreferencesDTO';
import {db} from '@copor/core/client/AppDataSource';
import {Contrast} from '@copor/core/domain/Core/enum/dto/Contrast';
import {ThemeMode} from '@copor/core/domain/Core/enum/ThemeMode';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';
import {FontSize} from '@copor/core/domain/Core/enum/dto/FontSize';
import {TimeTransformer} from '@copor/core/domain/Core/Date/TimeTransformer';
import {ActionFeedbackDuration} from '@copor/core/domain/Core/enum/ActionFeedbackDuration';
import {FontWeight} from '@copor/core/domain/Core/Enum/FontWeight';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {KyselyModulePreferencesHelper} from '@copor/core/client/User/UserPreferences/ModulePreferences/KyselyModulePreferencesHelper';
import {getModuleClientConfig} from '@copor/core/client/Core/Module/ModuleClientConfig';

export class KyselyGetUserPreferencesInteractorRepo
	extends TimeTransformer
	implements GetItem<GetUserPreferencesDTO> {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		super();
		this.appContext = appContext;
	}
	async load(id: string): Promise<GetUserPreferencesDTO> {
		const maxImageSize = Number(this.appContext.envVariables?.MAX_MEDIA_SIZE_MB ?? 0);
		const modulePreferences = await KyselyModulePreferencesHelper.load(id);
		const moduleConfig = getModuleClientConfig(this.appContext);
		const userPreferences = await db
			.selectFrom('userPreferences')
			.where('userId', '=', id)
			.select([
				'language',
				'contrast',
				'themeMode',
				'actionFeedbackDuration',
				'picture',
				'email',
				'dateOfBirth',
				'tenant',
				'group',
				'private',
				'colorSet',
				'useIcons',
				'fontSize',
				'fontWeight',
				'faceId',
				'fingerprint',
				'lockAppId'
			])
			.executeTakeFirst();


		if (userPreferences) {
			return {
				language: userPreferences.language!,
				contrast: Number(userPreferences.contrast) as Contrast,
				actionFeedbackDuration: userPreferences.actionFeedbackDuration,
				themeMode: Number(userPreferences.themeMode) as ThemeMode,
				colorSet: userPreferences.colorSet as ColorSet,
				contactPrivacy: {
					picture: userPreferences.picture,
					email: userPreferences.email,
					dateOfBirth: userPreferences.dateOfBirth,
					tenant: userPreferences.tenant,
					group: userPreferences.group,
					private: userPreferences.private
				},
				authentication: {
					faceId: userPreferences.faceId,
					fingerprint: userPreferences.fingerprint,
					lockAppId: userPreferences.lockAppId
				},
				useIcons: Boolean(userPreferences.useIcons),
				fontSize: userPreferences.fontSize,
				fontWeight: userPreferences.fontWeight,
				maxImageSize,
				modulePreferences,
				moduleConfig
			};
		}

		const defaultLanguageCode = 'de';

		let language = await db
			.selectFrom('language')
			.where('code', '=', defaultLanguageCode)
			.select(['id'])
			.executeTakeFirst();

		if (!language) {
			language = await db
				.selectFrom('language')
				.select(['id'])
				.limit(1)
				.executeTakeFirst();
		}

		if (!language) {
			throw new Error('No languages in database');
		}

		return {
			language: language.id,
			contrast: Contrast.AUTO,
			themeMode: ThemeMode.AUTO,
			actionFeedbackDuration: ActionFeedbackDuration.OFF,
			colorSet: ColorSet.SET22,
			contactPrivacy: {
				picture: true,
				email: true,
				dateOfBirth: true,
				tenant: true,
				group: true,
				private: true
			},
			authentication: {
				faceId: true,
				fingerprint: true,
				lockAppId: true
			},
			useIcons: true,
			fontSize: FontSize.NORMAL,
			fontWeight: FontWeight.NORMAL,
			maxImageSize,
			modulePreferences,
			moduleConfig
		};
	}
}
