import {GetNotificationTokenDTO} from '../interactor/dto/GetNotificationTokenDTO';

export interface GetAllNotificationTokensRepo {
	load(userID: string): Promise<GetNotificationTokenDTO[]>;
}
