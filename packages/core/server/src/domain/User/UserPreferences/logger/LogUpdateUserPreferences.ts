import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {ThemeMode} from '@copor/core/domain/Core/enum/ThemeMode';
import {Contrast} from '@copor/core/domain/Core/enum/dto/Contrast';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';
import {ContactPrivacyDTO} from '@copor/core/domain/Core/enum/dto/ContactPrivacyDTO';
import {FontSize} from '@copor/core/domain/Core/enum/dto/FontSize';
import {ActionFeedbackDuration} from '@copor/core/domain/Core/enum/ActionFeedbackDuration';

export interface LogDataForUpdateUserPreferences {
	language: string;
	themeMode: ThemeMode;
	contrast: Contrast;
	colorSet: ColorSet;
	contactPrivacy: ContactPrivacyDTO;
	useIcons: boolean;
	fontSize: FontSize;
	actionFeedbackDuration: ActionFeedbackDuration;
}

export class LogUpdateUserPreferences extends TypedLogger<LogDataForUpdateUserPreferences> {
	getType(): string {
		return 'updateUserPreferences';
	}
}
