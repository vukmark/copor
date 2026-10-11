import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';

export class ImageKyselyHelper {
	private static readonly helper = new EntityRepoHelper('image');

	public static async isInvalidImage(id: string | undefined) {
		return this.helper.isInvalid(id);
	}
	public static async imageHasReferences(id: string | undefined) {
		return this.helper.hasReferences(id);
	}
}