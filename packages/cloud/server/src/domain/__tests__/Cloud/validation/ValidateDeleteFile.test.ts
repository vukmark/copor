import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateDeleteFile} from '@copor/cloud/domain/Cloud/validation/ValidateDeleteFile';
import {
	ValidateDeleteFileDTO
} from '@copor/cloud/domain/Cloud/validation/dto/ValidateDeleteFileDTO';
import {ValidateDeleteFileRepo} from '@copor/cloud/domain/Cloud/repository/ValidateDeleteFileRepo';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';

describe('Validate delete File tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteFileRepo>;
	let validator: ValidateDeleteFile;
	let input: ValidateDeleteFileDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidFile: jest.fn()
		};
		input = {
			actorId: 'actorId',
			fileId: 'fid'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidFile.mockResolvedValue(false);
	});

	it('Should throw error if user is not authorized to delete File', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateDeleteFile(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
