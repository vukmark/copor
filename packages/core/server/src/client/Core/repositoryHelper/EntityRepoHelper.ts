import {KyselyGlobalRepositoryHelper} from '@copor/core/client/Core/repositoryHelper/KyselyGlobalRepositoryHelper';
import {KyselyFKReferenceCheckRepoHelper} from '@copor/core/client/Core/repositoryHelper/KyselyFKReferenceCheckRepoHelper';

export class EntityRepoHelper {
	private readonly tableName: string;

	constructor(tableName: string) {
		this.tableName = tableName;
	}

	public async isInvalid(id: string | undefined): Promise<boolean> {
		if (!id)
			return true;
		return KyselyGlobalRepositoryHelper.isInvalidRecord(this.tableName, id);
	}

	public async hasReferences(id: string | undefined): Promise<{tableName: string} | false> {
		if (!id)
			return false;
		const helper = new KyselyFKReferenceCheckRepoHelper(this.tableName);

		return helper.entityHasReferences(id);
	}
}