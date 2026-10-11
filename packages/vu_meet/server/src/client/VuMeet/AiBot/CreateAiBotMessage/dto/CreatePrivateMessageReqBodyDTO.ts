import {DeepSeekMessage} from '@copor/vu_meet/client/VuMeet/AiBot/CreateAiBotMessage/dto/DeepSeekMessage';

export type AiBotUserRole = 'user' | 'admin';
export interface CreateAiBotMessageReqBodyDTO {
	messages: DeepSeekMessage[];
	role: AiBotUserRole;
	userName: string;
	featureList: string[];
}
