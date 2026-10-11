import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateGetContactList} from '@copor/contacts/domain/Contacts/validation/ValidateGetContactList';

describe('get contacts list validator tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const validateGetContactList: ValidateGetContactList = new ValidateGetContactList('userId', mockPermissionRepo);

	it('should throw error if user does not have the permission', async () => {
		const errorLIst = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const result = await validateGetContactList.validate();

		expect(result).toStrictEqual(errorLIst);
	});
});