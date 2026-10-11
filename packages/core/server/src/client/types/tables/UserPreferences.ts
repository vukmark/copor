import {Generated} from './Generated';
import {FontWeight} from '@copor/core/domain/Core/Enum/FontWeight';
import {ActionFeedbackDuration} from '@copor/core/domain/Core/enum/ActionFeedbackDuration';
import {FontSize} from '@copor/core/domain/Core/enum/dto/FontSize';

export interface UserPreferences {
	colorSet: 'SET22' | 'SET18' | 'SET9' | 'SET5';
	contrast: '0' | '1' | '2' | '3';
	dateOfBirth: boolean;
	email: boolean;
	faceId: boolean,
	fingerprint: boolean,
	fontSize: FontSize;
	fontWeight: FontWeight;
	group: boolean;
	language: Generated<string | null>;
	lockAppId: boolean,
	picture: boolean;
	private: boolean;
	tenant: boolean;
	actionFeedbackDuration: ActionFeedbackDuration;
	themeMode: '0' | '1' | '2';
	useIcons: boolean;
	userId: string;
	createdAt: Generated<Date>;
	createdBy: string;
	modifiedAt: Generated<Date>;
	modifiedBy: string;
}
