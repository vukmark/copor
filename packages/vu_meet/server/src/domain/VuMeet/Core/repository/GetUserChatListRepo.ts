import {GetUserChatDTO} from '../interactor/dto/GetUserChatDTO';

export interface GetUserChatListRepo {
	list(userId: string, prompt: string): Promise<GetUserChatDTO[]>;
}
