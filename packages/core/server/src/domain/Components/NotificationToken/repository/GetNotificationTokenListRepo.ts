import {GetNotificationTokenDTO} from '../interactor/dto/GetNotificationTokenDTO';

export interface GetNotificationTokenListRepo {
	load(userIdList: string[]): Promise<GetNotificationTokenDTO[]>;
}
