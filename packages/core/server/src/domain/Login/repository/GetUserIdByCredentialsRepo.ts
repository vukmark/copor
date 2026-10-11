import {CredentialsDTO} from '../interactor/dto/CredentialsDTO';
import {UserCredentialsResultDTO} from '../interactor/dto/UserCredentialsResultDTO';

export interface GetUserIdByCredentialsRepo {
	getUserIdByCredentials(credentials: CredentialsDTO): Promise<UserCredentialsResultDTO | undefined>;
}
