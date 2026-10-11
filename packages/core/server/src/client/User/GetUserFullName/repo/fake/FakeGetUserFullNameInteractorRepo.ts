import {GetUserFullNameRepo} from '@copor/core/domain/User/repository/GetUserFullNameRepo';

export class FakeGetUserFullNameInteractorRepo implements GetUserFullNameRepo {
	load(id: string): Promise<string> {
		return Promise.resolve('Aco Bursac');
	}
}
