import {GetUserIdByCredentialsRepo} from '@copor/core/domain/Login/repository/GetUserIdByCredentialsRepo';
import {CredentialsDTO} from '@copor/core/domain/Login/interactor/dto/CredentialsDTO';
import {UserCredentialsResultDTO} from '@copor/core/domain/Login/interactor/dto/UserCredentialsResultDTO';

export class FakeLoginRepository implements GetUserIdByCredentialsRepo {
	getUserIdByCredentials(credentials: CredentialsDTO): Promise<UserCredentialsResultDTO> {
		return new Promise((resolve) => {
			resolve({userId: '555-333', isActive: true});
		});
	}
}
