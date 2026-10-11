import {Contrast} from '@copor/core/domain/Core/enum/dto/Contrast';
import {ThemeMode} from '@copor/core/domain/Core/enum/ThemeMode';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';
import {ContactPrivacyDTO} from '@copor/core/domain/Core/enum/dto/ContactPrivacyDTO';
import {FontSize} from '@copor/core/domain/Core/enum/dto/FontSize';
import {ActionFeedbackDuration} from '@copor/core/domain/Core/enum/ActionFeedbackDuration';
import {FontWeight} from '@copor/core/domain/Core/Enum/FontWeight';
import {AuthenticationPreferencesDTO} from '@copor/core/domain/User/UserPreferences/interactor/dto/GetUserPreferencesDTO';

export interface UpdateUserPreferencesReqBodyDTO {
	language: string;
	themeMode: ThemeMode;
	contrast: Contrast;
	colorSet: ColorSet;
	contactPrivacy: ContactPrivacyDTO;
	useIcons: boolean;
	fontSize: FontSize;
	actionFeedbackDuration: ActionFeedbackDuration;
	fontWeight: FontWeight;
	authentication: AuthenticationPreferencesDTO;
	// Only the module preferences to change (`<module>.<name>` → on/off).
	modulePreferences?: Record<string, boolean>;
}
