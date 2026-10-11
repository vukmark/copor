import {ValidateDeleteAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/validations/dto/ValidateDeleteAlarmDTO';
import {ValidateDeleteAlarm} from '@copor/todo/domain/ToDo/Alarm/validations/ValidateDeleteAlarm';
import {ValidateDeleteAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/ValidateDeleteAlarmRepo';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {InvalidAlarmException} from '@copor/todo/domain/ToDo/Alarm/exception/InvalidAlarmException';

describe('validate delete todo alarm tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteAlarmRepo>;
	let inputDto: ValidateDeleteAlarmDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidAlarm: jest.fn()
		};
		inputDto = {
			alarmId: 'alarm-id',
			actorId: 'actor-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidAlarm.mockResolvedValue(false);
	});
	it('should throw error if alarm id is invalid', async () => {
		const errorList = new ErrorList([new InvalidAlarmException()]);

		const validator = new ValidateDeleteAlarm(inputDto, mockPermissionRepo, mockStorageRepo);

		mockStorageRepo.isInvalidAlarm.mockResolvedValue(true);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if user is not authorized to delete alarm', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		const validator = new ValidateDeleteAlarm(inputDto, mockPermissionRepo, mockStorageRepo);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
