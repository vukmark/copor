import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateUpdateSettingsRepo} from '@copor/core/domain/MyAccount/repository/ValidateUpdateSettingsRepo';
import {ValidateUpdateSettings} from '@copor/core/domain/MyAccount/validations/ValidateUpdateSettings';
import {SaveSettingsDTO} from '@copor/core/domain/MyAccount/interactor/dto/SaveSettingsDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';

describe('Validate update personal settings tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateSettingsRepo>;
	let validator: ValidateUpdateSettings;
	let input: SaveSettingsDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isNotValidUser: jest.fn()
		};
		input = {
			id: 'some-id',
			darkMode: false,
			expertMode: true,
			waiAria: true,
			avatar: 'some-url',
			actorId: 'actor-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
	});

	it('Should throw error if user is not allowed to update personal settings', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdateSettings(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if user is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		mockStorageRepo.isNotValidUser.mockResolvedValue(true);
		validator = new ValidateUpdateSettings(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});