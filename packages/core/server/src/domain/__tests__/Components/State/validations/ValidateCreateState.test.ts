import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateCreateStateRepo} from '@copor/core/domain/Components/State/repository/ValidateCreateStateRepo';
import {ValidateCreateState} from '@copor/core/domain/Components/State/validations/ValidateCreateState';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {EmptyNameException} from '@copor/core/domain/Core/Exceptions/empty/EmptyNameException';
import {EmptyCodeException} from '@copor/core/domain/Core/Exceptions/empty/EmptyCodeException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {InvalidCountryException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidCountryException';
import {SaveStateDTO} from '@copor/core/domain/Components/State/interactor/dto/SaveStateDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('Validate create state tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateCreateStateRepo>;
	let validator: ValidateCreateState;
	let input: SaveStateDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidCountry: jest.fn()
		};
		input = {
			id: 'unique-Id',
			name: 'Bayern',
			code: 'BY',
			countryId: 'someCountryId',
			actorId: 'some_actorId',
			publishStatus: PublishStatus.published
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidCountry.mockResolvedValue(false);
	});

	it('Should throw error if user is not authorized to create a state', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateCreateState(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if name is empty', async () => {
		const errorList = new ErrorList([new EmptyNameException()]);

		input.name = '';
		const validator = new ValidateCreateState(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if code is empty', async () => {
		const errorList = new ErrorList([new EmptyCodeException()]);

		input.code = '';
		const validator = new ValidateCreateState(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if country is invalid', async () => {
		const errorList = new ErrorList([new InvalidCountryException()]);
		const validator = new ValidateCreateState(input, mockPermissionRepo, mockStorageRepo);

		mockStorageRepo.isInvalidCountry.mockResolvedValue(true);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});