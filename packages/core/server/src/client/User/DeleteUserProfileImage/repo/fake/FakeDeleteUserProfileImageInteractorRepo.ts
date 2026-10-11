import {DeleteUserProfileImageRepo} from '@copor/core/domain/User/repository/DeleteUserProfileImageRepo';

export class FakeDeleteUserProfileImageInteractorRepo implements DeleteUserProfileImageRepo {
	deleteProfileImage(userId: string): Promise<void> {
		return Promise.resolve();
	}
}
