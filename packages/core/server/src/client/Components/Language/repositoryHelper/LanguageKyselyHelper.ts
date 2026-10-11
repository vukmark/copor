import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';

export class LanguageKyselyHelper {
	private static readonly helper = new EntityRepoHelper('language');

	public static async isInvalidLanguage(id: string | undefined) {
		return this.helper.isInvalid(id);
	}
	public static async languageHasReferences(id: string | undefined) {
		return this.helper.hasReferences(id);
	}

	public static getDefaultLanguage(): string {
		// German:
		return '299ef4b8-a876-4861-87f8-c2c0ee5a931d';
	}
}