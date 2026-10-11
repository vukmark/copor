import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateCreateNews} from '@copor/news/domain/News/validations/ValidateCreateNews';
import {ValidateCreateNewsDTO} from '@copor/news/domain/News/validations/dto/ValidateCreateNewsDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateCreateNewsRepo} from '@copor/news/domain/News/repository/ValidateCreateNewsRepo';

describe('validate create news tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateCreateNewsRepo>;
	let validator: ValidateCreateNews;
	let input: ValidateCreateNewsDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidNews: jest.fn()
		};
		input = {
			actorId: 'actorId',
			content: 'content',
			publishStatus: PublishStatus.published,
			roleId: ['roleId'],
			summary: 'summary',
			title: 'title'

		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidNews.mockResolvedValue(false);
	});

	it('should throw error if user is not allowed to create news', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		validator = new ValidateCreateNews(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	}
	);
}
);