import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateGetFeatureList} from '@copor/core/domain/FeatureList/validation/ValidateGetFeatureList';
import {ValidateGetFeatureListDTO} from '@copor/core/domain/FeatureList/validation/dto/ValidateGetFeatureListDTO';

describe('Test validate get ContentList', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	const input: ValidateGetFeatureListDTO = {
		actorId: 'actorID'
	};

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};

		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});

	it('Should throw error if user does not have permission', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetFeatureList = new ValidateGetFeatureList(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});