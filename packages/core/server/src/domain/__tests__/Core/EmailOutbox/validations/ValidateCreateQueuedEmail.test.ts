import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateCreateQueuedEmail}
	from '@copor/core/domain/Core/EmailOutbox/validation/ValidateCreateQueuedEmail';
import {ValidateCreateQueuedEmailDTO} from '@copor/core/domain/Core/EmailOutbox/validation/dto/ValidateCreateQueuedEmailDTO';
import {MissingEmailParameterException} from '@copor/core/domain/Core/EmailOutbox/exception/MissingEmailParameterException';

describe('validate queue email tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let validator: ValidateCreateQueuedEmail;
	let input: ValidateCreateQueuedEmailDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		input = {
			type: 'name',
			receiver: 'code',
			payload: 'j',
			actorId: 'someId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});

	it('should throw error if user is not authorized to queue an email', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateCreateQueuedEmail(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if type is empty', async() => {
		const errorList = new ErrorList([new MissingEmailParameterException()]);

		input.type = '';
		validator = new ValidateCreateQueuedEmail(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if receiver is empty', async() => {
		const errorList = new ErrorList([new MissingEmailParameterException()]);

		input.receiver = '';
		validator = new ValidateCreateQueuedEmail(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
