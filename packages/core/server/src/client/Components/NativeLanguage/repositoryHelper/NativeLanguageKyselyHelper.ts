import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';

export class NativeLanguageKyselyHelper {
	private static readonly helper = new EntityRepoHelper('nativeLanguage');

	public static async isInvalidNativeLanguage(id: string | undefined) {
		return this.helper.isInvalid(id);
	}
	public static async nativeLanguageHasReferences(id: string | undefined) {
		return this.helper.hasReferences(id);
	}
}