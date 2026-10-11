import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';

export class ContentItemKyselyHelper {
	private static readonly helper = new EntityRepoHelper('content_item');

	public static async isInvalidContentItem(id: string | undefined) {
		return this.helper.isInvalid(id);
	}

	public static async contentItemHasReferences(id: string | undefined) {
		return this.helper.hasReferences(id);
	}
}