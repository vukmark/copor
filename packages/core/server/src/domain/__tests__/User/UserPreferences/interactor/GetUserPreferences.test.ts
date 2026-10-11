import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetUserPreferences} from '@copor/core/domain/User/UserPreferences/interactor/GetUserPreferences';
import {GetUserPreferencesDTO} from '@copor/core/domain/User/UserPreferences/interactor/dto/GetUserPreferencesDTO';
import {ThemeMode} from '@copor/core/domain/Core/enum/ThemeMode';
import {Contrast} from '@copor/core/domain/Core/enum/dto/Contrast';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';
import {FontSize} from '@copor/core/domain/Core/enum/dto/FontSize';
import {ActionFeedbackDuration} from '@copor/core/domain/Core/enum/ActionFeedbackDuration';
import {FontWeight} from '@copor/core/domain/Core/Enum/FontWeight';

const SAMPLE_MODULE = 'sample_module';

// A module preference of a test-only module; core's tests don't depend on a real module.
const SAMPLE_PREFERENCE = 'sample_module.push';

describe('get user preferences interactor tests', () => {
	const mockRepo: jest.Mocked<GetItem<GetUserPreferencesDTO>> = {
		load: jest.fn()
	};
	const expectedResponse: GetUserPreferencesDTO = {
		colorSet: ColorSet.SET18,
		contactPrivacy: {
			picture: false,
			email: false,
			dateOfBirth: false,
			tenant: false,
			group: false,
			private: false
		},
		contrast: Contrast.HIGH,
		fontSize: FontSize.LG,
		fontWeight: FontWeight.BOLD,
		language: '',
		actionFeedbackDuration: ActionFeedbackDuration.FIVE_SECONDS,
		themeMode: ThemeMode.DARK,
		useIcons: false,
		authentication: {faceId: false, fingerprint: false, lockAppId: false},
		maxImageSize: 32,
		modulePreferences: {[SAMPLE_PREFERENCE]: true},
		moduleConfig: {[SAMPLE_MODULE]: {maxFileSize: 64}}
	};
	const getUserPreferences = new GetUserPreferences('id', mockRepo);

	it('should return expected response', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse);
		expect(await getUserPreferences.execute()).toEqual(expectedResponse);
	});
});
