import {DeepSeekMessage} from '../dto/DeepSeekMessage';
import {i18nRequestContext} from '@copor/core/client/i18n';
import {AiContextItemRow} from '@copor/vu_meet/client/VuMeet/AiBot/CreateAiBotMessage/dto/AiContextItemRow';
import {AiContextItemRepo} from '@copor/vu_meet/client/VuMeet/AiBot/CreateAiBotMessage/Utilities/AiContextItemRepo';

export class FaqSearchService {
	public static async getRelevantSection(questions: DeepSeekMessage[]): Promise<string> {
		const lang = i18nRequestContext.getStore()?.language ?? 'de';
		const isGerman = lang.startsWith('de');
		const rules = isGerman
			? '- Verwende diese Antworten, wenn der Benutzer dieselbe oder eine semantisch gleichwertige Frage stellt.\n'
			+ 'PFLICHT: Antworte IMMER auf Deutsch. Niemals auf Englisch antworten!!!'
			: '- Use these answers when the user asks the same question or a semantically equivalent question.\n'
			+ 'MANDATORY: ALWAYS answer in English. Never answer in German!!!';

		const userQuery = questions
			.filter((m) => m.role === 'user')
			.map((m) => m.content)
			.join(' ')
			.toLowerCase();

		const allItems = await AiContextItemRepo.getAll();

		if (!userQuery)
			return this.formatAll(allItems, lang);

		const words = userQuery.split(/\s+/).filter((w) => w.length > 2);

		const relevant = allItems
			.map((item) => {
				const searchable = [item.questionDe, item.answerDe, item.questionEn, item.answerEn]
					.join(' ')
					.toLowerCase();
				const score = words.reduce((acc, word) => acc + (searchable.includes(word) ? 1 : 0), 0);

				return {item, score};
			})
			.filter((x) => x.score > 0)
			.sort((a, b) => b.score - a.score)
			.slice(0, 5)
			.map((x) => this.formatItem(x.item, lang))
			.join('\n\n');

		return relevant ? rules + '\n' + relevant : this.formatAll(allItems, lang);
	}

	private static formatItem(item: AiContextItemRow, lang: string): string {
		const isGerman = lang.startsWith('de');

		if (isGerman)
			return `Question DE:\n${item.questionDe}\nAnswer DE:\n${item.answerDe}`;
		return `Question EN:\n${item.questionEn}\nAnswer EN:\n${item.answerEn}`;
	}

	private static formatAll(items: AiContextItemRow[], lang: string): string {
		return items.map((item) => this.formatItem(item, lang)).join('\n\n');
	}
}