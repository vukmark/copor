import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {
	LogDataForUpdateUserPreferences,
	LogUpdateUserPreferences
} from '@copor/core/domain/User/UserPreferences/logger/LogUpdateUserPreferences';
import {Contrast} from '@copor/core/domain/Core/enum/dto/Contrast';
import {ThemeMode} from '@copor/core/domain/Core/enum/ThemeMode';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';
import {FontSize} from '@copor/core/domain/Core/enum/dto/FontSize';
import {ActionFeedbackDuration} from '@copor/core/domain/Core/enum/ActionFeedbackDuration';

describe('Log update user preferences tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateUserPreferences>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdateUserPreferences = {
		language: 'languageId',
		actionFeedbackDuration: ActionFeedbackDuration.OFF,
		contrast: Contrast.AUTO,
		themeMode: ThemeMode.AUTO,
		contactPrivacy: {
			picture: true,
			email: false,
			dateOfBirth: true,
			tenant: false,
			group: true,
			private: false
		},
		colorSet: ColorSet.SET5,
		fontSize: FontSize.NORMAL,
		useIcons: true
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForUpdateUserPreferences> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateUserPreferences',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogUpdateUserPreferences = new LogUpdateUserPreferences(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
