import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateGetAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/ValidateGetAlarmRepo';
import {ValidateGetAlarm} from '@copor/todo/domain/ToDo/Alarm/validations/ValidateGetAlarm';
import {ValidateGetAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/validations/dto/ValidateGetAlarmDTO';
import {InvalidAlarmException} from '@copor/todo/domain/ToDo/Alarm/exception/InvalidAlarmException';

describe('test validate get alarm', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo:jest.Mocked<ValidateGetAlarmRepo>;
	let validator: ValidateGetAlarm;
	let input: ValidateGetAlarmDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidAlarm: jest.fn()
		};
		input = {
			actorId: 'actor-id',
			alarmId: 'uniqueId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidAlarm.mockResolvedValue(false);
	});

	it('should throw error if alarm is invalid', async () => {
		const errorList = new ErrorList([new InvalidAlarmException()]);

		mockStorageRepo.isInvalidAlarm.mockResolvedValue(true);
		validator = new ValidateGetAlarm(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if user has no permission to get alarm', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateGetAlarm(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});