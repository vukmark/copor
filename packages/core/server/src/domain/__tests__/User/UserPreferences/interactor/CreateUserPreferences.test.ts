import {CreateUserPreferences} from '@copor/core/domain/User/UserPreferences/interactor/CreateUserPreferences';
import {SaveUserPreferencesRepo} from '@copor/core/domain/User/UserPreferences/repository/SaveUserPreferencesRepo';
import {SaveUserPreferencesDTO} from '@copor/core/domain/User/UserPreferences/interactor/dto/SaveUserPreferencesDTO';
import {ThemeMode} from '@copor/core/domain/Core/enum/ThemeMode';
import {Contrast} from '@copor/core/domain/Core/enum/dto/Contrast';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';
import {FontSize} from '@copor/core/domain/Core/enum/dto/FontSize';
import {ActionFeedbackDuration} from '@copor/core/domain/Core/enum/ActionFeedbackDuration';
import {FontWeight} from '@copor/core/domain/Core/Enum/FontWeight';

describe('create user preferences interactor tests', () => {
	let mockRepo: jest.Mocked<SaveUserPreferencesRepo>;
	let inputDTO: SaveUserPreferencesDTO;
	let createUserPreferences: CreateUserPreferences;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		inputDTO = {
			contrast: Contrast.AUTO,
			actionFeedbackDuration: ActionFeedbackDuration.FIVE_SECONDS,
			themeMode: ThemeMode.AUTO,
			language: 'lid',
			user: 'aId',
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
			fontWeight: FontWeight.LIGHT,
			authentication: {faceId: false, fingerprint: false, lockAppId: false}
		};
		createUserPreferences = new CreateUserPreferences(inputDTO, mockRepo);
	});
	it('Should save an user preferences', async () => {
		await createUserPreferences.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});
