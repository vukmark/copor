import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {
	ValidateGetUserPreferencesDTO
} from '@copor/core/domain/User/UserPreferences/validations/dto/ValidateGetUserPreferencesDTO';
import {
	ValidateGetUserPreferences
} from '@copor/core/domain/User/UserPreferences/validations/ValidateGetUserPreferences';


describe('validate get user preferences tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	const input: ValidateGetUserPreferencesDTO = {
		actorId: 'aId'
	};

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};

		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});
	it('Should throw error if user does not have permission', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetUserPreferences = new ValidateGetUserPreferences(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
