import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateGetVuMeetContactList} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateGetVuMeetContactList';

describe('get user contacts list validator tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const validateGetVuMeetContactList: ValidateGetVuMeetContactList = new ValidateGetVuMeetContactList('userId', mockPermissionRepo);

	it('should throw error if user does not have the permission', async () => {
		const errorLIst = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const result = await validateGetVuMeetContactList.validate();

		expect(result).toStrictEqual(errorLIst);
	});
});