import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';

export class TagKyselyHelper {
	private static readonly helper = new EntityRepoHelper('tag');

	public static async isInvalidTag(id: string | undefined) {
		return this.helper.isInvalid(id);
	}

	public static async tagHasReferences(id: string | undefined) {
		return this.helper.hasReferences(id);
	}
}