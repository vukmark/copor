import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateUpdatePersonalProfileImage} from '@copor/core/domain/User/validation/ValidateUpdatePersonalProfileImage';
import {
	ValidateUpdatePersonalProfileImageDTO
} from '@copor/core/domain/User/validation/dto/ValidateUpdatePersonalProfileImageDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';

describe('Validate update PersonalProfileImage tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let validator: ValidateUpdatePersonalProfileImage;
	let input: ValidateUpdatePersonalProfileImageDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		input = {
			actorId: 'actorId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});

	it('Should throw error if user is not authorized to update PersonalProfileImage', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdatePersonalProfileImage(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
