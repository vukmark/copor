import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateGetUserGroupTree} from '@copor/core/domain/UserGroup/validation/ValidateGetUserGroupTree';

describe('Validate get UserGroup tree tests', () => {
	it('Should throw error if user has no permission', async () => {
		const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
			isAllowed: jest.fn()
		};
		const actorId: string = 'unique-id';
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateGetUserGroupTree(actorId, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});