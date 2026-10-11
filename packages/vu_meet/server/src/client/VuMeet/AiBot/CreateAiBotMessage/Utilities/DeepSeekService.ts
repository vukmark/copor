import {DeepSeekMessage} from '@copor/vu_meet/client/VuMeet/AiBot/CreateAiBotMessage/dto/DeepSeekMessage';
import {DeepSeekRequest} from '@copor/vu_meet/client/VuMeet/AiBot/CreateAiBotMessage/dto/DeepSeekRequest';
import {DeepSeekResponse} from '@copor/vu_meet/client/VuMeet/AiBot/CreateAiBotMessage/dto/DeepSeekResponse';

const PROVIDER_API_URL = 'https://api.lyceum.technology/api/v2/external/serverless/chat/completions';
//@TODO api key should not be here
const API_KEY = process.env.LYCEUM_API_KEY ?? 'lk_540c824a48399de1195d7451d3f766d0bea7126c97294387c6839ddc577e671f';
const MODEL = 'deepseek/deepseek-v4-pro';


export class DeepSeekService {
	public static async query(
		messages: DeepSeekMessage[],
		model: string = MODEL,
		temperature = 0.4
	): Promise<string> {
		const response = await this.makeApiRequest({
			model,
			messages,
			temperature,
			topP: 0.9,
			topK: 50,
			maxTokens: 1024,
			presencePenalty: 0,
			frequencyPenalty: 0,
			responseFormat: {type: 'text'},
			stream: false
		});

		return response.choices[0].message.content;
	}

	private static async makeApiRequest(requestData: DeepSeekRequest): Promise<DeepSeekResponse> {
		const response = await fetch(PROVIDER_API_URL, {
			method: 'POST',
			headers: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'Authorization': `Bearer ${API_KEY}`,
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestData)
		});

		if (!response.ok) {
			throw new Error(`DeepSeek API failed: ${response.status} ${response.statusText}`);
		}

		return response.json() as Promise<DeepSeekResponse>;
	}
}