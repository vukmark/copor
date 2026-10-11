import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';

export class NewsKyselyHelper {
	private static readonly helper = new EntityRepoHelper('news');

	public static async isInvalidNews(id: string | undefined) {
		return this.helper.isInvalid(id);
	}

	public static async newsHasReferences(id: string | undefined) {
		return this.helper.hasReferences(id);
	}
}