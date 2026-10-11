import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateSearchAllMessages} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateSearchAllMessages';

describe('search all messages validator tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const validateSearchAllMessages: ValidateSearchAllMessages = new ValidateSearchAllMessages('actorId', mockPermissionRepo);

	it('should throw error if user is not allowed to search messages', async () => {
		const errorLIst = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const result = await validateSearchAllMessages.validate();

		expect(result).toStrictEqual(errorLIst);
	});
});
