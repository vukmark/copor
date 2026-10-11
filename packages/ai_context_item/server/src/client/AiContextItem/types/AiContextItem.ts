import {Generated} from '@copor/core/client/types/tables/Generated';

export interface AiContextItem {
	id: string;
	questionDe: string;
	answerDe: string;
	questionEn: string;
	answerEn: string;
	createdAt: Generated<Date>;
	createdBy: string;
	modifiedAt: Generated<Date>;
	modifiedBy: string;
}