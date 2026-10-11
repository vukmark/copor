import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateCreateChecklist} from '@copor/checklist/domain/Checklist/validations/ValidateCreateChecklist';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateCreateChecklistDTO} from '@copor/checklist/domain/Checklist/validations/dto/ValidateCreateChecklistDTO';

describe('Test create checklist validator', () => {
	let permissionRepo: jest.Mocked<PermissionRepository>;
	let validator: ValidateCreateChecklist;
	let input: ValidateCreateChecklistDTO;

	beforeEach(() => {
		permissionRepo = {
			isAllowed: jest.fn()
		};
		input = {
			actorId: 'some-id'
		};
	});

	it('Should throw error if user is not authorized to create checklist', async() => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		permissionRepo.isAllowed.mockResolvedValue(false);

		validator = new ValidateCreateChecklist(input, permissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});