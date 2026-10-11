import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateCreateUser} from '@copor/core/domain/User/validation/ValidateCreateUser';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateCreateUserDTO} from '@copor/core/domain/User/validation/dto/ValidateCreateUserDTO';

describe('test create user validator', () => {
	let mockPermissionRepo : jest.Mocked<PermissionRepository>;
	let validator: ValidateCreateUser;
	let input: ValidateCreateUserDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		input = {
			authUserId: 'authUserId',
			actorId: 'actId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});

	it('should throw error if user is not authorized to create user', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateCreateUser(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
