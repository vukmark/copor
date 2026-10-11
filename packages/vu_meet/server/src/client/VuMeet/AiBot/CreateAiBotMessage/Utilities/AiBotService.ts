import {DeepSeekMessage} from '../dto/DeepSeekMessage';
import {AiBotUserRole} from '../dto/CreatePrivateMessageReqBodyDTO';
import {DeepSeekService} from './DeepSeekService';
import {FaqSearchService} from './FaqSearchService';
import {getKnowledgeBaseDocumentationForFeatures} from '../Documentation/KnowledgeBaseDocumentationMap';
import {getNavigationContext} from '../Documentation/KnoledgeBase/Main/NavigationContext';
import {getExamples} from '../Documentation/KnoledgeBase/Main/Examples';
import {customTranslations} from '../Documentation/KnoledgeBase/Main/CustomTranslations';

export class AiBotService {
	public static async ask(
		questions: DeepSeekMessage[],
		role: AiBotUserRole,
		featureList: string[]
	): Promise<string> {
		const systemMessage = await this.buildSystemMessage(questions, featureList, role);
		const messages: DeepSeekMessage[] = [
			{role: 'system', content: systemMessage},
			... questions
		];

		return DeepSeekService.query(messages);
	}

	private static async buildSystemMessage(
		questions: DeepSeekMessage[],
		featureList?: string[],
		role?: AiBotUserRole
	): Promise<string> {
		return [
			getNavigationContext(featureList, role),
			customTranslations,
			await FaqSearchService.getRelevantSection(questions),
			getKnowledgeBaseDocumentationForFeatures(featureList, role),
			getExamples()
		].filter(Boolean).join('\n');
	}
}