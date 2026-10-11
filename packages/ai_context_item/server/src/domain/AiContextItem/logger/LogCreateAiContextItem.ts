import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateAiContextItem extends TypedLogger<LogDataForCreateAiContextItem> {
	getType(): string {
		return 'createAiContextItem';
	}
}

export interface LogDataForCreateAiContextItem {
	id: string;
	questionDe: string;
	answerDe: string;
	questionEn: string;
	answerEn: string;
}