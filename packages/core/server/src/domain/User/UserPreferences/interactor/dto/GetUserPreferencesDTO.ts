import {ThemeMode} from '@copor/core/domain/Core/enum/ThemeMode';
import {Contrast} from '@copor/core/domain/Core/enum/dto/Contrast';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';
import {ContactPrivacyDTO} from '@copor/core/domain/Core/enum/dto/ContactPrivacyDTO';
import {FontSize} from '@copor/core/domain/Core/enum/dto/FontSize';
import {ActionFeedbackDuration} from '@copor/core/domain/Core/enum/ActionFeedbackDuration';
import {FontWeight} from '@copor/core/domain/Core/Enum/FontWeight';


export interface GetUserPreferencesDTO {
	language: string;
	themeMode: ThemeMode;
	contrast: Contrast;
	colorSet: ColorSet;
	contactPrivacy: ContactPrivacyDTO;
	authentication: AuthenticationPreferencesDTO;
	useIcons: boolean;
	fontSize: FontSize;
	actionFeedbackDuration: ActionFeedbackDuration;
	fontWeight: FontWeight;
	// Core's image upload limit in MB (profile image, form image fields):
	// MAX_MEDIA_SIZE_MB, what MulterImageMiddleware enforces.
	maxImageSize: number;
	// Every included module's preferences, stored value or default
	// (ModulePreferenceRegistry).
	modulePreferences: Record<string, boolean>;
	// Per module name, settings the module hands the app (e.g. its upload
	// limit), from its descriptor's `clientConfig`.
	moduleConfig: Record<string, Record<string, unknown>>;
}

export interface AuthenticationPreferencesDTO {
	faceId: boolean,
	fingerprint: boolean,
	lockAppId: boolean
}

