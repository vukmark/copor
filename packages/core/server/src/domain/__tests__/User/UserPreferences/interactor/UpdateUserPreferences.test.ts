import {SaveUserPreferencesRepo} from '@copor/core/domain/User/UserPreferences/repository/SaveUserPreferencesRepo';
import {SaveUserPreferencesDTO} from '@copor/core/domain/User/UserPreferences/interactor/dto/SaveUserPreferencesDTO';
import {UpdateUserPreferences} from '@copor/core/domain/User/UserPreferences/interactor/UpdateUserPreferences';
import {ThemeMode} from '@copor/core/domain/Core/enum/ThemeMode';
import {Contrast} from '@copor/core/domain/Core/enum/dto/Contrast';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';
import {FontSize} from '@copor/core/domain/Core/enum/dto/FontSize';
import {ActionFeedbackDuration} from '@copor/core/domain/Core/enum/ActionFeedbackDuration';
import {FontWeight} from '@copor/core/domain/Core/Enum/FontWeight';

// A module preference of a test-only module; core's tests don't depend on a real module.
const SAMPLE_PREFERENCE = 'sample_module.push';

describe('Update user Preferences interactor tests', () => {
	let mockRepo: jest.Mocked<SaveUserPreferencesRepo>;
	let input: SaveUserPreferencesDTO;
	let updateUserPreferences: UpdateUserPreferences;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		input = {
			themeMode: ThemeMode.LIGHT,
			actionFeedbackDuration: ActionFeedbackDuration.FIVE_SECONDS,
			contrast: Contrast.AUTO,
			language: 'languageId',
			user: 'actorId',
			colorSet: ColorSet.SET18,
			contactPrivacy: {
				picture: false,
				email: false,
				dateOfBirth: false,
				tenant: false,
				group: false,
				private: false
			},
			useIcons: true,
			fontSize: FontSize.LG,
			fontWeight: FontWeight.NORMAL,
			authentication: {faceId: false, fingerprint: false, lockAppId: false},
			modulePreferences: {[SAMPLE_PREFERENCE]: false}
		};
		updateUserPreferences = new UpdateUserPreferences(input, mockRepo);
	});
	it('Should save data for update', async () => {
		await updateUserPreferences.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});
