import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {
	ValidateDeleteUserPreferencesDTO
} from '@copor/core/domain/User/UserPreferences/validations/dto/ValidateDeleteUserPreferencesDTO';
import {
	ValidateDeleteUserPreferences
} from '@copor/core/domain/User/UserPreferences/validations/ValidateDeleteUserPreferences';


describe('validate delete user preferences tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let input: ValidateDeleteUserPreferencesDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		input = {
			actorId: 'unique_id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});
	it('Should throw error if user has no permission to delete activity type', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateDeleteUserPreferences(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
