import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {NotificationTokenType} from '@copor/core/domain/Core/enum/NotificationTokenType';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {
	ValidateCreateNotificationToken
} from '@copor/core/domain/Components/NotificationToken/validations/ValidateCreateNotificationToken';
import {EmptyNotificationTokenException} from '@copor/core/domain/Core/Exceptions/empty/EmptyNotificationTokenException';
import {
	ValidateCreateNotificationTokenRepo
} from '@copor/core/domain/Components/NotificationToken/repository/ValidateCreateNotificationTokenRepo';
import {
	ValidateCreateNotificationTokenDTO
} from '@copor/core/domain/Components/NotificationToken/validations/dto/ValidateCreateNotificationTokenDTO';

describe('create notification token validator tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateCreateNotificationTokenRepo>;
	let validator: ValidateCreateNotificationToken;
	let input: ValidateCreateNotificationTokenDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isNotValidUser: jest.fn()
		};
		input = {
			userId: 'userId',
			type: NotificationTokenType.IOS,
			token: 'token'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
	});
	it('Should throw error if user is not authorized to create notification token', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateCreateNotificationToken(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if token is empty', async () => {
		const errorList = new ErrorList([new EmptyNotificationTokenException()]);

		input.token = '';
		validator = new ValidateCreateNotificationToken(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
