import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateGetStateListDTO} from '@copor/core/domain/Components/State/validations/dto/ValidateGetStateListDTO';
import {ValidateGetStateList} from '@copor/core/domain/Components/State/validations/ValidateGetStateList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('Validation of getting state list for a country tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let input: ValidateGetStateListDTO;
	let validator: ValidateGetStateList;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		input = {
			countryId: 'some-country-id',
			actorId: 'some-user'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});

	it('Should throw error if user is not authorized to get state list', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateGetStateList(input, mockPermissionRepo);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});