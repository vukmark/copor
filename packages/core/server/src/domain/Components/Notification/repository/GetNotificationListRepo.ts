import {GetNotificationDTO} from '../interactor/dto/GetNotificationDTO';

export interface GetNotificationListRepo {
	load(userId: string): Promise<GetNotificationDTO[]>;
}
