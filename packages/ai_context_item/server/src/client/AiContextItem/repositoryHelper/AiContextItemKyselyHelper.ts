import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';

export class AiContextItemKyselyHelper {
	private static readonly helper = new EntityRepoHelper('ai_context_item');

	public static async isInvalidAiContextItem(id: string | undefined) {
		return this.helper.isInvalid(id);
	}

	public static async aiContextItemHasReferences(id: string | undefined) {
		return this.helper.hasReferences(id);
	}
}