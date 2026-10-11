import {GetUnreadMessageCountForUserDTO} from '../interactor/dto/GetUnreadMessageCountForUserDTO';

export interface GetUnreadMessageCountForUserRepo {
	getUnreadMessageCountForUser(userId: string): Promise<GetUnreadMessageCountForUserDTO>;
}
