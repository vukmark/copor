import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateUpdateAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/ValidateUpdateAlarmRepo';
import {AlarmableType, AlarmRepeatFrequency, AlarmStatus, SaveAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';
import {ValidateUpdateAlarm} from '@copor/todo/domain/ToDo/Alarm/validations/ValidateUpdateAlarm';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {InvalidAlarmableException} from '@copor/todo/domain/ToDo/Alarm/exception/InvalidAlarmableException';
import {InvalidAlarmException} from '@copor/todo/domain/ToDo/Alarm/exception/InvalidAlarmException';

describe('validate can update todo alarm', () => {
	let mockRepo: jest.Mocked<PermissionRepository>;
	let mockPermissionRepo: jest.Mocked<ValidateUpdateAlarmRepo>;
	let inputDto: SaveAlarmDTO;

	beforeEach(() => {
		mockRepo = {
			isAllowed: jest.fn()
		};
		mockPermissionRepo = {
			isInvalidAlarm: jest.fn(),
			isInvalidAlarmable: jest.fn()
		};
		inputDto = {
			id: 'uniqueId',
			alarmableId: 'uniqueId',
			alarmableType: AlarmableType.PRIVATE_TODO,
			alarmTime: new Date(),
			repeatFrequency: AlarmRepeatFrequency.NONE,
			alarmStatus: AlarmStatus.DISMISSED,
			actorId: 'uniqueId'
		};
		mockRepo.isAllowed.mockResolvedValue(true);
		mockPermissionRepo.isInvalidAlarm.mockResolvedValue(false);
		mockPermissionRepo.isInvalidAlarmable.mockResolvedValue(false);
	});

	it('should throw error if user is not allowed to update todo alarm', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateUpdateAlarm(inputDto, mockRepo, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if alarm is invalid', async () => {
		const errorList = new ErrorList([new InvalidAlarmException()]);

		mockPermissionRepo.isInvalidAlarm.mockResolvedValue(true);
		const validator = new ValidateUpdateAlarm(inputDto, mockRepo, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if alarmable is invalid', async () => {
		const errorList = new ErrorList([new InvalidAlarmableException()]);

		mockPermissionRepo.isInvalidAlarmable.mockResolvedValue(true);
		const validator = new ValidateUpdateAlarm(inputDto, mockRepo, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
