import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateGetFile} from '@copor/cloud/domain/Cloud/validation/ValidateGetFile';
import {ValidateGetFileDTO} from '@copor/cloud/domain/Cloud/validation/dto/ValidateGetFileDTO';
import {ValidateGetFileRepo} from '@copor/cloud/domain/Cloud/repository/ValidateGetFileRepo';
import {InvalidCloudFileException} from '@copor/cloud/domain/Cloud/exception/InvalidCloudFileException';

describe('Test validate get File', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetFileRepo>;
	const input: ValidateGetFileDTO = {
		actorId: 'actorID',
		fileId: 'fid'
	};

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};

		mockStorageRepo = {
			isInvalidCloudFile: jest.fn()
		};

		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidCloudFile.mockResolvedValue(false);
	});

	it('Should throw error if user does not have permission', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetFile = new ValidateGetFile(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if file is invalid', async () => {
		const errorList = new ErrorList([new InvalidCloudFileException()]);

		mockStorageRepo.isInvalidCloudFile.mockResolvedValue(true);
		const validator: ValidateGetFile = new ValidateGetFile(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});