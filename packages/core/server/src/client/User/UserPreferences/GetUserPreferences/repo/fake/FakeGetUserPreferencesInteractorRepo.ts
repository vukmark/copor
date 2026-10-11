import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetUserPreferencesDTO} from '@copor/core/domain/User/UserPreferences/interactor/dto/GetUserPreferencesDTO';
import {ThemeMode} from '@copor/core/domain/Core/enum/ThemeMode';
import {Contrast} from '@copor/core/domain/Core/enum/dto/Contrast';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';
import {FontSize} from '@copor/core/domain/Core/enum/dto/FontSize';
import {ActionFeedbackDuration} from '@copor/core/domain/Core/enum/ActionFeedbackDuration';
import {FontWeight} from '@copor/core/domain/Core/Enum/FontWeight';
import {resolveModulePreferences} from '@copor/core/domain/User/UserPreferences/ModulePreferences/ModulePreferenceRegistry';

export class FakeGetUserPreferencesInteractorRepo implements GetItem<GetUserPreferencesDTO> {
	load(id: string): Promise<GetUserPreferencesDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					themeMode: ThemeMode.AUTO,
					contrast: Contrast.AUTO,
					actionFeedbackDuration: ActionFeedbackDuration.OFF,
					language: 'de',
					colorSet: ColorSet.SET18,
					contactPrivacy: {
						picture: false,
						email: false,
						dateOfBirth: false,
						tenant: false,
						group: false,
						private: false
					},
					authentication: {
						faceId: true,
						fingerprint: true,
						lockAppId: true
					},
					useIcons: true,
					fontSize: FontSize.NORMAL,
					fontWeight: FontWeight.NORMAL,
					maxImageSize: 0,
					modulePreferences: resolveModulePreferences({}),
					moduleConfig: {}
				}
			);
		});
	}
}
