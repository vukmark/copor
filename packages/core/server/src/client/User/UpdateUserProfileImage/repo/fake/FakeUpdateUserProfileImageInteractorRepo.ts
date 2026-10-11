import {SaveUserProfileImageRepo} from '@copor/core/domain/User/repository/SaveUserProfileImageRepo';


export class FakeUpdateUserProfileImageInteractorRepo implements SaveUserProfileImageRepo {
	save(userId: string, image: Buffer): Promise<void> {
		return Promise.resolve();
	}
}
