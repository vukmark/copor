import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateGetUserList} from '@copor/core/domain/User/validation/ValidateGetUserList';


describe('test get user list validator', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let validator: ValidateGetUserList;
	const actorId: string = 'userId';

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};

		validator = new ValidateGetUserList(actorId, mockPermissionRepo);
	});
	it('should throw error if user has no permission', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
