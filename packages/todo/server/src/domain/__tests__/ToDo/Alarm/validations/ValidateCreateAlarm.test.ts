import {ValidateCreateAlarm} from '@copor/todo/domain/ToDo/Alarm/validations/ValidateCreateAlarm';
import {ValidateCreateAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/ValidateCreateAlarmRepo';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {AlarmableType, AlarmRepeatFrequency, AlarmStatus, SaveAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';
import {InvalidAlarmableException} from '@copor/todo/domain/ToDo/Alarm/exception/InvalidAlarmableException';

describe('validate can create todo alarm', () => {
	let mockRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateCreateAlarmRepo>;
	let inputDto: SaveAlarmDTO;

	beforeEach(() => {
		mockRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
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
		mockStorageRepo.isInvalidAlarmable.mockResolvedValue(false);
	});

	it('should throw error if user is not allowed to create todo alarm', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateCreateAlarm(inputDto, mockRepo, mockStorageRepo);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if todo id is invalid', async () => {
		const errorList = new ErrorList([new InvalidAlarmableException()]);

		mockStorageRepo.isInvalidAlarmable.mockResolvedValue(true);
		const validator = new ValidateCreateAlarm(inputDto, mockRepo, mockStorageRepo);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
