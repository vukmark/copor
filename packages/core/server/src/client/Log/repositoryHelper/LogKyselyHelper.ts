import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';

export class LogKyselyHelper {
	private static readonly helper = new EntityRepoHelper('log');

	public static async isInvalidLog(id: string | undefined) {
		return this.helper.isInvalid(id);
	}
}