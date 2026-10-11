import {ValidateGetRoleList} from '@copor/core/domain/Components/Role/validations/ValidateGetRoleList';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('validate get role list tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let actorId: string;
	let validator: ValidateGetRoleList;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		actorId = 'actor-id';
		validator = new ValidateGetRoleList(actorId, mockPermissionRepo);
	});

	it('should throw error if user is not allowed to get role list', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		validator = new ValidateGetRoleList(actorId, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
