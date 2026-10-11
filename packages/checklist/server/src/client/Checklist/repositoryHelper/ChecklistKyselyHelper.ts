import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';

export class ChecklistKyselyHelper {
	private static readonly helper = new EntityRepoHelper('checklist');

	public static async isInvalidChecklist(id: string | undefined) {
		return this.helper.isInvalid(id);
	}
	public static async checklistHasReferences(id: string | undefined) {
		return this.helper.hasReferences(id);
	}
}


