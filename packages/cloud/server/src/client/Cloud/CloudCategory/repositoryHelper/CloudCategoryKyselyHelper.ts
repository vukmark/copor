import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';

export class CloudCategoryKyselyHelper {
	private static readonly helper = new EntityRepoHelper('cloudCategory');

	public static async isInvalidCloudCategory(id: string | undefined) {
		return this.helper.isInvalid(id);
	}

	public static async cloudCategoryHasReferences(id: string | undefined) {
		return this.helper.hasReferences(id);
	}
}