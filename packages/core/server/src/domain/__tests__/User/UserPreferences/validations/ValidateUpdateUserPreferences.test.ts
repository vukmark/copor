import {PermissionRepository} from '../../../../Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '../../../../Core/Exceptions/ForbiddenAccessException';
import {InvalidLanguageException} from '../../../../Core/Exceptions/invalid/InvalidLanguageException';
import {ErrorList} from '../../../../Core/Exceptions/ErrorList';
import {ValidateUpdateUserPreferences} from '@copor/core/domain/User/UserPreferences/validations/ValidateUpdateUserPreferences';
import {SaveUserPreferencesDTO} from '@copor/core/domain/User/UserPreferences/interactor/dto/SaveUserPreferencesDTO';
import {
	ValidateUpdateUserPreferencesRepo
} from '@copor/core/domain/User/UserPreferences/repository/ValidateUpdateUserPreferencesRepo';
import {ThemeMode} from '../../../../Core/enum/ThemeMode';
import {Contrast} from '../../../../Core/enum/dto/Contrast';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';
import {FontSize} from '@copor/core/domain/Core/enum/dto/FontSize';
import {ActionFeedbackDuration} from '@copor/core/domain/Core/enum/ActionFeedbackDuration';
import {FontWeight} from '@copor/core/domain/Core/Enum/FontWeight';
import {
	findModulePreferenceDefinition,
	registerModulePreferences
} from '@copor/core/domain/User/UserPreferences/ModulePreferences/ModulePreferenceRegistry';
import {InvalidModulePreferenceException} from '@copor/core/domain/User/UserPreferences/exception/InvalidModulePreferenceException';

// A module preference of a test-only module; core's tests don't depend on a real module.
const SAMPLE_PREFERENCE = 'sample_module.push';

describe('Validate update user preferences tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateUserPreferencesRepo>;
	let validator: ValidateUpdateUserPreferences;
	let input: SaveUserPreferencesDTO;

	beforeAll(() => {
		if (!findModulePreferenceDefinition(SAMPLE_PREFERENCE))
			registerModulePreferences('sample_module', [{key: SAMPLE_PREFERENCE, default: true}]);
	});

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidLanguage: jest.fn()
		};
		input = {
			user: 'actorId',
			themeMode: ThemeMode.DARK,
			actionFeedbackDuration: ActionFeedbackDuration.FIVE_SECONDS,
			language: 'languageId',
			contrast: Contrast.HIGH,
			fontWeight: FontWeight.NORMAL,
			colorSet: ColorSet.SET5,
			contactPrivacy: {
				picture: true,
				email: true,
				dateOfBirth: true,
				tenant: true,
				group: true,
				private: true
			},
			useIcons: true,
			fontSize: FontSize.NORMAL,
			authentication: {faceId: false, fingerprint: false, lockAppId: false},
			modulePreferences: {[SAMPLE_PREFERENCE]: false}
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidLanguage.mockResolvedValue(false);
	});

	it('Should throw error if user is not authorized to update activityType', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		validator = new ValidateUpdateUserPreferences(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if language id is invalid', async () => {
		const errorList = new ErrorList([new InvalidLanguageException()]);

		mockStorageRepo.isInvalidLanguage.mockResolvedValue(true);
		validator = new ValidateUpdateUserPreferences(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should accept a known module preference', async () => {
		validator = new ValidateUpdateUserPreferences(input, mockPermissionRepo, mockStorageRepo);

		expect(await validator.validate()).toBeUndefined();
	});

	it('Should throw error for an unknown module preference', async () => {
		const errorList = new ErrorList([new InvalidModulePreferenceException()]);

		input.modulePreferences = {[`${SAMPLE_PREFERENCE}Typo`]: true};
		validator = new ValidateUpdateUserPreferences(input, mockPermissionRepo, mockStorageRepo);

		expect(await validator.validate()).toStrictEqual(errorList);
	});

	it('Should throw error for a module preference that isn\'t a boolean', async () => {
		const errorList = new ErrorList([new InvalidModulePreferenceException()]);

		input.modulePreferences = {[SAMPLE_PREFERENCE]: 'off' as unknown as boolean};
		validator = new ValidateUpdateUserPreferences(input, mockPermissionRepo, mockStorageRepo);

		expect(await validator.validate()).toStrictEqual(errorList);
	});
});
