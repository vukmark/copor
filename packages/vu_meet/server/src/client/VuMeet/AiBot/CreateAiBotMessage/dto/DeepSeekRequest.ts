import {DeepSeekMessage} from '@copor/vu_meet/client/VuMeet/AiBot/CreateAiBotMessage/dto/DeepSeekMessage';

export interface DeepSeekRequest {
	model: string;
	messages: DeepSeekMessage[];
	temperature?: number;
	topP?: number;
	topK?: number;
	maxTokens?: number;
	presencePenalty?: number;
	frequencyPenalty?: number;
	responseFormat?: {
		type: 'text';
	};
	stream?: boolean;
}