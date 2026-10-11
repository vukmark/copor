import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateStartPrivateCallRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateStartPrivateCallRepo';
import {ValidateStartGroupCallDTO} from '@copor/vu_meet/domain/VuMeet/Chat/validations/dto/ValidateStartGroupCallDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateStartGroupCall} from '@copor/vu_meet/domain/VuMeet/Chat/validations/ValidateStartGroupCall';
import {InvalidChatException} from '@copor/vu_meet/domain/VuMeet/Core/exception/InvalidChatException';
import {UserNotInChatException} from '@copor/vu_meet/domain/VuMeet/Core/exception/UserNotInChatException';

describe('Validate start group call test', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const mockStorageRepo: jest.Mocked<ValidateStartPrivateCallRepo> = {
		isInvalidChat: jest.fn(),
		isUserNotInChat: jest.fn()
	};
	const input: ValidateStartGroupCallDTO = {
		actorId: 'actorId',
		chatId: 'chatId'
	};

	beforeEach(() => {
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidChat.mockResolvedValue(false);
		mockStorageRepo.isUserNotInChat.mockResolvedValue(false);
	});

	it('should throw error if user is not allowed to start group call', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateStartGroupCall = new ValidateStartGroupCall(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if group chat is invalid', async () => {
		const errorList = new ErrorList([new InvalidChatException()]);

		mockStorageRepo.isInvalidChat.mockResolvedValue(true);
		const validator: ValidateStartGroupCall = new ValidateStartGroupCall(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if the actor is not a member of the chat', async () => {
		const errorList = new ErrorList([new UserNotInChatException()]);

		mockStorageRepo.isUserNotInChat.mockResolvedValue(true);
		const validator: ValidateStartGroupCall = new ValidateStartGroupCall(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});