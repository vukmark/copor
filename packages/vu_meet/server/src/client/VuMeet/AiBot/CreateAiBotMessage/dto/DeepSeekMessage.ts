export interface DeepSeekMessage {
	role: 'system' | 'user' | 'assistant';
	content: string;
}