import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';

export class ChecklistItemKyselyHelper {
	private static readonly helper = new EntityRepoHelper('checklistItem');

	public static async isInvalidChecklistItem(id: string | undefined) {
		return this.helper.isInvalid(id);
	}
	public static async checklistItemHasReferences(id: string | undefined) {
		return this.helper.hasReferences(id);
	}
}


