import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';

export class ContractTypeKyselyHelper {
	private static readonly helper = new EntityRepoHelper('contractType');

	public static async isInvalidContractType(id: string | undefined) {
		return this.helper.isInvalid(id);
	}
	public static async contractTypeHasReferences(id: string | undefined) {
		return this.helper.hasReferences(id);
	}
}