import {GetMessageDTO} from '../interactor/dto/GetMessageDTO';

export interface GetMessageListRepo {
	list(chatId: string, beforeDate: string, afterDate: string, actorId: string): Promise<GetMessageDTO[]>;
}
