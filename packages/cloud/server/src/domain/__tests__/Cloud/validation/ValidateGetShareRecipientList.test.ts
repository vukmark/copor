import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateGetShareRecipientList} from '@copor/cloud/domain/Cloud/validation/ValidateGetShareRecipientList';
import {CloudPermission} from '@copor/cloud/domain/Cloud/CloudPermission';

describe('get share recipient list validator tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const validator = new ValidateGetShareRecipientList('userId', mockPermissionRepo);

	beforeEach(() => mockPermissionRepo.isAllowed.mockReset());

	it('fails without cloud.canGetShareRecipientList', async () => {
		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		expect(await validator.validate()).toStrictEqual(new ErrorList([new ForbiddenAccessException()]));
		expect(mockPermissionRepo.isAllowed).toHaveBeenCalledWith('userId', CloudPermission.canGetShareRecipientList, undefined);
	});

	it('passes with the permission', async () => {
		mockPermissionRepo.isAllowed.mockResolvedValue(true);

		expect(await validator.validate()).toBeUndefined();
	});
});
