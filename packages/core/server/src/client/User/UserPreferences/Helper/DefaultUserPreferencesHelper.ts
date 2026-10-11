import {SaveUserPreferencesDTO} from '@copor/core/domain/User/UserPreferences/interactor/dto/SaveUserPreferencesDTO';
import {ThemeMode} from '@copor/core/domain/Core/enum/ThemeMode';
import {Contrast} from '@copor/core/domain/Core/enum/dto/Contrast';
import {ActionFeedbackDuration} from '@copor/core/domain/Core/enum/ActionFeedbackDuration';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';
import {FontSize} from '@copor/core/domain/Core/enum/dto/FontSize';
import {FontWeight} from '@copor/core/domain/Core/Enum/FontWeight';
import {LanguageKyselyHelper} from '@copor/core/client/Components/Language/repositoryHelper/LanguageKyselyHelper';

export class DefaultUserPreferencesHelper {
	public static build(userId: string): SaveUserPreferencesDTO {
		return {
			themeMode: ThemeMode.AUTO,
			contrast: Contrast.AUTO,
			actionFeedbackDuration: ActionFeedbackDuration.OFF,
			language: LanguageKyselyHelper.getDefaultLanguage(),
			user: userId,
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
			fontWeight: FontWeight.NORMAL
		};
	}
}
