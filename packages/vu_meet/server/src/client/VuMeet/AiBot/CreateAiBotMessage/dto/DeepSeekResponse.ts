import {DeepSeekMessage} from '@copor/vu_meet/client/VuMeet/AiBot/CreateAiBotMessage/dto/DeepSeekMessage';

export interface DeepSeekResponse {
	id: string;
	object: string;
	created: number;
	choices: {
		message: DeepSeekMessage;
		finishReason: string;
		index: number;
	}[];
	usage: {
		promptTokens: number;
		completionTokens: number;
		totalTokens: number;
	};
}