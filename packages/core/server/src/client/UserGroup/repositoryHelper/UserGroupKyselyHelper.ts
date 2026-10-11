import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';

export class UserGroupKyselyHelper {
	private static readonly helper = new EntityRepoHelper('userGroup');

	public static async isInvalidUserGroup(id: string | undefined): Promise<boolean> {
		return this.helper.isInvalid(id);
	}
	public static async userGroupHasReferences(id: string | undefined) {
		return this.helper.hasReferences(id);
	}
}