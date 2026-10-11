import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateGetUserChatList} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateGetUserChatList';

describe('get user chat list validator tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const validateGetUserChatList: ValidateGetUserChatList = new ValidateGetUserChatList('userId', mockPermissionRepo);

	it('should throw error if user does not have permission', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const result = await validateGetUserChatList.validate();

		expect(result).toStrictEqual(errorList);
	});
});
