import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateAiContextItem extends TypedLogger<LogDataForUpdateAiContextItem> {
	getType(): string {
		return 'updateAiContextItem';
	}
}

export interface LogDataForUpdateAiContextItem {
	id: string;
	questionDe: string;
	answerDe: string;
	questionEn: string;
	answerEn: string;
	actorId: string;
}