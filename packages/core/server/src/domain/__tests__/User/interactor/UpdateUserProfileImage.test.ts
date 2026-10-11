
import {UpdateUserProfileImage} from '@copor/core/domain/User/interactor/UpdateUserProfileImage';
import {SaveUserProfileImageRepo} from '@copor/core/domain/User/repository/SaveUserProfileImageRepo';
import {SaveUserProfileImageDTO} from '@copor/core/domain/User/interactor/dto/SaveUserProfileImageDTO';

describe('update UserProfileImage tests', () => {
	let mockRepo: jest.Mocked<SaveUserProfileImageRepo>;
	let inputDTO: SaveUserProfileImageDTO;
	let updateUserProfileImage: UpdateUserProfileImage;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		inputDTO = {
			userId: 'uid',
			image: Buffer.from('test image data'),
			newImageId: 'id'
		};
		updateUserProfileImage = new UpdateUserProfileImage(inputDTO, mockRepo);
	});
	it('should save data for update', async () => {
		await updateUserProfileImage.execute();
		expect(mockRepo.save).toHaveBeenCalled();
	});
});
