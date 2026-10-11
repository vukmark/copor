import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {
	ValidateDeleteNotificationTokenDTO
} from '@copor/core/domain/Components/NotificationToken/validations/dto/ValidateDeleteNotificationTokenDTO';
import {
	ValidateDeleteNotificationTokenRepo
} from '@copor/core/domain/Components/NotificationToken/repository/ValidateDeleteNotificationTokenRepo';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {
	ValidateDeleteNotificationToken
} from '@copor/core/domain/Components/NotificationToken/validations/ValidateDeleteNotificationToken';

describe('delete notification token validator test', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteNotificationTokenRepo>;
	let inputDTO: ValidateDeleteNotificationTokenDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidNotificationToken: jest.fn()
		};
		inputDTO = {
			actorId: 'actorId',
			token: 'token'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidNotificationToken.mockResolvedValue(false);
	});
	it('Should throw if user is not allowed to delete Notification Token', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateDeleteNotificationToken
            = new ValidateDeleteNotificationToken(inputDTO, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});