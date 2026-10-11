import {GetTagDTO} from '../interactor/dto/GetTagDTO';

export interface GetPrivateTagListForUserRepo {
	load(userId: string, prompt: string): Promise<GetTagDTO[]>;
}
