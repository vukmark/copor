import {ThemeMode} from '@copor/core/domain/Core/enum/ThemeMode';
import {Contrast} from '@copor/core/domain/Core/enum/dto/Contrast';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';
import {ContactPrivacyDTO} from '@copor/core/domain/Core/enum/dto/ContactPrivacyDTO';
import {FontSize} from '@copor/core/domain/Core/enum/dto/FontSize';
import {FontWeight} from '@copor/core/domain/Core/Enum/FontWeight';
import {AuthenticationPreferencesDTO} from '@copor/core/domain/User/UserPreferences/interactor/dto/GetUserPreferencesDTO';

export interface GetUserPreferencesViewModel {
	language: string;
	themeMode: ThemeMode;
	contrast: Contrast;
	colorSet: ColorSet;
	contactPrivacy: ContactPrivacyDTO;
	fontSize: FontSize;
	fontWeight: FontWeight;
	authentication: AuthenticationPreferencesDTO;
	maxImageSize: number;
	modulePreferences: Record<string, boolean>;
	moduleConfig: Record<string, Record<string, unknown>>;
}
