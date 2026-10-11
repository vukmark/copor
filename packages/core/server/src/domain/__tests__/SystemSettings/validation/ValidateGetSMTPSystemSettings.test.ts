import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateGetSMTPSystemSettingsDTO} from '@copor/core/domain/SystemSettings/validation/dto/ValidateGetSMTPSystemSettingsDTO';
import {ValidateSMTPGetSystemSettings} from '@copor/core/domain/SystemSettings/validation/ValidateSMTPGetSystemSettings';

describe('Test validate get System Settings', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	const input: ValidateGetSMTPSystemSettingsDTO = {
		actorId: 'actorID'
	};

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};

		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});

	it('Should throw error if user does not have permission', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateSMTPGetSystemSettings
			= new ValidateSMTPGetSystemSettings(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});