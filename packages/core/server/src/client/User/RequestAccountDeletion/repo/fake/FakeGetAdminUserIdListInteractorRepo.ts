import {GetAdminUserIdListRepo} from '@copor/core/domain/User/repository/GetAdminUserIdListRepo';

export class FakeGetAdminUserIdListInteractorRepo implements GetAdminUserIdListRepo {
	list(): Promise<string[]> {
		return Promise.resolve(['adminId']);
	}
}
