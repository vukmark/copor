import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';

export class StateKyselyHelper {
	private static readonly helper = new EntityRepoHelper('state');

	public static async isInvalidState(id: string | undefined): Promise<boolean> {
		return this.helper.isInvalid(id);
	}

	public static async hasStateReferences(id: string | undefined): Promise<{tableName: string} | false> {
		return this.helper.hasReferences(id);
	}
}
