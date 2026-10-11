import {ValidateUserIsVisible} from '@copor/core/domain/User/VisibleUsers/validation/ValidateUserIsVisible';
import {IsUserNotVisibleRepo} from '@copor/core/domain/User/VisibleUsers/repository/IsUserNotVisibleRepo';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';

describe('ValidateUserIsVisible', () => {
	const mockRepo: jest.Mocked<IsUserNotVisibleRepo> = {
		isUserNotVisible: jest.fn()
	};
	const input = {actorId: 'actor-1', userId: 'user-2', permissionType: 'sample.canPickRecipient' as const, activeOnly: true};

	beforeEach(() => mockRepo.isUserNotVisible.mockReset());

	it('passes for a user the actor may see under the permission', async () => {
		mockRepo.isUserNotVisible.mockResolvedValue(false);

		await expect(new ValidateUserIsVisible(mockRepo, input).validate()).resolves.toBeUndefined();
		expect(mockRepo.isUserNotVisible).toHaveBeenCalledWith('actor-1', 'user-2', 'sample.canPickRecipient', true);
	});

	it('reports a user outside the scope like an unknown user', async () => {
		mockRepo.isUserNotVisible.mockResolvedValue(true);

		await expect(new ValidateUserIsVisible(mockRepo, input).validate()).rejects.toBeInstanceOf(InvalidUserException);
	});
});
